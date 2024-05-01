"use server"

import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import fs from "fs/promises"
import { revalidatePath } from "next/cache"

export const deleteProduct = async (id: string) => {
  const product = await db.product.delete({
    where: {
      id
    }
  })
  if (product == null) return notFound()

  await fs.unlink(`public/${product.imagePath}`)

  revalidatePath('/')
  revalidatePath('/products')
  revalidatePath('/admin/products')
}