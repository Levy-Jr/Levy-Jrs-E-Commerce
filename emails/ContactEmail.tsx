import { Html, Tailwind, Head, Body, Container, Text, Preview, Hr } from "@react-email/components"

type ContactEmailProps = {
  values: {
    subject: string;
    message: string;
    fullName: string;
    email: string;
    phoneNumber: string;
  }
}

const ContactEmail = ({ values }: ContactEmailProps) => {
  return (
    <Html>
      <Preview>{values.subject}</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white">
          <Container className="max-w-xl">
            <Text className="text-2xl mb-0 uppercase text-center whitespace-nowrap text-wrap">{values.subject}</Text>
            <Text className="text-lg mt-0 text-center whitespace-nowrap text-wrap">{values.message}</Text>
            <Hr />
            <Text className="text-sm my-0 whitespace-nowrap text-wrap">Email do cliente: {values.email}</Text>
            <Text className="text-sm my-0 whitespace-nowrap text-wrap">Nome completo do cliente: {values.fullName}</Text>
            <Text className="text-sm my-0">Telefone do cliente: {values.phoneNumber}</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

ContactEmail.PreviewProps = {
  values: {
    subject: "Compras",
    message: "Queria fazer um teste...",
    fullName: "Levy Gomes da Silva Costa Junior",
    email: "levyjrgomes@gmail.com",
    phoneNumber: "92985849261"
  }
} satisfies ContactEmailProps

export default ContactEmail