import { Order, Product } from "@prisma/client"
import { Html, Tailwind, Head, Body, Container, Text, Preview, Hr, Heading, Img } from "@react-email/components"

type CleanOrder = Omit<Order, 'pricePaid'> & { pricePaid: number }
type CleanProduct = Omit<Product, 'price'> & { price: number }

type PurchaseReceiptEmailProps = {
  order: CleanOrder;
  product: CleanProduct;
}

const PurchaseReceiptEmail = ({ order, product }: PurchaseReceiptEmailProps) => {
  return (
    <Html>
      <Preview>Parabéns pela compra do produto {product.name}!</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white">
          <Container className="max-w-xl">
            <Heading>Enviaremos um email quando o produto for enviado</Heading>
            <Text className="text-2xl mb-0 uppercase text-center whitespace-nowrap text-wrap">{product.name}</Text>
            <Text className="text-lg mt-0 text-center whitespace-nowrap text-wrap">{product.desc}</Text>
            <Hr />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

PurchaseReceiptEmail.PreviewProps = {
  product: {
    id: crypto.randomUUID(),
    categoryId: crypto.randomUUID(),
    name: "Nome do produto",
    desc: "Descrição do produto balblabla",
    price: 5226,
    isFeatured: false,
    isArchived: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  order: {
    id: crypto.randomUUID(),
    userId: crypto.randomUUID(),
    pricePaid: 5226,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
} satisfies PurchaseReceiptEmailProps

export default PurchaseReceiptEmail