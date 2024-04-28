"use server"

import { db } from "@/lib/db"
import { CreateCategorySchema } from "@/schemas/categorySchema"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

type CreateCategoryValues = z.infer<typeof CreateCategorySchema>

export const createCategory = async (values: CreateCategoryValues) => {
  const validatedFields = CreateCategorySchema.safeParse(values)

  if (!validatedFields.success) return validatedFields.error.formErrors.fieldErrors

  const { name } = validatedFields.data

  await db.category.create({
    data: {
      name
    }
  })

  revalidatePath("/")
  revalidatePath("/admin/products")
  redirect("/admin/products")
}