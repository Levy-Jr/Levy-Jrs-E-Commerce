"use server"

import { db } from "@/lib/db"
import { UpdateProductSchema } from "@/schemas/productSchema"
import fs from "fs/promises"
import { revalidatePath } from "next/cache"
import { notFound, redirect } from "next/navigation"

export const updateProduct = async (id: string, values: FormData) => {
  const validatedFields = UpdateProductSchema.safeParse(Object.fromEntries(values.entries()))

  if (!validatedFields.success) {
    console.log(validatedFields.error.formErrors.fieldErrors)
    return validatedFields.error.formErrors.fieldErrors
  }

  const { categoryId, name, desc, price, image } = validatedFields.data

  const product = await db.product.findUnique({
    where: {
      id
    }
  })

  if (product == null) return notFound()

  let imagePath = product.imagePath
  if (image != null && image.size > 0) {
    await fs.unlink("public" + product.imagePath)
    imagePath = `/products/${crypto.randomUUID()}-${image.name}`
    await fs.writeFile(
      `public${imagePath}`,
      Buffer.from(await image.arrayBuffer())
    )
  }

  await db.product.update({
    where: {
      id
    },
    data: {
      categoryId,
      name,
      desc,
      price,
      imagePath
    }
  })

  revalidatePath("/")
  revalidatePath("/admin/products")
  redirect("/admin/products")
}