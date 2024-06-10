"use client"

import { contactEmail } from "@/actions/email"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { GeneralContactSchema } from "@/schemas/contactSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"
import Enviar from "/public/e-commerce/contato/enviar-icone.svg"

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
        toast.success("Email enviado!")
      } catch (error) {
        console.log(error)
      }
    })
  }

  const subjects = ["Geral", "Compras", "Dúvidas", "Parcerias", "Problemas com Pagamento", "Revendedor", "Informações com suporte técnico"]

  return (
    <div className="lg:w-1/2 ml-auto min-h-screen text-white py-8 lg:grid lg:place-items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-[min(30rem,100%)] mx-auto px-6 md:px:0"
        >
          <h1 className="text-center text-4xl font-bold">Contato</h1>
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
                    <SelectTrigger className="placeholder:text-gray placeholder:text-xl text-xl border-0 caret-white border-b rounded-none focus-visible:ring-offset-0 bg-transparent border-white font-bold" disabled={isPending}>
                      <SelectValue placeholder="Assunto" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-black text-white">
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
                    className="placeholder:text-gray placeholder:text-xl text-xl border-0 caret-white border-b rounded-none focus-visible:ring-offset-0 bg-transparent border-white font-bold"
                    {...field}
                    disabled={isPending}
                    placeholder="Nome completo"
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
                        className="placeholder:text-gray placeholder:text-xl text-xl border-0 caret-white border-b rounded-none focus-visible:ring-offset-0 bg-transparent border-white font-bold"
                        {...field}
                        disabled={isPending}
                        placeholder="E-mail"
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
                        className="placeholder:text-gray placeholder:text-xl text-xl border-0 caret-white border-b rounded-none focus-visible:ring-offset-0 bg-transparent border-white font-bold"
                        {...field}
                        disabled={isPending}
                        placeholder="Telefone"
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
                    className="placeholder:text-gray placeholder:text-xl text-xl border-0 caret-white border-b rounded-none focus-visible:ring-offset-0 bg-transparent border-white font-bold"
                    {...field}
                    disabled={isPending}
                    placeholder="Mensagem"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isPending}
            type="submit"
            className="w-full bg-white hover:bg-gray text-black hover:text-black text-3xl py-7 font-bold rounded-full inline-flex items-center"
          >
            Enviar
            <Image src={Enviar} alt="Enviar" className="ml-4 inline" />
          </Button>
        </form>
      </Form>
    </div>
  )
}