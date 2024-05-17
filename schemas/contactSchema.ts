import { z } from "zod";

export const GeneralContactSchema = z.object({
  subject: z.string().min(1, "Obrigatório"),
  fullName: z.string().trim().min(2, "Escreva um nome válido").transform(str => str.split(' ')).refine(val => val.length > 1, 'Escreva um nome completo').transform(str => str.join(' ')),
  email: z.string().email({
    message: "Email é obrigatório"
  }),
  phoneNumber: z.string().length(13, "O número precisa ter 13 digitos"),
  message: z.string().min(1, "Escreva uma mensagem"),
})