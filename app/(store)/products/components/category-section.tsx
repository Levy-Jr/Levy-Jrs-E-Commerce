"use client"

import Image from "next/image"
import CategoriaIcone from "/public/e-commerce/edicao-de-produto/categoria-icone.svg"
import { Category } from "@prisma/client"
import { useState } from "react"
import { cn } from "@/lib/utils"

type CategorySectionProps = {
  categories: Category[]
}

export const CategorySection = ({ categories }: CategorySectionProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <div>
      <button
        onClick={toggleMenu}
      >
        <h2 className="text-3xl flex gap-4 font-bold mb-8">
          Categorias
          <Image
            className={cn("inline", isOpen ? "rotate-180" : "")}
            src={CategoriaIcone}
            alt=""
          />
        </h2>
      </button>
      <div className={cn("flex flex-col gap-3 text-xl font-medium", isOpen ? "" : "hidden")}>
        {categories.map(category => (
          <button className="text-start inline">{category.name}</button>
        ))}
      </div>
    </div>
  )
}