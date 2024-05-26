"use server"

import { db } from "@/lib/db"
import { UpdateProductSchema } from "@/schemas/productSchema"
import fs from "fs/promises"
import { revalidatePath } from "next/cache"
import { notFound, redirect } from "next/navigation"
import { z } from "zod"

type ProductFormValues = z.infer<typeof UpdateProductSchema>

export const updateProduct = async (id: string, values: ProductFormValues) => {
  const validatedFields = UpdateProductSchema.safeParse(values)

  if (!validatedFields.success) {
    return validatedFields.error.formErrors.fieldErrors
  }

  const { categoryId, name, desc, price, images, isArchived, isFeatured } = validatedFields.data

  const product = await db.product.findUnique({
    where: {
      id
    },
    include: {
      images: true
    }
  })

  if (product == null) return notFound()

  type ImagesUrl = {
    url: string;
    defaultImage?: boolean;
  }
  const imagesUrl: ImagesUrl[] = []

  if (images) {
    for (let i = 0; i < images.length; i++) {
      if (images[i].url) {
        imagesUrl.push({ url: images[i].url, defaultImage: images[i].defaultImage })
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
        deleteMany: {},
        createMany: {
          data: imagesUrl
        }
      }
    }
  })

  revalidatePath("/")
  revalidatePath("/admin/products")
  redirect("/admin/products")
}