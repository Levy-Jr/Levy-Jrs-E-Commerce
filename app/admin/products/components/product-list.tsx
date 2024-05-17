"use client"

import { deleteProduct } from "@/actions/delete-product"
import { Button } from "@/components/ui/button"
import { currencyFormatter } from "@/lib/utils"
import { Prisma } from "@prisma/client"
import { Pencil, TrashIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import toast from "react-hot-toast"

type CleanProduct = Omit<Prisma.ProductGetPayload<{
  include: { images: true }
}>, 'price'> & { price: number }

type ProductListProps = {
  products: CleanProduct[]
}

const ProductList = ({
  products
}: ProductListProps) => {
  const handleDeleteButton = async (id: string) => {
    try {
      await deleteProduct(id)
      toast.success("Produto excluído com sucesso.")
    } catch (error) {
      toast.error("Ops! Algo deu errado!")
    }
  }

  return (
    <>
      {products.map(product => (
        <li key={product.id} className="mt-4 p-2 rounded-md mx-auto shadow-2xl w-full">
          <h2 className="text-center uppercase font-bold">{product.name}</h2>
          <div className="relative aspect-square">
            <Image
              src={product.images.filter(img => img.defaultImage)[0] ? product.images.filter(img => img.defaultImage)[0].imagePath : product.images[0].imagePath}
              alt={product.name}
              fill
            />
          </div>
          <p className="text-center truncate">
            {product.desc}
          </p>
          <p className="text-red-700 font-bold my-2 text-lg text-center">
            {currencyFormatter.format(Number(product.price))}
          </p>
          <div className="text-end space-x-3">
            <Button className="bg-green-600 hover:bg-green-700" asChild>
              <Link href={`/admin/products/${product.id}`}>
                <Pencil />
              </Link>
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700"
              onClick={() => handleDeleteButton(product.id)}
            >
              <TrashIcon />
            </Button>
          </div>
        </li>
      ))}
    </>
  )
}

export default ProductList