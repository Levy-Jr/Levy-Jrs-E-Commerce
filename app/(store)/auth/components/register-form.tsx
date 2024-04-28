"use client"

import { register } from "@/actions/register"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RegisterSchema } from "@/schemas/authSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
    <div className="bg-zinc-800 w-full max-w-[30rem] font-bold p-6 rounded-md">
      <h2 className="text-center tracking-wider">CRIAR CONTA</h2>
      <p className="text-sm font-normal mt-4">Campos com (*) são obrigatórios.</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="bg-slate-900 border-none font-bold tracking-widest"
                      {...field}
                      disabled={isPending}
                      placeholder="NOME COMPLETO *"
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
                      className="bg-slate-900 border-none font-bold tracking-widest"
                      {...field}
                      disabled={isPending}
                      placeholder="CPF *"
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
                      className="bg-slate-900 border-none font-bold tracking-widest"
                      {...field}
                      disabled={isPending}
                      placeholder="TELEFONE *"
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
                      className="bg-slate-900 border-none font-bold tracking-widest"
                      {...field}
                      disabled={isPending}
                      placeholder="E-EMAIL *"
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
                      className="bg-slate-900 border-none font-bold tracking-widest"
                      {...field}
                      disabled={isPending}
                      placeholder="SENHA *"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            disabled={isPending}
            type="submit"
            className="w-full bg-red-600 hover:bg-red-500 font-bold tracking-widest"
          >
            CRIAR CONTA
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default RegisterForm