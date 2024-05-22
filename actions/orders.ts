"use server"

import { db } from "@/lib/db"
import { notFound } from "next/navigation"

export const userOrderExists = async (email: string, productId: string) => {
  return (await db.order.findFirst({
    where: {
      user: { email },
    },
    select: {
      id: true,
      orderItems: true
    }
  })) != null
}

export const deleteOrder = async (id: string) => {
  const order = await db.order.delete({
    where: {
      id
    },
    include: {
      orderItems: true
    }
  })

  const cleanOrder = {
    ...order,
    pricePaid: order.orderItems.map(i => Number(i.pricePaid))
  }

  if (order == null) return notFound()

  return cleanOrder
}