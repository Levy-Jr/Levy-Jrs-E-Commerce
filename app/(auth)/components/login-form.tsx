"use client"

import { login } from "@/actions/login"
import { FormError } from "@/components/form-error"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoginSchema } from "@/schemas/authSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Entrar from "/public/e-commerce/login/entrar-icone.svg"
import Link from "next/link"

type LoginFormValues = z.infer<typeof LoginSchema>

const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = async (values: LoginFormValues) => {
    setError("")

    startTransition(() => {
      login(values)
        .then(data => {
          setError(data?.error)
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
          <h1 className="text-center text-4xl font-bold">Fazer login</h1>
          <div className="space-y-4 my-4">
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
          <p className="font-bold text-xl">Não tem uma conta? <Link href="/register" className="text-pink">Criar conta</Link></p>
          <FormError message={error} />
          <Button
            disabled={isPending}
            type="submit"
            className="w-full bg-white hover:bg-gray text-black hover:text-black text-3xl py-7 font-bold rounded-full inline-flex items-center"
          >
            Entrar
            <Image src={Entrar} alt="Entrar" className="ml-4 inline" />
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default LoginForm