"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoginSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

type LoginFormValues = z.infer<typeof LoginSchema>

const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = async (data: LoginFormValues) => {
    console.log(data)
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