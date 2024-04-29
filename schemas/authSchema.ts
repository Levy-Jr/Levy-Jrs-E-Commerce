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
  fullName: z.string().trim().min(2, "Escreva um nome válido").transform(str => str.split(' ')).refine(val => val.length > 1, 'Escreva um nome completo').transform(str => str.join(' ')),
  cpf: z.string().length(11, 'Cpf inválido'),
  phoneNumber: z.string().length(13, "O número precisa ter 13 digitos"),
  email: z.string().email({
    message: "Email é obrigatório"
  }),
  password: z.string().min(6, {
    message: "Pelo menos 6 caracteres"
  })
})