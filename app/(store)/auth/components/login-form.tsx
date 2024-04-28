"use client"

import { login } from "@/actions/login"
import { FormError } from "@/components/form-error"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoginSchema } from "@/schemas/authSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
    <div className="bg-zinc-800 max-w-[30rem] w-full font-bold p-6 rounded-md">
      <h2 className="text-center tracking-wider">ACESSE SUA CONTA</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4 my-4">
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
                      placeholder="E-MAIL *"
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
          <Button
            className="w-full bg-red-600 hover:bg-red-500 font-bold tracking-widest"
            type="submit"
            disabled={isPending}
          >LOGIN</Button>
        </form>
      </Form>
    </div>
  )
}

export default LoginForm