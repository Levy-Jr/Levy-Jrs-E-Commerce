import { Order, Product } from "@prisma/client"
import { Html, Tailwind, Head, Body, Container, Text, Preview, Hr, Heading, Img } from "@react-email/components"

type CleanOrder = Omit<Order, 'pricePaid'> & { pricePaid: number }
type CleanProduct = Omit<Product, 'price'> & { price: number }

type PurchaseReceiptEmailProps = {
  order: CleanOrder;
  product: CleanProduct;
  defaultImg: string;
}

const PurchaseReceiptEmail = ({ order, product, defaultImg }: PurchaseReceiptEmailProps) => {
  return (
    <Html>
      <Preview>Parabéns pela compra do produto {product.name}!</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white">
          <Container className="max-w-xl">
            <Heading>Enviaremos um email quando o produto for enviado</Heading>
            <Img
              width="100%"
              alt={product.name}
              src={`${process.env.NEXT_PUBLIC_SERVER_URL}${defaultImg}`}
            />
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
    productId: crypto.randomUUID(),
    pricePaid: 5226,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  defaultImg: "/products/7b3647aa-3681-4a32-98f6-3b43a1f147b2=Notebook Acer Nitro 5 AN515-47-R9ES R7 512GB RTX 3050 15_6â.jpg"
} satisfies PurchaseReceiptEmailProps

export default PurchaseReceiptEmail