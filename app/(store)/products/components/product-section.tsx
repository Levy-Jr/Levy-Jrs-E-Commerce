"use client"

import { Prisma } from "@prisma/client"
import { useMemo, useState } from "react"
import Image from "next/image"
import CategoriaIcone from "/public/e-commerce/edicao-de-produto/categoria-icone.svg"
import { Category } from "@prisma/client"
import { cn } from "@/lib/utils"
import { ProductListSection } from "./product-list-section"

type CleanProduct = Omit<Prisma.ProductGetPayload<{
  include: { images: true, category: true }
}>, 'price'> & { price: number }

type ProductSectionProps = {
  products: CleanProduct[]
  categories: Category[]
}

export const ProductSection = ({ products, categories }: ProductSectionProps) => {
  const [isOpen, setIsOpen] = useState(true)
  const toggleMenu = () => setIsOpen(!isOpen)
  const [categoryFilter, setCategoryFilter] = useState("")

  const filteredProducts = useMemo(() => {
    if (products) {
      return products.filter(product => (
        product.category.name.toLowerCase().includes(categoryFilter.toLowerCase())
      ))
    }
  }, [products, categoryFilter])

  if (!filteredProducts) return (
    <div>Nenhum produto encontrado</div>
  )

  return (
    <>
      <div className="mb-4 md:mb-0">
        <button
          onClick={toggleMenu}
        >
          <h2 className="text-3xl flex gap-4 font-bold mb-3 md:mb-8">
            Categorias
            <Image
              className={cn("inline", isOpen ? "rotate-180" : "")}
              src={CategoriaIcone}
              alt="Categoria"
            />
          </h2>
        </button>
        <div className={cn("flex flex-col gap-3 text-xl font-medium", isOpen ? "" : "hidden")}>
          <button
            className={cn("text-start text-[#67676B] inline", categoryFilter === "" ? "text-white" : "")}
            onClick={() => setCategoryFilter("")}
          >Todos os produtos</button>
          {categories.map(category => (
            <button
              key={category.id}
              className={cn("text-start text-[#67676B] inline", categoryFilter === category.name ? "text-white" : "")}
              onClick={() => setCategoryFilter(category.name)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      <ProductListSection
        filteredProducts={filteredProducts}
      />
    </>
  )
}