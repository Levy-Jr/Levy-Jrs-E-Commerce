"use client"

import { cartCheckout } from "@/actions/cart-checkout"
import { Button } from "@/components/ui/button"
import useCart from "@/hooks/use-cart"
import { currencyFormatter } from "@/lib/utils"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import toast from "react-hot-toast"

const Summary = () => {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const items = useCart(state => state.items)
  const removeAll = useCart(state => state.removeAll)

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price)
  }, 0)

  const productIds = items.map(item => item.id)

  const onCheckout = () => {
    startTransition(async () => {
      try {
        const response = await cartCheckout(productIds)

        if (response.url) router.push(response.url)
      } catch (error) {
        toast("Algo deu errado")
      }
    })
  }

  return (
    <div className="max-w-[20rem] ml-auto mt-12 border border-gray-400 rounded-lg p-4 space-y-3">
      <p>Preço total:  <span className="text-[#ff0000] font-bold">{currencyFormatter.format(totalPrice)}</span></p>
      <div className="text-end">
        <Button
          disabled={pending}
          onClick={onCheckout}
        >
          {pending ? "Carregando..." : "COMPRAR"}
        </Button>
      </div>
    </div>
  )
}

export default Summary