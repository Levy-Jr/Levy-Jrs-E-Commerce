import { db } from "@/lib/db"
import { currencyFormatter } from "@/lib/utils";
import Link from "next/link";
import { AddToCartButton } from "./_components/add-to-cart-btn";
import { ShoppingCart } from "lucide-react";
import { CarouselSlide } from "./_components/carousel-slide";

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
    <div className="px-8 bg-product bg-no-repeat bg-cover">
      <div className="w-[min(31.25rem,100%)] gradient-border-bg bg-[rgba(0,0,0,0.6)] backdrop-blur-sm">
        <CarouselSlide images={product.images} />
        <div className="flex-2 p-6 pt-3 w-full mx-auto">
          <h1 className="text-2xl font-bold tracking-wide uppercase">{product.name}</h1>
          <p className="my-5">{product.desc}</p>
          <Link
            className="bg-white text-xl text-center font-bold mb-4 rounded-full transition-colors hover:bg-gray text-black w-full py-3 inline-block"
            href={`/products/${params.id}/checkout`}
          >Comprar: {currencyFormatter.format(Number(product.price))}
          </Link>
          <AddToCartButton data={product}>
            Colocar no carrinho <ShoppingCart width={20} className="inline" />
          </AddToCartButton>
        </div>
      </div>
    </div>
  )
}

export default ProductPage