import { Prisma } from "@prisma/client"
import { ProductCard } from "./product-card"

type CleanProduct = Omit<Prisma.ProductGetPayload<{
  include: { images: true, category: true }
}>, 'price'> & { price: number }

type ProductListSectionProps = {
  filteredProducts: CleanProduct[]
}

export const ProductListSection = ({ filteredProducts }: ProductListSectionProps) => {
  return (
    <div className="w-full">
      <p className="mb-8 text-[#67676B] font-medium text-2xl">{filteredProducts.length} {filteredProducts.length > 1 ? "produtos encontrados" : "produto encontrado"}</p>
      <ul className="grid place-content-center mx-auto grid-cols-[repeat(auto-fill,minmax(20.875rem,1fr))] gap-3 md:gap-8">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </ul>
    </div>
  )
}