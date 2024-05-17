import PurchaseReceiptEmail from "@/emails/PurchaseReceiptEmail";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
const resend = new Resend(process.env.RESEND_API_KEY as string)

export async function POST(req: NextRequest) {
  const event = stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get("stripe-signature") as string,
    process.env.STRIPE_WEBHOOK_SECRET as string
  )

  if (event.type === "charge.succeeded") {
    const charge = event.data.object
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

    const cleanProduct = {
      ...product,
      price: Number(product.price)
    }

    const defaultImg = cleanProduct.images.filter(img => img.defaultImage)[0].imagePath

    const { orders: [order] } = await db.user.update({
      where: {
        email
      },
      data: {
        orders: {
          create: {
            productId,
            pricePaid
          }
        }
      },
      select: {
        orders: {
          orderBy: {
            createdAt: "desc"
          }, take: 1
        }
      }
    })

    const cleanOrder = [order].map(orderItem => ({
      ...orderItem,
      pricePaid: Number(orderItem.pricePaid)
    }))[0]

    await resend.emails.send({
      from: `Support <${process.env.SENDER_EMAIL}>`,
      to: email,
      subject: "Confirmação de envio",
      react: (<PurchaseReceiptEmail
        order={cleanOrder}
        product={cleanProduct}
        defaultImg={defaultImg}
      />)
    })

    return new NextResponse()
  }

  return new NextResponse('error', { status: 500 })
}