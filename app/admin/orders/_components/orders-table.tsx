import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { db } from "@/lib/db"
import { currencyFormatter } from "@/lib/utils"
import Image from "next/image"
import { Fragment } from "react"
import Lixeira from "/public/e-commerce/encomendas/lixeira-icone.svg"
import NaoPago from "/public/e-commerce/encomendas/nao-pago-icone.svg"
import Pago from "/public/e-commerce/encomendas/pago-icone.svg"
import { DeleteOrderItem } from "./delete-order-item"

export const OrdersTable = async () => {
  const orders = await db.order.findMany({
    select: {
      id: true,
      isPaid: true,
      orderItems: {
        select: {
          id: true,
          product: {
            include: {
              images: true
            }
          }
        }
      },
      user: {
        select: {
          fullName: true,
          email: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  if (orders.length === 0) return <p>Nenhuma venda encontrada.</p>

  return (
    <Table>
      <TableHeader>
        <TableRow className="text-xl flex pt-4">
          <TableHead className="text-center text-white inline-block w-full">Produto</TableHead>
          <TableHead className="text-center text-white inline-block w-full">Cliente</TableHead>
          <TableHead className="text-center text-white inline-block w-full">Preço</TableHead>
          <TableHead className="text-center text-white inline-block w-full">Pago</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Deletar</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map(order => (
          order.orderItems.map((orderItem, index) => (
            <TableRow
              className="border-none flex items-center justify-between mt-8"
              key={order.id}
            >
              <Fragment key={index}>
                <TableCell className="text-xl font-semibold inline-flex items-center gap-2 w-max md:w-full">
                  <Image
                    src={orderItem.product.images.filter(img => img.defaultImage)[0].url}
                    alt={orderItem.product.name}
                    width={80}
                    height={80}
                  />
                  {orderItem.product.name}
                </TableCell>
                <TableCell className="text-xl font-semibold inline-block w-max md:w-full">{order.user.email}</TableCell>
                <TableCell className="text-xl font-semibold inline-block w-max md:w-full">{currencyFormatter.format(Number(orderItem.product.price))}</TableCell>
                <TableCell className="inline-block w-max md:w-1/4">{order.isPaid ? <Image src={Pago} alt="Pago" /> : <Image src={NaoPago} alt="Não pago" />}</TableCell>
                <TableCell className="inline-block w-max md:w-1/4">
                  <DeleteOrderItem id={orderItem.id} />
                </TableCell>
              </Fragment>
            </TableRow>
          ))
        ))}
      </TableBody>
    </Table>
  )
}