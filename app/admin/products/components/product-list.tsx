"use client"

import { deleteProduct } from "@/actions/delete-product"
import { Button } from "@/components/ui/button"
import { currencyFormatter } from "@/lib/utils"
import { Product } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

type CleanProduct = Omit<Product, 'price'> & { price: number }

type ProductListProps = {
  products: CleanProduct[]
}

const ProductList = ({
  products
}: ProductListProps) => {
  return (
    <ul className="flex gap-8">
      {products.map(product => (
        <li
          key={product.id}
          className="mt-4 p-2 rounded-md shadow-2xl max-w-[37.5rem]"
        >
          <h2 className="text-center uppercase font-bold">{product.name}</h2>
          <Image
            className="mx-auto"
            src={product.imagePath}
            width={300}
            height={300}
            alt={product.name}
          />
          <p className="text-center">{product.desc}</p>
          <p className="text-red-700 font-bold text-lg text-center">{currencyFormatter.format(Number(product.price))}</p>
          <div className="text-end">
            <Button className="bg-green-600 hover:bg-green-700" asChild>
              <Link href={`/admin/products/${product.id}`}>Editar</Link>
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700"
              onClick={() => deleteProduct(product.id)}
            >
              Excluir
            </Button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default ProductList