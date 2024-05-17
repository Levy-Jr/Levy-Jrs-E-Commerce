"use server"

import ContactEmail from "@/emails/ContactEmail"
import { GeneralContactSchema } from "@/schemas/contactSchema"
import { Resend } from "resend"
import { z } from "zod"

type ContactEmailValues = z.infer<typeof GeneralContactSchema>

const resend = new Resend(process.env.RESEND_API_KEY as string)

export const contactEmail = async (values: ContactEmailValues) => {
  const validatedFields = GeneralContactSchema.safeParse(values)

  if (!validatedFields.success) {
    return validatedFields.error.formErrors.fieldErrors
  }

  const { email, subject } = validatedFields.data

  const data = await resend.emails.create({
    from: `Support <${process.env.SENDER_EMAIL}>`,
    to: email,
    subject: subject,
    react: <ContactEmail values={validatedFields.data} />
  })

  if (data.error) {
    return { error: "Aconteceu um erro. Por favor, tente de novo." }
  }

  return { message: "Tudo certo. Entraremos em contato com você em breve." }
}