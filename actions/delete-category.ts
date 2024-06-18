"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { notFound } from "next/navigation"

export const deleteCategory = async (id: string) => {
  const category = await db.category.delete({
    where: { id }
  })

  if (category == null) return notFound()

  revalidatePath('/')
  revalidatePath('/products')
  revalidatePath('/admin/products/create-product')
}