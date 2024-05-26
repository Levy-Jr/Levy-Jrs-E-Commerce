import { Button } from "@/components/ui/button";
import { db } from "@/lib/db"
import { currencyFormatter } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "./_components/add-to-cart-btn";
import { ShoppingCart } from "lucide-react";

type ProductPageProps = {
  params: {
    id: string;
  }
}

const ProductPage = async ({ params }: ProductPageProps) => {

  const product = await db.product.findFirst({
    where: {
      id: params.id
    },
    include: {
      category: true,
      images: true
    }
  })

  if (!product) return null

  return (
    <div className="p-6">
      <div className="flex justify-between gap-4">
        <div className="relative aspect-square w-full max-w-[45%] mx-auto p-6">
          <Image
            src={product.images.filter(img => img.defaultImage)[0].url}
            fill
            alt={product.name}
          />
        </div>
        <div className="flex-2 p-6 shadow-xl w-full max-w-[45%] pt-20 mx-auto">
          <h1 className="text-2xl font-bold tracking-wide uppercase">{product.name}</h1>
          <p className="text-[#FF0000] my-4 font-bold text-lg tracking-wide">{currencyFormatter.format(Number(product.price))}</p>
          <Button className="bg-[#FF0000] mb-4 hover:bg-red-600 font-semibold text-lg w-full py-6" asChild>
            <Link href={`/products/${params.id}/checkout`}>COMPRAR</Link>
          </Button>
          <AddToCartButton data={product}>
            Adicionar ao carrinho <ShoppingCart width={20} />
          </AddToCartButton>
        </div>
      </div>
      <div className="mt-12">
        <p>{product.desc}</p>
      </div>
    </div>
  )
}

export default ProductPage