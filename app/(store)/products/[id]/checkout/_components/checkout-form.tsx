"use client"

import { currencyFormatter } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { PurchaseForm } from "./purchase-form";

type CleanProduct = Omit<Prisma.ProductGetPayload<{
  include: { images: true }
}>, 'price'> & { price: number }

type CheckoutFormProps = {
  product: CleanProduct;
  clientSecret: string;
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string)

export const CheckoutForm = ({ product, clientSecret }: CheckoutFormProps) => {
  return (
    <div className="max-w-5xl w-full mx-auto space-y-8">
      <div className="flex gap-4 items-center">
        <div className="aspect-square flex-shrink-0 w-1/3 relative">
          <Image
            src={product.images.filter(img => img.defaultImage)[0].url}
            fill
            alt={product.name}
          />
        </div>
        <div>
          <div className="text-lg">
            {currencyFormatter.format(product.price)}
          </div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="line-clamp-3 text-muted-foreground">
            {product.desc}
          </div>
        </div>
      </div>
      <Elements options={{ clientSecret }} stripe={stripePromise}>
        <PurchaseForm price={product.price} />
      </Elements>
    </div>
  )
}