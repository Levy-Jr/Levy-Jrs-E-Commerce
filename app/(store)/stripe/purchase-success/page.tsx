import { Button } from "@/components/ui/button"
import { db } from "@/lib/db"
import { currencyFormatter } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

const SuccessPage = async ({ searchParams }: {
  searchParams: {
    payment_intent: string
  }
}) => {
  const paymentIntent = await stripe.paymentIntents.retrieve(searchParams.payment_intent)

  if (paymentIntent.metadata.productId == null) return notFound()

  const product = await db.product.findUnique({
    where: {
      id: paymentIntent.metadata.productId
    },
    include: {
      images: true
    }
  })

  if (product == null) return notFound()

  const isSuccess = paymentIntent.status === "succeeded"

  return (
    <div className="max-w-5xl w-full mx-auto space-y-8">
      <h1 className="text-4xl font-bold">{isSuccess ? "Sucesso!" : "Erro!"}</h1>
      <div className="flex gap-4 items-center">
        <div className="aspect-square flex-shrink-0 w-1/3 relative">
          <Image
            src={product.images.filter(img => img.defaultImage)[0].imagePath}
            fill
            alt={product.name}
          />
        </div>
        <div>
          <div className="text-lg">
            {currencyFormatter.format(Number(product.price))}
          </div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="line-clamp-3 text-muted-foreground">
            {product.desc}
          </div>
          <Button className="mt-4" size="lg" asChild>
            {!isSuccess &&
              <Link href={`products/${product.id}/purchase`}>Tente de novo</Link>
            }
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SuccessPage