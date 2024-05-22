import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import Stripe from "stripe"
import { CheckoutForm } from "./_components/checkout-form"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

const PurchasePage = async ({
  params: { id }
}: {
  params: { id: string }
}) => {
  const product = await db.product.findUnique({
    where: { id },
    include: {
      images: true
    }
  })

  if (product == null) return notFound()

  const cleanProduct = {
    ...product,
    price: product.price.toNumber()
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: (Number(product.price) * 100),
    currency: "BRL",
    metadata: {
      session: 'single_product_session',
      productId: product.id
    }
  })

  if (paymentIntent.client_secret == null) {
    throw Error("Stripe falhou em criar a intenção de pagamento.")
  }

  return (
    <CheckoutForm product={cleanProduct} clientSecret={paymentIntent.client_secret} />
  )
}

export default PurchasePage