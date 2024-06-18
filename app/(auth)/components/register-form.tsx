"use client"

import { register } from "@/actions/register"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { escapeCPF } from "@/lib/utils"
import { RegisterSchema } from "@/schemas/authSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Seta from "/public/e-commerce/criar-conta/seta-icone.svg"
import Image from "next/image"
import Link from "next/link"

type RegisterFormValues = z.infer<typeof RegisterSchema>

const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      fullName: "",
      email: "",
      cpf: "",
      phoneNumber: "",
      password: ""
    }
  })

  const onSubmit = async (values: RegisterFormValues) => {
    setError("")
    setSuccess("")

    startTransition(() => {
      register(values)
        .then(data => {
          setError(data.error)
          setSuccess(data.success)
        })
    })
  }

  return (
    <div className="lg:w-1/2 ml-auto min-h-screen text-white py-8 lg:grid lg:place-items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-[min(30rem,100%)] mx-auto px-6 md:px:0"
        >
          <h1 className="text-center text-4xl font-bold">Criar conta</h1>
          <div className="space-y-4">
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
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      className="placeholder:text-gray placeholder:text-xl text-xl border-0 caret-white border-b rounded-none focus-visible:ring-offset-0 bg-transparent border-white font-bold"
                      {...field}
                      onChange={e => field.onChange(escapeCPF(e.target.value))}
                      disabled={isPending}
                      placeholder="CPF"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      className="placeholder:text-gray placeholder:text-xl text-xl border-0 caret-white border-b rounded-none focus-visible:ring-offset-0 bg-transparent border-white font-bold"
                      {...field}
                      disabled={isPending}
                      placeholder="Senha"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <p className="font-bold text-xl">Já tem uma conta? <Link href="/login" className="text-pink">Fazer login</Link></p>
          <FormError message={error} />
          <FormSuccess message={success} />
          <button
            disabled={isPending}
            type="submit"
            className="w-full bg-white hover:bg-gray text-black hover:text-black text-3xl py-7 font-bold rounded-full inline-flex items-center"
          >
            Criar conta
            <Image src={Seta} alt="Seta" className="ml-4 inline" />
          </button>
        </form>
      </Form>
    </div>
  )
}

export default RegisterForm