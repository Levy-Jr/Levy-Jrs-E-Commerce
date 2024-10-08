import { DeleteOrderItems } from "./_components/delete-order-items"
import { OrdersTable } from "./_components/orders-table"

const OrdersPage = async () => {

  return (
    <div className="p-8 pt-6">
      <h1 className="text-center uppercase font-bold text-3xl">Encomendas</h1>
      <DeleteOrderItems />
      <OrdersTable />
    </div>
  )
}

export default OrdersPage