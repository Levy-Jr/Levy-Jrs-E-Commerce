"use server"

import { db } from "@/lib/db"
import { CreateProductSchema } from "@/schemas/productSchema"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

type ProductFormValues = z.infer<typeof CreateProductSchema>

export const createProduct = async (values: ProductFormValues) => {
  const validatedFields = CreateProductSchema.safeParse(values)
  if (!validatedFields.success) {
    return validatedFields.error.formErrors.fieldErrors
  }

  const { categoryId, name, desc, price, images } = validatedFields.data

  // TODO: ARMAZENAR ARQUIVOS EM UM SERVIDOR EXTERNO, NA NUVEM, E NÃO NO PRÓPRIO SERVIDOR DO NEXT POIS NÃO É POSSÍVEL ADICIONAR UM ARQUIVO NESSE SERVIDOR QUANDO ESTÁ EM PRODUÇÃO

  type ImagesUrl = {
    url: string;
    defaultImage?: boolean;
  }

  const imagesUrl: ImagesUrl[] = []

  for (let i = 0; i < images.length; i++) {
    imagesUrl.push({
      url: images[i].url
    })
  }

  imagesUrl[0].defaultImage = true

  await db.product.create({
    data: {
      categoryId,
      name,
      desc,
      price,
      images: {
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