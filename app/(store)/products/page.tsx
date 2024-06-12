import { db } from "@/lib/db"
import { ProductCard } from "./components/product-card"
import { Footer } from "@/components/footer"
import { WhatsappButton } from "@/components/ui/whatsapp-button"
import { CategorySection } from "./components/category-section"

const StorePage = async () => {
  const [products, categories] = await Promise.all([
    db.product.findMany({
      where: {
        isArchived: false
      },
      include: {
        images: true,
        category: true
      }
    }),
    db.category.findMany({})
  ])

  return (
    <>
      <main className="py-8 p-6">
        <h1 className="sr-only">Produtos</h1>
        <div className="flex flex-col md:flex-row md:justify-between md:gap-12">
          <CategorySection
            categories={categories}
          />
          <div className="w-full">
            <p className="mb-8 text-[#67676B] font-medium text-2xl">{products.length} {products.length > 1 ? "produtos encontrados" : "produto encontrado"}</p>
            <ul className="grid place-content-center mx-auto content-center grid-cols-[repeat(auto-fill,minmax(20.875rem,1fr))] gap-3 md:gap-8">
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </ul>
          </div>
        </div>
        <WhatsappButton />
      </main>
      <Footer />
    </>
  )
}

export default StorePage