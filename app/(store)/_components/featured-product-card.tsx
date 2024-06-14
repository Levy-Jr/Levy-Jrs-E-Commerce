import { Prisma } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import Carrinho from "/public/e-commerce/inicio/carrinho-de-compras-preto.svg"
import { currencyFormatter } from "@/lib/utils"

type ProductCardProps = {
  product: Prisma.ProductGetPayload<{
    include: { images: true, category: true }
  }>
}

export const FeaturedProductCard = ({ product }: ProductCardProps) => {
  return (
    <li className="rounded-xl w-[min(26.25rem,100%)] mx-auto overflow-hidden">
      <div className="relative w-full aspect-square mx-auto">
        <Image
          src={product.images.filter(img => img.defaultImage)[0].url}
          alt={product.name}
          fill
        />
      </div>
      <div className="bg-[#1E1E1E] h-full p-6">
        <h2 className="font-bold text-3xl">{product.name}</h2>
        <p className="font-semibold text-lg mt-3">{product.desc}</p>
        <p className="font-semibold text-4xl my-3">{currencyFormatter.format(Number(product.price))}</p>
        <div className="flex items-center text-xl md:text-2xl gap-4">
          <Link
            className="py-2 font-semibold bg-black flex-1 text-center border-2 border-white rounded-full text-white inline-block"
            href={`/products/${product.id}`}>
            Ver mais
          </Link>
          <Link
            className="py-2 font-semibold bg-white text-black inline-block flex-1 text-center rounded-full"
            href={`products/${product.id}/checkout`}>
            Comprar
            <Image className="inline ml-1 md:ml-2" src={Carrinho} alt="Carrinho de compras" />
          </Link>
        </div>
      </div>
    </li>
  )
}