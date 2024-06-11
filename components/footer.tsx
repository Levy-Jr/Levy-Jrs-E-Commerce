import Image from "next/image"
import Logo from "/public/e-commerce/logo-png.webp"
import { FooterBar } from "./footer-bar"
import Link from "next/link"

export const Footer = () => {
  return (
    <footer className="bg-[#1E1E1E]">
      <FooterBar />
      <div className="p-8">
        <div className="grid grid-cols-3">
          <div>
            <Image
              src={Logo}
              alt="Logo"
              width={110}
            />
          </div>
          <div>
            <h3 className="font-bold text-2xl text-[#67676B]">Links</h3>
            <ul className="text-xl font-medium space-y-6 mt-4">
              <li><Link href="/">Início</Link></li>
              <li><Link href="/products">Produtos</Link></li>
              <li><Link href="/contact">Contato</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-2xl text-[#67676B]">Ajuda</h3>
            <ul className="text-xl font-medium space-y-6 mt-4">
              <li><Link href="/contact">Contato</Link></li>
              <li><Link href="/login">Fazer login</Link></li>
              <li><Link href="/my-account">Minha conta</Link></li>
            </ul>
          </div>
        </div>
        <p className="text-center font-medium text-[#67676B] mt-8">Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}