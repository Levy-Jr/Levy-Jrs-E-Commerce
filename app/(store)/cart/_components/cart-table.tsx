"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import useCart from "@/hooks/use-cart"
import { currencyFormatter } from "@/lib/utils"
import Image from "next/image"

export const CartTable = () => {
  const cart = useCart()

  const onRemove = (id: string) => {
    const itemCart = cart.items.filter(item => item.id == id)[0]
    cart.removeItem(itemCart.id)
  }

  return (
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
              <Button>Remover</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}