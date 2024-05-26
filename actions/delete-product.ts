"use server"

import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import { revalidatePath } from "next/cache"

export const deleteProduct = async (id: string) => {
  const product = await db.product.delete({
    where: {
      id
    },
    include: {
      images: true
    }
  })

  if (product == null) return notFound()

  revalidatePath('/')
  revalidatePath('/products')
  revalidatePath('/admin/products')
}