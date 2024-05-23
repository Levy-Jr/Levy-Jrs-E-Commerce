import { Prisma } from "@prisma/client"
import { Body, Container, Head, Heading, Hr, Html, Preview, Tailwind } from "@react-email/components"
import { Fragment } from "react"
import { OrderItemInfo } from "./components/order-item-info"

type CleanOrderItem = Omit<Prisma.OrderItemGetPayload<{
  include: {
    order: true
    product: {
      include: {
        images: true
      }
    }
  }
}>, 'pricePaid'> & { pricePaid: number }

type CheckoutPurchaseReceiptEmail = {
  orderItems: CleanOrderItem[];
}

const CheckoutPurchaseReceiptEmail = ({ orderItems }: CheckoutPurchaseReceiptEmail) => {

  return (
    <Html>
      <Preview>Parabéns pela compra {orderItems.length > 1 ? "dos produtos" : "do produto"} {orderItems.map(orderItem => orderItem.product.name).join(', ')}</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white">
          <Container className="max-w-xl">
            <Heading>{orderItems.length > 1 ? "Produtos" : "Produto"}</Heading>
            {orderItems.map((orderItem, index) => (
              <Fragment key={orderItem.id}>
                <OrderItemInfo
                  product={{
                    id: orderItem.product.id,
                    categoryId: orderItem.product.categoryId,
                    name: orderItem.product.name,
                    desc: orderItem.product.desc,
                    price: orderItem.product.price.toNumber(),
                    isArchived: orderItem.product.isArchived,
                    isFeatured: orderItem.product.isFeatured,
                    createdAt: orderItem.product.createdAt,
                    updatedAt: orderItem.product.updatedAt,
                    images: orderItem.product.images
                  }}
                  orderItem={orderItem}
                />
                {index < orderItems.length - 1 && <Hr />}
              </Fragment>
            ))}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default CheckoutPurchaseReceiptEmail