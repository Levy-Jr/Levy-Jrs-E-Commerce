"use server"

import * as z from "zod"
import bcrypt from "bcryptjs"
import { RegisterSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user"
import { db } from "@/lib/db"

type RegisterSchemaValues = z.infer<typeof RegisterSchema>

export const register = async (values: RegisterSchemaValues) => {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }

  const { fullName, cpf, phoneNumber, email, password } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return {
      error: "Email already in use!"
    }
  }

  await db.user.create({
    data: {
      fullName,
      phoneNumber,
      cpf,
      email,
      password: hashedPassword
    }
  })

  return { success: "Successfully registered!" }
}