"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

const AdminNavbar = () => {
  const pathname = usePathname()

  const routes = [
    {
      href: '/admin',
      label: "Início",
      active: pathname === '/admin'
    },
    {
      href: "/admin/products",
      label: "Produtos",
      active: pathname === "/admin/products"
    },
    {
      href: "/admin/orders",
      label: "Encomendas",
      active: pathname === "/admin/orders"
    }
  ]

  return (
    <nav className="p-8 py-4 flex items-center justify-between border-b-4 border-red-700">
      <span className="tracking-widest font-bold text-lg cursor-default">ADMIN</span>
      <div className="space-x-4 lg:space-x-10">
        {routes.map(route => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm font-medium transition-colors hover:bg-red-600 hover:text-white p-2 rounded-md tracking-widest",
              route.active ? "bg-red-600 text-white" : ""
            )}
          >
            {route.label.toUpperCase()}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default AdminNavbar