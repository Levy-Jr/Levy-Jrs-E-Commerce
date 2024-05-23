import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { currencyFormatter } from "@/lib/utils"
import { UserOrder } from "@/types/OrderType"
import { Fragment } from "react"

type OrderInformationProps = {
  orders: UserOrder[]
}

const dateFormatter = new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" })

export const OrderInformation = ({ orders }: OrderInformationProps) => {
  if (orders.length === 0) return <p>Nenhuma encomenda encontrada.</p>

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Produto</TableHead>
          <TableHead>Preço Pago</TableHead>
          <TableHead>Comprado em</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map(order => (
          order.orderItems.map((orderItem, index) => (
            <TableRow key={order.id}>
              <Fragment key={index}>
                <TableCell>{orderItem.product.name}</TableCell>
                <TableCell>{currencyFormatter.format(Number(orderItem.pricePaid))}</TableCell>
                <TableCell>{dateFormatter.format(order.createdAt)}</TableCell>
              </Fragment>
            </TableRow>
          ))
        ))}
      </TableBody>
    </Table>
  )
}