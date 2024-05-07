"use server"

import { db } from "@/lib/db"
import fs from "fs/promises"
import { CreateProductSchema } from "@/schemas/productSchema"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const createProduct = async (values: FormData) => {
  const imageValues = values.getAll('image')
  const nameValue = values.get('name')
  const descValue = values.get('desc')
  const priceValue = values.get('price')
  const categoryIdValue = values.get('categoryId')

  const cleanValues = {
    image: imageValues,
    name: nameValue,
    desc: descValue,
    price: priceValue,
    categoryId: categoryIdValue
  }

  const validatedFields = CreateProductSchema.safeParse(cleanValues)
  if (!validatedFields.success) {
    console.log(validatedFields.error.formErrors.fieldErrors)
    return validatedFields.error.formErrors.fieldErrors
  }

  const { categoryId, name, desc, price, image } = validatedFields.data

  /* the recursive option creates the directory when it doesn't exist, and doesn't create anything when it already exists */
  await fs.mkdir("public/products", { recursive: true })

  let newImagePath = ""

  type ImagesPath = {
    imagePath: string;
    defaultImage?: boolean;
  }
  const imagesPath: ImagesPath[] = []
  for (let i = 0; i < image.length; i++) {
    newImagePath = `/products/${crypto.randomUUID()}=${image[i].name}`
    imagesPath.push({
      imagePath: newImagePath
    })
    await fs.writeFile(
      `public${newImagePath}`,
      Buffer.from(await image[i].arrayBuffer())
    )
  }

  console.log(imagesPath)

  await db.product.create({
    data: {
      categoryId,
      name,
      desc,
      price,
      images: {
        createMany: {
          data: imagesPath
        }
      }
    }
  })

  revalidatePath("/")
  revalidatePath("/admin/products")
  redirect("/admin/products")
}