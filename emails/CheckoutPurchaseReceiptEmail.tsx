import { OrderItem, Product } from "@prisma/client"
import { Body, Container, Head, Heading, Html, Preview, Tailwind } from "@react-email/components"

type CleanProduct = Omit<Product, 'price'> & { price: number }
type CleanOrderItem = Omit<OrderItem, 'pricePaid'> & { pricePaid: number }

type CheckoutPurchaseReceiptEmail = {
  orderItems: CleanOrderItem[];
  products: CleanProduct[];
}

const CheckoutPurchaseReceiptEmail = ({ orderItems, products }: CheckoutPurchaseReceiptEmail) => {
  return (
    <Html>
      <Preview>Parabéns pela compras dos produtos {products.map(product => product.name).join(', ')}</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white">

        </Body>
      </Tailwind>
    </Html>
  )
}

export default CheckoutPurchaseReceiptEmail