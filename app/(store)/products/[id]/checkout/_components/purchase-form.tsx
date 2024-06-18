"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { currencyFormatter } from "@/lib/utils"
import { AddressElement, LinkAuthenticationElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { FormEvent, useState } from "react"

export const PurchaseForm = ({ price }: { price: number }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>()
  const [email, setEmail] = useState<string>()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (stripe == null || elements == null || email == null) return

    setIsLoading(true)

    stripe.confirmPayment({
      elements, confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/purchase-success`
      }
    }).then(({ error }) => {
      if (error.type === "card_error" || error.type === "validation_error") {
        setErrorMessage(error.message)
      } else {
        setErrorMessage("Um erro desconhecido ocorreu")
      }
    }).finally(() => setIsLoading(false))
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
          {errorMessage &&
            <CardDescription className="text-destructive">{errorMessage}</CardDescription>
          }
        </CardHeader>
        <CardContent>
          <PaymentElement />
          <div className="mt-4">
            <LinkAuthenticationElement
              onChange={e => setEmail(e.value.email)}
            />
            <AddressElement options={{
              allowedCountries: ["BR"],
              mode: "shipping"
            }} />
          </div>
        </CardContent>
        <CardFooter>
          <button
            className="w-full bg-black py-4 text-white rounded-md"
            disabled={stripe == null || elements == null || isLoading == null}
          >{isLoading ?
            "Comprando..."
            : `Comprar - ${currencyFormatter.format(price)}`
            }
          </button>
        </CardFooter>
      </Card>
    </form>
  )
}