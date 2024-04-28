"use client"

import { createCategory } from "@/actions/create-category"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CreateCategorySchema } from "@/schemas/categorySchema"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

type CategoryFormValues = z.infer<typeof CreateCategorySchema>

export const CreateCategoryForm = () => {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const [isPending, startTransition] = useTransition()

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(CreateCategorySchema)
  })

  const onSubmit = (values: CategoryFormValues) => {
    setError("")
    setSuccess("")

    startTransition(() => {
      createCategory(values)
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-screen-sm mx-auto mt-16 bg-red-600 text-white shadow-red-950 shadow-lg p-4 py-8 rounded-md"
      >
        <h1 className="text-center text-2xl font-bold mb-4">CADASTRO DA CATEGORIA</h1>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="text-black"
                    {...field}
                    disabled={isPending}
                    placeholder="Nome"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end gap-4 mt-5">
          <Button className="bg-transparent hover:bg-red-700" asChild>
            <Link href="/admin/category">Voltar</Link>
          </Button>
          <Button type="submit">
            {isPending ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </div>
      </form>
    </Form>
  )
}