"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
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
  const orderItem = await db.orderItem.delete({
    where: {
      id
    }
  })

  const cleanOrder = {
    ...orderItem,
    pricePaid: orderItem.pricePaid.toNumber()
  }

  if (orderItem == null) return notFound()

  revalidatePath('/')
  revalidatePath('/admin/orders')

  return cleanOrder
}