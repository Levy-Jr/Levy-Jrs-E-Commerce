import { Prisma } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import Carrinho from "/public/e-commerce/inicio/carrinho-de-compras-preto.svg"

type CleanProduct = Omit<Prisma.ProductGetPayload<{
  include: { images: true, category: true }
}>, 'price'> & { price: number }

type ProductCardProps = {
  product: CleanProduct
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <li className="rounded-xl overflow-hidden bg-[#1E1E1E]">
      <div className="relative aspect-square">
        <Image
          src={product.images.filter(img => img.defaultImage)[0].url}
          fill
          alt={product.name}
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-3xl">{product.name}</h3>
        <p className="font-semibold text-lg my-4">{product.desc}</p>
        <div className="flex items-center text-xl md:text-2xl gap-4">
          <Link
            className="py-2 font-semibold transition-colors bg-black hover:bg-white flex-1 text-center border-2 border-white hover:border-black rounded-full text-white hover:text-black inline-block"
            href={`/products/${product.id}`}
          >Ver mais</Link>
          <Link
            className="py-2 font-semibold transition-colors bg-white hover:bg-gray flex-1 text-center rounded-full text-black inline-block"
            href={`/products/${product.id}/checkout`}
          >Comprar
            <Image className="inline ml-1" src={Carrinho} alt="Carrinho de compras" />
          </Link>
        </div>
      </div>
    </li>
  )
}