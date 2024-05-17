import { z } from "zod";

export const MyAccountSchema = z.object({
  fullName: z.optional(z.string()),
  email: z.optional(z.string().email()),
  password: z.optional(z.string().min(6)),
  cpf: z.optional(z.string().length(11, 'Cpf inválido')),
  phoneNumber: z.optional(z.string().length(13, "O número precisa ter 13 digitos")),
  newPassword: z.optional(z.string().min(6))
}).refine(data => {
  if (data.password && !data.newPassword) {
    return false
  }

  return true
}, {
  message: "New password is required",
  path: ["newPassword"]
}).refine(data => {
  if (data.newPassword && !data.password) {
    return false
  }

  return true
}, {
  message: "Password is required!",
  path: ["password"]
})