import { CartTable } from "./_components/cart-table"
import Summary from "./_components/summary"

const CartPage = () => {
  return (
    <div className="max-w-screen-md mx-auto my-6">
      <h1 className="uppercase text-center mb-8 font-bold text-2xl">Carrinho de compras</h1>
      <CartTable />
      <Summary />
    </div>
  )
}

export default CartPage