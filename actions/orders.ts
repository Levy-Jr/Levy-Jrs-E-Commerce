"use server"

import { db } from "@/lib/db"
import { notFound } from "next/navigation"

export const userOrderExists = async (email: string, productId: string) => {
  return (await db.order.findFirst({
    where: {
      user: { email },
      productId
    },
    select: {
      id: true
    }
  })) != null
}

export const deleteOrder = async (id: string) => {
  const order = await db.order.delete({
    where: {
      id
    }
  })

  const cleanOrder = {
    ...order,
    pricePaid: order.pricePaid.toNumber()
  }

  if (order == null) return notFound()

  return cleanOrder
}