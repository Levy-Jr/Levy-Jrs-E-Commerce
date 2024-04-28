"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Navbar = () => {
  const pathname = usePathname()

  const routes = [
    {
      href: '/',
      label: "Início",
      active: pathname === '/'
    },
    {
      href: "/store",
      label: "Loja",
      active: pathname === "/store"
    },
    {
      href: "/contact",
      label: "Contato",
      active: pathname === "/contact"
    },
    {
      href: "/my-account",
      label: "Minha conta",
      active: pathname === "/my-account"
    }
  ]
  return (
    <nav className="p-8 py-4 flex items-center justify-end space-x-4 lg:space-x-10 border-b-4 border-red-700">
      {routes.map(route => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:bg-red-600 p-2 rounded-md tracking-widest",
            route.active ? "bg-red-600" : ""
          )}
        >
          {route.label.toUpperCase()}
        </Link>
      ))}
    </nav>
  )
}

export default Navbar