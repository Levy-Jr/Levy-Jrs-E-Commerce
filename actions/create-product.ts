"use server"

import { db } from "@/lib/db"
import fs from "fs/promises"
import { CreateProductSchema } from "@/schemas/productSchema"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const createProduct = async (values: FormData) => {
  const validatedFields = CreateProductSchema.safeParse(Object.fromEntries(values.entries()))

  if (!validatedFields.success) {
    return validatedFields.error.formErrors.fieldErrors
  }

  const { categoryId, name, desc, price, image } = validatedFields.data

  /* the recursive option creates the directory when it doesn't exist, and doesn't create anything when it already exists */
  await fs.mkdir("public/products", { recursive: true })
  const newImagePath = `/products/${crypto.randomUUID()}=${image.name}`
  await fs.writeFile(
    `public${newImagePath}`,
    Buffer.from(await image.arrayBuffer())
  )

  await db.product.create({
    data: {
      categoryId,
      name,
      desc,
      price,
      imagePath: newImagePath
    }
  })

  revalidatePath("/")
  revalidatePath("/admin/products")
  redirect("/admin/products")
}