"use client"

import Image from "next/image"
import Logo from "/public/e-commerce/logo.svg"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Favoritos from "/public/e-commerce/inicio/favoritos-icone.svg"
import Carrinho from "/public/e-commerce/inicio/carrinho-icone.svg"
import Perfil from "/public/e-commerce/inicio/perfil-icone.svg"

const Navbar = () => {
  const pathname = usePathname()

  const routes = [
    {
      href: '/',
      label: "Início",
      active: pathname === '/'
    },
    {
      href: "/products",
      label: "Produtos",
      active: pathname === "/products"
    },
    {
      href: "/contact",
      label: "Contato",
      active: pathname === "/contact"
    }
  ]
  return (
    <nav className="p-8 py-4 flex justify-between items-center space-x-4 lg:space-x-10">
      <Image src={Logo} alt="logo" />
      <div className="space-x-4">
        {routes.map(route => (
          <Link
            key={route.href}
            href={route.href}
            className="text-xl text-white font-medium transition-colors p-2"
          >
            {route.label}
          </Link>
        ))}
      </div>
      <div className="flex space-x-4">
        <Link href="">
          <Image
            src={Favoritos}
            alt="Favoritos"
          />
        </Link>
        <Link href="/cart">
          <Image
            src={Carrinho}
            alt="Carrinho de compras"
          />
        </Link>
        <Link href="/my-account">
          <Image
            src={Perfil}
            alt="Perfil"
          />
        </Link>
      </div>
    </nav>
  )
}

export default Navbar