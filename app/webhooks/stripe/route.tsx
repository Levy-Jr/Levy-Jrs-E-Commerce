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

          const order = await db.order.update({
            where: {
              id: orderId
            },
            data: {
              isPaid: true
            },
            include: {
              orderItems: true
            }
          })

          if (order == null) throw new Error("Bad request")

          const productIds = order.orderItems.map(orderItem => orderItem.productId)

          const products = await db.product.findMany({
            where: {
              id: {
                in: [...productIds]
              }
            },
            include: {
              images: true
            }
          })

          if (products == null) {
            return new NextResponse("Bad request", { status: 400 })
          }

          const cleanOrderItems = order.orderItems.map(orderItem => ({
            ...orderItem,
            pricePaid: Number(orderItem.pricePaid)
          }))



          const cleanProducts = products.map(cleanProduct => ({
            ...cleanProduct,
            price: Number(cleanProduct.price)
          }))

          await resend.emails.send({
            from: `Support <${process.env.SENDER_EMAIL}>`,
            to: metadataSession.customer_details.email,
            subject: "Obrigado pelo seu pedido!",
            react: (<CheckoutPurchaseReceiptEmail
              orderItems={cleanOrderItems}
              products={cleanProducts}
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
          const pricePaid = charge.amount

          const product = await db.product.findUnique({
            where: {
              id: productId
            },
            include: {
              images: true
            }
          })

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
                  orderItems: {
                    create: {
                      productId,
                      pricePaid
                    }
                  }
                }
              }
            },
            select: {
              orders: {
                select: {
                  orderItems: true
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