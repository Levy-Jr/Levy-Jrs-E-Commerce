import { z } from "zod"

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required"
  }),
  password: z.string().min(1, {
    message: "Password is required"
  })
})

export const RegisterSchema = z.object({
  fullName: z.string({
    message: "Full name is required"
  }),
  cpf: z.string().length(11, 'Invalid cpf'),
  phoneNumber: z.string().length(13),
  email: z.string().email({
    message: "Email is required"
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characteres required"
  })
})