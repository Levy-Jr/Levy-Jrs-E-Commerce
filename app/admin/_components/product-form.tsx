"use client"

import { createProduct } from "@/actions/create-product"
import { updateProduct } from "@/actions/update-product"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import ImageUpload from "@/components/ui/image-upload"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CreateProductSchema, UpdateProductSchema } from "@/schemas/productSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Category, Prisma } from "@prisma/client"
import Link from "next/link"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"
import Image from "next/image"
import Bolsa from "/public/e-commerce/produtos/bolsa-icone.svg"

/* tirando o type de "price" no type Product e setando ele para number. Antes ele estava como "decimal" e estava dando erro */
type CleanProduct = Omit<Prisma.ProductGetPayload<{
  include: {
    images: true
  }
}>, 'price'> & { price: number }

type CreateProductFormProps = {
  categories: Category[];
  initialData?: CleanProduct | null;
}

type ProductFormValues = z.infer<typeof CreateProductSchema>
type UpdateProductFormValues = z.infer<typeof UpdateProductSchema>

export const ProductForm = ({
  categories,
  initialData
}: CreateProductFormProps) => {
  const [isPending, startTransition] = useTransition()

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(initialData ? UpdateProductSchema : CreateProductSchema),
    defaultValues: initialData ? {
      images: initialData.images,
      name: initialData.name,
      desc: initialData.desc,
      price: Number(String(initialData.price)),
      categoryId: initialData.categoryId,
      isArchived: initialData.isArchived,
      isFeatured: initialData.isFeatured,
    } : {
      images: [],
      name: "",
      desc: "",
      price: 0,
      categoryId: ""
    }
  })

  const onSubmit = (values: ProductFormValues) => {
    startTransition(async () => {
      try {
        if (initialData == null) {
          await createProduct(values)
          toast.success("Produto criado com sucesso.")
        }
      } catch (error) {
        toast.error("Ops! Algo deu errado.")
        console.log(error)
      }
    })
  }

  const onSubmitEdit = (values: UpdateProductFormValues) => {
    startTransition(async () => {
      if (initialData) {
        try {
          await updateProduct(initialData.id, values)
          toast.success("Produto atualizado com sucesso.")
        }

        catch (error) {
          toast.error("Ops! Algo deu errado.")
          console.log(error)
        }
      }
    })
  }

  return (
    <>
      <h1 className="text-center text-4xl font-bold mb-4">
        {initialData ? "Edição do produto" : "Cadastro do produto"}
      </h1>
      <Form {...form}>
        <form
          onSubmit={initialData ? form.handleSubmit(onSubmitEdit) : form.handleSubmit(onSubmit)}
          className="max-w-screen-sm mx-auto mt-16 bg-[#1E1E1E] text-white shadow-lg p-12 py-8 rounded-xl"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (<FormItem>
                <FormControl>
                  <ImageUpload
                    disabled={isPending}
                    value={field.value.map(image => image.url)}
                    onChange={url => {
                      field.onChange(field.value.push({ url }))
                      return field.onChange(field.value)
                    }}
                    onRemove={url => field.onChange([...field.value.filter(productImg => productImg.url !== url)])}
                    onDefault={url => field.onChange(
                      field.value.map(productImg => {
                        if (productImg.defaultImage === true) productImg.defaultImage = false
                        if (productImg.url == url) productImg.defaultImage = true
                        return productImg
                      })
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
              )
              }
            />
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
                      placeholder="Nome do produto"
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
                      className="placeholder:text-gray placeholder:text-xl text-xl border-0 caret-white border-b rounded-none focus-visible:ring-offset-0 bg-transparent border-white font-bold"
                      {...field}
                      disabled={isPending}
                      placeholder="Descrição"
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
                      className="placeholder:text-gray placeholder:text-xl text-xl border-0 caret-white border-b rounded-none focus-visible:ring-offset-0 bg-transparent border-white font-bold"
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
                      <SelectTrigger className="placeholder:text-gray placeholder:text-xl text-xl border-0 caret-white border-b rounded-none focus-visible:ring-offset-0 bg-transparent border-white font-bold" disabled={isPending}>
                        <SelectValue placeholder="Categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-[#1E1E1E] text-white">
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
            {initialData != null &&
              <>
                <FormField
                  control={form.control}
                  name="isArchived"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          className="border-2 border-white h-5 w-5"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isPending}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-white">
                          Arquivado
                        </FormLabel>
                        <FormDescription className="text-white">
                          Esse produto não vai aparecer em nenhum lugar da loja.
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isFeatured"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          className="border-2 border-white h-5 w-5"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isPending}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-white">
                          Destaque
                        </FormLabel>
                        <FormDescription className="text-white">
                          Esse produto  vai aparecer na página principal da loja.
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            }
          </div>
          <div className="flex justify-end gap-2 md:gap-4 mt-5">
            <Link href="/admin/products" className="text-2xl flex items-center gap-3 bg-black rounded-full py-1 px-6 text-white font-bold">
              Voltar
            </Link>
            <button className="text-2xl flex items-center md:gap-3 bg-white rounded-full py-2 px-4 text-black font-bold">
              {isPending ? "Cadastrando..." : "Cadastrar"}
              <Image
                className="inline"
                src={Bolsa}
                alt="Ícone de uma bolsa"
              />
            </button>
          </div>
        </form>
      </Form>
    </>
  )
}