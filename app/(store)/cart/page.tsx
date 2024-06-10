import { CartTable } from "./_components/cart-table"
import Summary from "./_components/summary"

const CartPage = () => {
  return (
    <div className="my-6">
      <h1 className="text-center mb-8 font-bold text-2xl">Carrinho de compras</h1>
      <div className="w-[min(56.25rem,100%)] mx-auto">
        <CartTable />
        <Summary />
      </div>
    </div>
  )
}

export default CartPage