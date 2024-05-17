"use server"

import * as z from "zod"

import bcrypt from "bcryptjs"
import { db } from "@/lib/db"
import { MyAccountSchema } from "@/schemas/myAccountSchema"
import { currentUser } from "@/lib/auth"
import { getUserByEmail, getUserById } from "@/data/user"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

type MyAccountValues = z.infer<typeof MyAccountSchema>

export const myAccount = async (values: MyAccountValues) => {
  const validatedFields = MyAccountSchema.safeParse(values)

  if (!validatedFields.success) {
    return validatedFields.error.formErrors.fieldErrors
  }

  let { fullName, email, cpf, phoneNumber, password, newPassword } = validatedFields.data

  const user = await currentUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  if (!user.id) return { error: "Something went wrong" }

  const dbUser = await getUserById(user.id)
  if (!dbUser) {
    return { error: "Unauthorized" }
  }

  if (email && email !== user.email) {
    const existingUser = await getUserByEmail(email)

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use!" }
    }
  }

  if (password && newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(
      password,
      dbUser.password
    )

    if (!passwordsMatch) {
      return { error: "Incorrect password!" }
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );
    password = hashedPassword

    newPassword = undefined
  }

  await db.user.update({
    where: {
      id: dbUser.id
    },
    data: {
      ...validatedFields.data
    }
  })

  revalidatePath("/my-account")
  redirect('/my-account')
}