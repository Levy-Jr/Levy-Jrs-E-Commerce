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

  console.log("ORDERS: ", orders)
  orders.map(order => console.log(order.orderItems))

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
          <TableRow key={order.id}>
            {order.orderItems.map((orderItem, index) => (
              <Fragment key={index}>
                <TableCell>{orderItem.product.name}</TableCell>
                <TableCell>{currencyFormatter.format(Number(orderItem.pricePaid) / 100)}</TableCell>
                <TableCell>{dateFormatter.format(order.createdAt)}</TableCell>
              </Fragment>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}