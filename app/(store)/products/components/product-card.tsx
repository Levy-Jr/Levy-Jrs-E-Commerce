import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { currencyFormatter } from "@/lib/utils"
import { Prisma } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

type ProductCardProps = {
  product: Prisma.ProductGetPayload<{
    include: { images: true, category: true }
  }>
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="truncate">{product.name}</CardTitle>
      </CardHeader>
      <div className="relative aspect-square">
        <Image
          src={product.images.filter(img => img.defaultImage)[0].imagePath}
          fill
          alt={product.name}
        />
      </div>
      <CardContent className="border-y border-slate-300 py-2 my-2">
        <p className="font-bold text-center text-[#ff0000]">{currencyFormatter.format(Number(product.price))}</p>
      </CardContent>
      <CardFooter className="p-0">
        <Button
          className="w-full bg-red-500 hover:bg-red-700 tracking-widest"
          size="lg"
          asChild>
          <Link href={`/products/${product.id}`}>DETALHES</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}