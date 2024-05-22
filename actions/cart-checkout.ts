"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export const cartCheckout = async (productIds: string[]) => {
  if (!productIds || productIds.length === 0) {
    return new NextResponse("Product ids are required", { status: 400 })
  }

  const user = await currentUser()

  if (!user) throw new Error("You need to be logged in")

  const products = await db.product.findMany({
    where: {
      id: {
        in: productIds
      }
    }
  })

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = []

  products.forEach(product => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: "BRL",
        product_data: {
          name: product.name
        },
        unit_amount: (Number(product.price) * 100)
      }
    })
  })

  if (!user.id) throw new Error("User id required")

  const order = await db.order.create({
    data: {
      userId: user.id,
      orderItems: {
        create: products.map(product => ({
          pricePaid: product.price,
          product: {
            connect: {
              id: product.id,
            }
          }
        }))
      }
    }
  })

  console.log(order.id)

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart/cart-success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
    metadata: {
      session: 'cart_checkout_session',
      orderId: order.id
    }
  })

  return { url: session.url }
}