"use client"

import { createCategory } from "@/actions/create-category"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CreateCategorySchema } from "@/schemas/categorySchema"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import CategoriaIcone from "/public/e-commerce/produtos/categoria-icone-preto.svg"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Category } from "@prisma/client"
import { CategoryCard } from "../products/components/category-card"
import Link from "next/link"

type CategoryFormValues = z.infer<typeof CreateCategorySchema>

type CreateCategoryFormProps = {
  categories: Category[]
}

export const CreateCategoryForm = ({ categories }: CreateCategoryFormProps) => {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const [isPending, startTransition] = useTransition()

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(CreateCategorySchema),
    defaultValues: {

    }
  })

  const onSubmit = (values: CategoryFormValues) => {
    setError("")
    setSuccess("")

    startTransition(() => {
      createCategory(values)
    })
  }

  return (
    <div>
      <h1 className="text-center text-4xl font-bold mt-12 text-white">Cadastro da categoria</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-screen-sm mx-auto mt-8 bg-[#1E1E1E] text-white shadow-lg p-12 py-8 rounded-xl"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="placeholder:text-gray placeholder:text-xl text-xl border-0 caret-white border-b rounded-none focus-visible:ring-offset-0 bg-transparent border-white font-bold"
                      {...field}
                      disabled={isPending}
                      placeholder="Nome da categoria"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {categories && categories.length > 0 &&
            <div className="mt-4">
              <h2 className="text-2xl font-semibold">Categorias cadastradas: </h2>
              <ul className="flex flex-wrap mt-2 gap-4">
                {categories.map(category => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                  />
                ))}
              </ul>
            </div>
          }
          <div className="flex justify-end gap-4 mt-5">
            <Link href="/admin/products" className="text-2xl flex items-center gap-3 bg-black rounded-full py-1 px-6 text-white font-bold">
              Voltar
            </Link>
            <button className="text-2xl flex items-center gap-3 bg-white rounded-full py-2 px-4 text-black font-bold" type="submit">
              {isPending ? "Cadastrando..." : "Cadastrar"}
              <Image
                className="inline"
                src={CategoriaIcone}
                alt="Ícone de uma bolsa"
              />
            </button>
          </div>
        </form>
      </Form>
    </div>
  )
}