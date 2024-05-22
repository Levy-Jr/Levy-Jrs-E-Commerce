"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import useCart from "@/hooks/use-cart"
import { currencyFormatter } from "@/lib/utils"
import { TrashIcon } from "lucide-react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import toast from "react-hot-toast"

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
        onClick={removeAll}
      >Remover tudo</span>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <span className="sr-only">Imagem do produto</span>
            </TableHead>
            <TableHead className="text-center">Produto</TableHead>
            <TableHead className="text-center">Preço</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-center">
          {cart.items.map(cartItem => (
            <TableRow key={cartItem.id}>
              <TableCell className="p-0">
                <div className="relative aspect-square w-full">
                  <Image
                    src={cartItem.images.filter(img => img.defaultImage)[0].imagePath}
                    alt={cartItem.name}
                    fill
                  />
                </div>
              </TableCell>
              <TableCell>{cartItem.name}</TableCell>
              <TableCell>{currencyFormatter.format(Number(cartItem.price))}</TableCell>
              <TableCell onClick={() => onRemove(cartItem.id)}>
                <TrashIcon className="cursor-pointer" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}