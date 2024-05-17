"use server"

import { db } from "@/lib/db"
import { Image } from "@prisma/client"
import { revalidatePath } from "next/cache"

type NewImageList = {
  id: string;
  productId?: string;
  imagePath: string;
  defaultImage: boolean;
}

export const DefaultProductImage = async (productId: string, imageId: string, productImages: Image[]) => {
  const newImageList: NewImageList[] = productImages.map(productImg => {
    if (productImg.defaultImage === true) productImg.defaultImage = false

    if (productImg.id == imageId) productImg.defaultImage = true
    return productImg
  })
  newImageList.map(newImg => delete newImg.productId)

  try {
    await db.product.update({
      where: {
        id: productId
      },
      data: {
        images: {
          deleteMany: {},
          createMany: {
            data: newImageList
          }
        }
      }
    })

    revalidatePath("/admin/products" + productId)
  } catch (error) {
  }
}

export const DeleteProductImage = async (productId: string, id: string) => {
  await db.image.delete({
    where: {
      id,
      productId
    }
  })

  revalidatePath("/admin/products" + productId)
}