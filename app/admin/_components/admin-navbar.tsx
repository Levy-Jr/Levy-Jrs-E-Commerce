"use client"

import Image from "next/image"
import Logo from "/public/e-commerce/logo.svg"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Carrinho from "/public/e-commerce/inicio/carrinho-icone.svg"
import Perfil from "/public/e-commerce/inicio/perfil-icone.svg"
import { useEffect, useState } from "react"
import Menu from "/public/e-commerce/menu.svg"
import Fechar from "/public/e-commerce/fechar-icone.svg"
import { cn } from "@/lib/utils"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => setIsOpen(!isOpen)

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const routes = [
    {
      href: "/admin/products",
      label: "Produtos",
      active: pathname === "/admin/products"
    },
    {
      href: "/admin/orders",
      label: "Encomendas",
      active: pathname === "/orders"
    }
  ]
  return (
    <nav className="p-8 py-4 flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <Image src={Logo} alt="logo" />
        <span className="text-xl font-bold">ADMIN</span>
      </div>
      <button
        onClick={toggleMenu}
        className={cn("md:hidden", isOpen ? "relative z-50" : "")}
      >
        <Image
          className={cn("", isOpen ? "hidden" : "block")}
          src={Menu}
          alt="menu"
          width={40}
          height={40}
        />
        <Image
          className={cn("", isOpen ? "block" : "hidden")}
          src={Fechar}
          alt="Fechar menu"
          width={25}
          height={25}
        />
      </button>
      <div className={cn("md:flex w-full justify-between items-center", isOpen ? "fixed z-40 flex flex-col justify-center items-center bg-[rgba(0,0,0,0.6)] backdrop-blur-lg inset-0" : "hidden")}>
        <div className={cn("md:mx-auto md:space-x-8", isOpen ? "flex flex-col gap-3 items-center" : "")}>
          {routes.map(route => (
            <Link
              key={route.href}
              href={route.href}
              className="text-xl font-medium transition-colors p-2"
            >
              {route.label}
            </Link>
          ))}
        </div>
        <div className={cn("flex md:space-x-8", isOpen ? "flex-col gap-3 mt-3 items-center" : "")}>
          <Link
            className="text-xl font-medium transition-colors p-2 md:text-base md:font-normal md:transition-none md:p-0"
            href="/cart"
          >
            {isOpen ? "Carrinho" : ""}
            <Image
              className="inline-block ml-4 md:block"
              src={Carrinho}
              alt="Carrinho de compras"
            />
          </Link>
          <Link
            className="text-xl font-medium transition-colors p-2 md:text-base md:font-normal md:transition-none md:p-0"
            href="/my-account"
          >
            {isOpen ? "Conta" : ""}
            <Image
              className="inline ml-4 md:block"
              src={Perfil}
              alt="Perfil"
            />
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar