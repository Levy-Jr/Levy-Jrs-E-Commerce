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
  fullName: z.string().trim().min(2, "A valid name is required").transform(str => str.split(' ')).refine(val => val.length > 1, 'A full name is required').transform(str => str.join(' ')),
  cpf: z.string().length(11, 'Invalid cpf'),
  phoneNumber: z.string().length(13),
  email: z.string().email({
    message: "Email is required"
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required"
  })
})