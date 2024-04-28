import ContactCard from "./components/contact-card"

const ContactPage = () => {
  return (
    <div className="pt-8 p-6">
      <h1 className="text-3xl tracking-wider font-semibold text-center py-6">CONTATO</h1>
      <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-6 mt-8">
        <ContactCard
          title="ASSUNTOS GERAIS"
          desc="Para questões gerais, feedback ou parcerias, acesse:"
          href="/contact/general"
        />
        <ContactCard
          title="SUPORTE E GARANTIA"
          desc="Para assistência ou informações sobre garantia acesse:"
          href="/contact/support"
        />
      </div>
    </div>
  )
}

export default ContactPage