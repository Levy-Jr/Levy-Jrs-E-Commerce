"use server"

import { db } from "@/lib/db"
import { UpdateProductSchema } from "@/schemas/productSchema"
import fs from "fs/promises"
import { revalidatePath } from "next/cache"
import { notFound, redirect } from "next/navigation"

export const updateProduct = async (id: string, values: FormData) => {
  const imageValues = values.getAll('image')
  const nameValue = values.get('name')
  const descValue = values.get('desc')
  const priceValue = values.get('price')
  const categoryIdValue = values.get('categoryId')
  let isArchivedValue = values.get('isArchived')
  let isFeaturedValue = values.get('isFeatured')

  type CleanValues = {
    image: FormDataEntryValue[]
    name: FormDataEntryValue | null
    desc: FormDataEntryValue | null
    price: FormDataEntryValue | null
    categoryId: FormDataEntryValue | null
    isArchived: boolean
    isFeatured: boolean
  }

  const cleanValues: CleanValues = {
    image: imageValues,
    name: nameValue,
    desc: descValue,
    price: priceValue,
    categoryId: categoryIdValue,
    isArchived: !!JSON.parse(String(isArchivedValue)),
    isFeatured: !!JSON.parse(String(isFeaturedValue))
  }

  const validatedFields = UpdateProductSchema.safeParse(cleanValues)

  if (!validatedFields.success) {
    return validatedFields.error.formErrors.fieldErrors
  }

  const { categoryId, name, desc, price, image, isArchived, isFeatured } = validatedFields.data

  const product = await db.product.findUnique({
    where: {
      id
    },
    include: {
      images: true
    }
  })

  if (product == null) return notFound()

  let newImagePath = ""

  type ImagesPath = {
    imagePath: string;
    defaultImage?: boolean;
  }
  const imagesPath: ImagesPath[] = []

  if (image) {
    for (let i = 0; i < image.length; i++) {
      if (image != null && image[i].size > 0) {
        newImagePath = `/products/${crypto.randomUUID()}=${image[i].name}`
        imagesPath.push({
          imagePath: newImagePath
        })
        await fs.writeFile(
          `public${newImagePath}`,
          Buffer.from(await image[i].arrayBuffer())
        )
      }
    }
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
      isArchived,
      isFeatured,
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