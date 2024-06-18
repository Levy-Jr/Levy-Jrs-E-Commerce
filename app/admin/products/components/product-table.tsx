"use client"

import { deleteProduct } from "@/actions/delete-product"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { currencyFormatter } from "@/lib/utils"
import { Prisma } from "@prisma/client"
import Image from "next/image"
import Lixeira from "/public/e-commerce/carrinho-de-compras/lixeira-icone.svg"
import Editar from "/public/e-commerce/produtos/editar-icone.svg"
import toast from "react-hot-toast"
import Link from "next/link"
import { AlertModal } from "@/components/modals/alert-modal"
import { Fragment, useState } from "react"

type CleanProduct = Omit<Prisma.ProductGetPayload<{
  include: { images: true }
}>, 'price'> & { price: number }

type ProductListProps = {
  products: CleanProduct[]
}

const ProductTable = ({
  products
}: ProductListProps) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleDeleteButton = async (id: string) => {
    try {
      setLoading(true)
      await deleteProduct(id)
      toast.success("Produto excluído com sucesso.")
    } catch (error) {
      toast.error("Ops! Algo deu errado!")
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="text-xl flex pt-4">
          <TableHead className="inline-block w-[min(17.51rem,100%)]">
            <span className="sr-only">Imagem do produto</span>
          </TableHead>
          <TableHead className="text-center text-white inline-block w-full">Produtos</TableHead>
          <TableHead className="text-center text-white inline-block w-full">Preço</TableHead>
          <TableHead className="inline-block w-1/4">
            <span className="sr-only">Botão de editar</span>
          </TableHead>
          <TableHead className="inline-block w-1/4">
            <span className="sr-only">Botão de deletar</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-center">
        {products.map(product => (
          <Fragment key={product.id}>
            <AlertModal
              isOpen={open}
              onClose={() => setOpen(false)}
              onConfirm={() => handleDeleteButton(product.id)}
              loading={loading}
            />
            <TableRow key={product.id} className="border-none flex items-center justify-between mt-8">
              <TableCell className="p-0 inline-block w-[min(17.51rem,100%)]">
                <Image
                  className="w-full h-auto"
                  src={product.images.filter(img => img.defaultImage)[0].url}
                  alt={product.name}
                  width={200}
                  height={200}
                />
              </TableCell>
              <TableCell className="text-xl font-semibold inline-block w-full">
                {product.name}
              </TableCell>
              <TableCell className="text-xl font-semibold inline-block w-full">{currencyFormatter.format(Number(product.price))}</TableCell>
              <TableCell className="inline-block w-1/4">
                <Link href={`/admin/products/${product.id}`}>
                  <Image
                    className="cursor-pointer mx-auto"
                    src={Editar}
                    alt="Editar"
                  />
                </Link>
              </TableCell>
              <TableCell className="inline-block w-1/4">
                <Image
                  onClick={() => setOpen(true)}
                  className="cursor-pointer mx-auto"
                  src={Lixeira}
                  alt="Lixeira"
                />
              </TableCell>
            </TableRow>
          </Fragment>
        ))}
      </TableBody>
    </Table>
  )
}

export default ProductTable