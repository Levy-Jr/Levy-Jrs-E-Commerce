import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { db } from "@/lib/db"
import { currencyFormatter } from "@/lib/utils"
import { MoreVertical } from "lucide-react"
import { DeleteDropDownItem } from "./order-action"
import { Fragment } from "react"

export const OrdersTable = async () => {
  const orders = await db.order.findMany({
    select: {
      id: true,
      isPaid: true,
      orderItems: {
        select: {
          product: true
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
        <TableRow>
          <TableHead>Produto</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Pago</TableHead>
          <TableHead>Preço</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Ações</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map(order => (
          order.orderItems.map((orderItem, index) => (
            <TableRow key={order.id}>
              <Fragment key={index}>
                <TableCell>{orderItem.product.name}</TableCell>
                <TableCell>{order.user.email}</TableCell>
                <TableCell>{order.isPaid ? "Sim" : "Não"}</TableCell>
                <TableCell>{currencyFormatter.format(Number(orderItem.product.price))}</TableCell>
                <TableCell className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreVertical />
                      <span className="sr-only">Ações</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DeleteDropDownItem
                        id={orderItem.product.id}
                      />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </Fragment>
            </TableRow>
          ))
        ))}
      </TableBody>
    </Table>
  )
}