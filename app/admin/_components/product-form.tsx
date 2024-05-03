"use client"

import { createProduct } from "@/actions/create-product"
import { updateProduct } from "@/actions/update-product"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CreateProductSchema, UpdateProductSchema } from "@/schemas/productSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Category, Product } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

/* tirando o type de "price" no type Product e setando ele para number. Antes ele estava como "decimal" e estava dando erro */
type CleanProduct = Omit<Product, 'price'> & { price: number }

type CreateProductFormProps = {
  categories: Category[];
  initialData?: CleanProduct | null;
}

type ProductFormValues = z.infer<typeof CreateProductSchema>

export const ProductForm = ({
  categories,
  initialData
}: CreateProductFormProps) => {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const [isPending, startTransition] = useTransition()

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(initialData ? UpdateProductSchema : CreateProductSchema),
    defaultValues: initialData ? {
      name: initialData.name,
      desc: initialData.desc,
      price: Number(String(initialData.price)),
      categoryId: initialData.categoryId
    } : {
      name: "",
      desc: "",
      price: 0,
      categoryId: ""
    }
  })

  const onSubmit = (values: ProductFormValues) => {
    setError("")
    setSuccess("")

    startTransition(async () => {
      const formData = new FormData();
      if (values.image) {
        for (let i = 0; i < values.image.length; i++) {
          formData.append('image', values.image[i]);
        }
      }
      formData.append('name', values.name)
      formData.append('desc', values.desc)
      formData.append('price', String(values.price))
      formData.append('categoryId', values.categoryId)
      if (initialData == null) {
        await createProduct(formData)
      } else {
        await updateProduct(initialData.id, formData)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-screen-sm mx-auto mt-16 bg-red-600 text-white shadow-red-950 shadow-lg p-4 py-8 rounded-md"
      >
        <h1 className="text-center text-2xl font-bold mb-4">CADASTRO DO PRODUTO</h1>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="image"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Imagens do produto: </FormLabel>
                <FormControl>
                  <Input
                    className="text-black"
                    type="file"
                    onChange={e =>
                      onChange([...Array.from(e.target.files ?? [])])
                    }
                    {...fieldProps}
                    multiple
                    disabled={isPending}
                  />
                </FormControl>
                {initialData != null &&
                  <Image
                    className="mx-auto"
                    src={initialData.imagePath[0]}
                    width={200}
                    height={200}
                    alt="Product Image"
                  />
                }
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="desc"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    className="text-black"
                    {...field}
                    disabled={isPending}
                    placeholder="Descrição do produto"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="number"
                    className="text-black"
                    {...field}
                    disabled={isPending}
                    placeholder="Preço"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="text-black">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.length === 0 && (
                      <p className="p-2">
                        Você ainda não tem nenhuma categoria. <Link className="font-bold underline text-blue-700" href="/admin/products/create-category">Crie uma</Link>
                      </p>
                    )}
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end gap-4 mt-5">
          <Button className="bg-transparent hover:bg-red-700" asChild>
            <Link href="/admin/products">Voltar</Link>
          </Button>
          <Button type="submit">
            {isPending ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </div>
      </form>
    </Form>
  )
}