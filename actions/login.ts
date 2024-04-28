"use server"

import { signIn } from "@/auth"
import { getUserByEmail } from "@/data/user"
import { LoginSchema } from "@/schemas/authSchema"
import { AuthError } from "next-auth"
import * as z from "zod"

type LoginSchemaValues = z.infer<typeof LoginSchema>

export const login = async (values: LoginSchemaValues) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }

  const { email, password } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser.email) {
    return { error: "Email does not exist!" }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/my-account"
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" }
        default:
          return { error: "Something went wrong!" }
      }
    }

    throw error;
  }
}