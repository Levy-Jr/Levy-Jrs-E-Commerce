import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { currencyFormatter } from "@/lib/utils"
import { Prisma } from "@prisma/client"

type OrderInformationProps = {
  orders: Prisma.OrderGetPayload<{
    select: {
      id: true,
      pricePaid: true,
      product: {
        select: {
          name: true
        }
      },
      user: true,
      createdAt: true
    },
  }>[]
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
          <TableRow key={order.id}>
            <TableCell>{order.product.name}</TableCell>
            <TableCell>{currencyFormatter.format(Number(order.pricePaid) / 100)}</TableCell>
            <TableCell>{dateFormatter.format(order.createdAt)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}