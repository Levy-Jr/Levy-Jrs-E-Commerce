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
        className="cursor-pointer"
        onClick={removeAll}>
        Remover tudo
      </span>
      <Table>
        <TableHeader>
          <TableRow className="text-xl">
            <TableHead>
              <span className="sr-only">Imagem do produto</span>
            </TableHead>
            <TableHead className="text-center text-white">Produto</TableHead>
            <TableHead className="text-center text-white">Preço</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-center">
          {cart.items.map(cartItem => (
            <TableRow key={cartItem.id} className="border-none">
              <TableCell className="p-0">
                <Image
                  src={cartItem.images.filter(img => img.defaultImage)[0].url}
                  alt={cartItem.name}
                  width={90}
                  height={90}
                />
              </TableCell>
              <TableCell className="text-xl font-semibold">
                {cartItem.name}
              </TableCell>
              <TableCell className="text-xl font-semibold">{currencyFormatter.format(Number(cartItem.price))}</TableCell>
              <TableCell>
                <Image
                  className="cursor-pointer"
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