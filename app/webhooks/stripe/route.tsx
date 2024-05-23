import CheckoutPurchaseReceiptEmail from "@/emails/CheckoutPurchaseReceiptEmail";
import PurchaseReceiptEmail from "@/emails/PurchaseReceiptEmail";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
const resend = new Resend(process.env.RESEND_API_KEY as string)

export async function POST(req: NextRequest) {
  try {
    const event = stripe.webhooks.constructEvent(
      await req.text(),
      req.headers.get("stripe-signature") as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    )

    const metadataSession = event.data.object as Stripe.Checkout.Session

    switch (metadataSession.metadata?.session) {
      case 'cart_checkout_session':
        if (event.type === 'checkout.session.completed') {
          if (!metadataSession.customer_details?.email) {
            throw new Error("Missing user email")
          }

          const { orderId } = metadataSession.metadata || {
            orderId: null
          }

          if (!orderId) {
            throw new Error("Invalid request metadata")
          }

          const shippingCheckoutAddress = metadataSession.shipping_details!.address

          const order = await db.order.update({
            where: {
              id: orderId
            },
            data: {
              isPaid: true,
              ShippingAddress: {
                create: {
                  name: metadataSession.customer_details!.name!,
                  city: shippingCheckoutAddress!.city!,
                  country: shippingCheckoutAddress!.country!,
                  postalCode: shippingCheckoutAddress!.postal_code!,
                  street: shippingCheckoutAddress!.line1!,
                  state: shippingCheckoutAddress!.state!,
                }
              }
            },
            include: {
              orderItems: {
                include: {
                  order: true,
                  product: {
                    include: {
                      images: true
                    }
                  }
                }
              }
            }
          })

          if (order == null) throw new Error("Bad request")

          const cleanOrderItems = order.orderItems.map(orderItem => ({
            ...orderItem,
            pricePaid: Number(orderItem.pricePaid)
          }))

          await resend.emails.send({
            from: `Support <${process.env.SENDER_EMAIL}>`,
            to: metadataSession.customer_details.email,
            subject: "Obrigado pelo seu pedido!",
            react: (<CheckoutPurchaseReceiptEmail
              orderItems={cleanOrderItems}
            />)
          })

          new NextResponse()
        }
        break;
      case 'single_product_session':
        if (event.type === 'charge.succeeded') {
          const charge = event.data.object as Stripe.Charge
          const productId = charge.metadata.productId
          const email = charge.billing_details.email
          const pricePaid = (charge.amount / 100)

          const product = await db.product.findUnique({
            where: {
              id: productId
            },
            include: {
              images: true
            }
          })

          const shippingAddress = charge.shipping!.address

          if (product == null || email == null) {
            return new NextResponse("Bad request", { status: 400 })
          }

          const { orders: [order] } = await db.user.update({
            where: {
              email
            },
            data: {
              orders: {
                create: {
                  ShippingAddress: {
                    create: {
                      name: charge.billing_details.name!,
                      city: shippingAddress!.city!,
                      country: shippingAddress!.country!,
                      postalCode: shippingAddress!.postal_code!,
                      street: shippingAddress!.line1!,
                      state: shippingAddress!.state!,
                    }
                  },
                  orderItems: {
                    create: {
                      productId,
                      pricePaid,
                    }
                  }
                }
              }
            },
            select: {
              orders: {
                select: {
                  createdAt: true,
                  orderItems: {
                    include: {
                      order: true
                    }
                  }
                },
                take: 1
              }
            }
          })

          const cleanProduct = {
            ...product,
            price: product.price.toNumber()
          }

          const cleanOrderItem = order.orderItems.map(orderItem => ({
            ...orderItem,
            pricePaid: orderItem.pricePaid.toNumber()
          }))[0]

          if (!cleanOrderItem.orderId) throw new Error("Bad request")

          await resend.emails.send({
            from: `Support <${process.env.SENDER_EMAIL}>`,
            to: email,
            subject: "Obrigado pelo seu pedido!",
            react: (<PurchaseReceiptEmail
              orderItem={cleanOrderItem}
              product={cleanProduct}
            />)
          })
          break;
        }
      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    return new NextResponse()
  } catch (error) {
    console.error(error)
    return new NextResponse('error', { status: 500 })
  }

}