import { currencyFormatter } from "@/lib/utils"
import { Prisma } from "@prisma/client"
import { Html, Tailwind, Head, Body, Container, Text, Preview, Section, Row, Column, Img } from "@react-email/components"

type CleanProduct = Omit<Prisma.ProductGetPayload<{
  include: {
    images: true
  }
}>, 'price'> & { price: number }
type CleanOrderItem = Omit<Prisma.OrderItemGetPayload<{
  include: {
    order: {
      select: {
        createdAt: true
      }
    }
  }
}>, 'pricePaid'> & { pricePaid: number }

type PurchaseReceiptEmailProps = {
  orderItem: CleanOrderItem;
  product: CleanProduct;
}

const dateFormatter = new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" })

const PurchaseReceiptEmail = ({ orderItem, product }: PurchaseReceiptEmailProps) => {
  const defaultProductImage = product.images.filter(img => img.defaultImage)[0].imagePath

  return (
    <Html>
      <Preview>Parabéns pela compra do produto {product.name}!</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white">
          <Container className="max-w-xl">
            <Section>
              <Row>
                <Column>
                  <Text className="mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4">ID do Pedido</Text>
                  <Text className="mt-0 mr-4">{orderItem.orderId}</Text>
                </Column>
                <Column>
                  <Text className="mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4">Preço Pago</Text>
                  <Text className="mt-0 mr-4">{currencyFormatter.format(product.price)}</Text>
                </Column>
                <Column>
                  <Text className="mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4">Comprado Em</Text>
                  <Text className="mt-0 mr-4">{dateFormatter.format(orderItem.order.createdAt)}</Text>
                </Column>
              </Row>
            </Section>
            <Section className="border border-solid border-gray-500 rounded-lg p-4 md:p-6 my-4">
              <Img
                width="100%"
                alt={product.name}
                src={`${process.env.NEXT_PUBLIC_SERVER_URL}${defaultProductImage}`}
              />
              <Row className="mt-8">
                <Column>
                  <Text className="mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4">Nome do Produto</Text>
                  <Text className="mt-0 mr-4">{product.name}</Text>
                </Column>
                <Column>
                  <Text className="mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4">Descrição do Produto</Text>
                  <Text className="mt-0 mr-4">{product.desc}</Text>
                </Column>
              </Row>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
export default PurchaseReceiptEmail