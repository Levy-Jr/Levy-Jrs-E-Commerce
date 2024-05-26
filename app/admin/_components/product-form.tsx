"use client"

import { createProduct } from "@/actions/create-product"
import { updateProduct } from "@/actions/update-product"
import { Button } from "@/components/ui/button"
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
    <Form {...form}>
      <form
        onSubmit={initialData ? form.handleSubmit(onSubmitEdit) : form.handleSubmit(onSubmit)}
        className="max-w-screen-sm mx-auto mt-16 bg-red-600 text-white shadow-red-950 shadow-lg p-4 py-8 rounded-md"
      >
        <h1 className="text-center text-2xl font-bold mb-4">
          {initialData ? "EDIÇÃO DO PRODUTO" : "CADASTRO DO PRODUTO"}
        </h1>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (<FormItem>
              <FormLabel>Adicionar imagem: </FormLabel>
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
                    <SelectTrigger className="text-black" disabled={isPending}>
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
          {initialData != null &&
            <>
              <FormField
                control={form.control}
                name="isArchived"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Checkbox
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