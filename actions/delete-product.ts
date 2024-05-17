"use server"

import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import fs from "fs/promises"
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
  for (let i = 0; i < product.images.length; i++) {
    await fs.unlink(`public/${product.images[i].imagePath}`)
  }

  revalidatePath('/')
  revalidatePath('/products')
  revalidatePath('/admin/products')
}