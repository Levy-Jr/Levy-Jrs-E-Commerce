"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import useCart from "@/hooks/use-cart"
import { currencyFormatter } from "@/lib/utils"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import toast from "react-hot-toast"
import Lixeira from "/public/e-commerce/carrinho-de-compras/lixeira-icone.svg"

export const CartTable = () => {
  const searchParams = useSearchParams()

  const cart = useCart()
  const removeAll = useCart(state => state.removeAll)

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Pagamento completado.")
      removeAll()
    }

    if (searchParams.get("canceled")) {
      toast.error("Algum aconteceu errado")
    }
  }, [searchParams, removeAll])

  const onRemove = (id: string) => {
    const itemCart = cart.items.filter(item => item.id == id)[0]
    cart.removeItem(itemCart.id)
  }

  return (
    <>
      <span
        className="cursor-pointer text-[#F33C52] text-xl flex items-center gap-3"
        onClick={removeAll}>
        Remover tudo
        <Image src={Lixeira} alt="Lixeira" className="inline" />
      </span>
      <Table>
        <TableHeader>
          <TableRow className="text-xl flex pt-4">
            <TableHead className="inline-block w-full">
              <span className="sr-only">Imagem do produto</span>
            </TableHead>
            <TableHead className="text-center text-white inline-block w-full">Produto</TableHead>
            <TableHead className="text-center text-white inline-block w-full">Preço</TableHead>
            <TableHead className="inline-block w-full">
              <span className="sr-only">Botão de deletar</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-center">
          {cart.items.map(cartItem => (
            <TableRow key={cartItem.id} className="border-none flex items-center justify-between mt-8">
              <TableCell className="p-0 inline-block w-full">
                <Image
                  src={cartItem.images.filter(img => img.defaultImage)[0].url}
                  alt={cartItem.name}
                  width={90}
                  height={90}
                />
              </TableCell>
              <TableCell className="text-xl font-semibold inline-block w-full">
                {cartItem.name}
              </TableCell>
              <TableCell className="text-xl font-semibold inline-block w-full">{currencyFormatter.format(Number(cartItem.price))}</TableCell>
              <TableCell className="inline-block w-full">
                <Image
                  className="cursor-pointer mx-auto"
                  onClick={() => onRemove(cartItem.id)}
                  src={Lixeira}
                  alt="Lixeira"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}