import { Prisma } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import Carrinho from "/public/e-commerce/inicio/carrinho-de-compras-preto.svg"

type ProductCardProps = {
  product: Prisma.ProductGetPayload<{
    include: { images: true, category: true }
  }>
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <li className="bg-[#1E1E1E]">
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
            className="py-2 font-semibold bg-black flex-1 text-center border-2 border-white rounded-full text-white inline-block"
            href={`/products/${product.id}`}
          >Ver mais</Link>
          <Link
            className="py-2 font-semibold bg-white flex-1 text-center border-2 border-white rounded-full text-black inline-block"
            href={`/products/${product.id}/checkout`}
          >Comprar
            <Image className="inline ml-1" src={Carrinho} alt="Carrinho de compras" />
          </Link>
        </div>
      </div>
    </li>
  )
}