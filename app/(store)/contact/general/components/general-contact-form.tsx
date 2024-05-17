"use client"

import { contactEmail } from "@/actions/email"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { GeneralContactSchema } from "@/schemas/contactSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

type GeneralContactFormValues = z.infer<typeof GeneralContactSchema>

export const GeneralContactForm = () => {
  const [isPending, startTransition] = useTransition()

  const form = useForm<GeneralContactFormValues>({
    resolver: zodResolver(GeneralContactSchema),
    defaultValues: {
      subject: "",
      fullName: "",
      email: "",
      phoneNumber: "",
      message: ""
    }
  })

  const onSubmit = async (values: GeneralContactFormValues) => {
    startTransition(async () => {
      try {
        await contactEmail(values)
      } catch (error) {
        console.log(error)
      }
    })
  }

  const subjects = ["Geral", "Compras", "Dúvidas", "Parcerias", "Problemas com Pagamento", "Revendedor", "Informações com suporte técnico"]

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-screen-md mx-auto text-white shadow-lg p-4 py-8 rounded-md space-y-4"
      >
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="text-black" disabled={isPending}>
                    <SelectValue placeholder="ASSUNTO" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {subjects.map((subject, index) => (
                    <SelectItem key={index} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="text-black"
                  {...field}
                  disabled={isPending}
                  placeholder="NOME COMPLETO"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="text-black"
                      {...field}
                      disabled={isPending}
                      placeholder="E-MAIL"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="text-black"
                      {...field}
                      disabled={isPending}
                      placeholder="TELEFONE"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  className="text-black"
                  {...field}
                  disabled={isPending}
                  placeholder="MENSAGEM"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="bg-[#ff0000] hover:bg-red-600"
          disabled={isPending}
        >ENVIAR</Button>
      </form>
    </Form>
  )
}