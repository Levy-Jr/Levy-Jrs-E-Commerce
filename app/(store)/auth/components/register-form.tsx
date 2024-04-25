"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RegisterSchema } from "@/schemas"
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

  const onSubmit = async (data: RegisterFormValues) => {
    console.log(data)
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
                </FormItem>
              )}
            />
          </div>
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