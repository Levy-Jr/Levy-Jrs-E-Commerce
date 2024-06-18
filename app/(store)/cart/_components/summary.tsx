"use client"

import { cartCheckout } from "@/actions/cart-checkout"
import useCart from "@/hooks/use-cart"
import { currencyFormatter } from "@/lib/utils"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import toast from "react-hot-toast"
import Seta from "/public/e-commerce/carrinho-de-compras/comprar-icone.svg"

const Summary = () => {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const items = useCart(state => state.items)
  const removeAll = useCart(state => state.removeAll)

  if (items.length === 0) return null

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
    <div className="max-w-[30rem] mt-12 space-y-3">
      <p className="font-semibold text-3xl">Preço total: {currencyFormatter.format(totalPrice)}</p>
      <div>
        <button
          type="button"
          disabled={pending}
          onClick={onCheckout}
          className="bg-white hover:bg-gray text-2xl font-bold gap-4 p-6 text-black rounded-full"
        >
          {pending ? "Carregando..." : "COMPRAR"}
          <Image
            src={Seta}
            alt="Seta"
          />
        </button>
      </div>
    </div>
  )
}

export default Summary