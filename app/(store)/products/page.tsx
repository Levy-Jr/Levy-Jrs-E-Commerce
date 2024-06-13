import { db } from "@/lib/db"
import { Footer } from "@/components/footer"
import { WhatsappButton } from "@/components/ui/whatsapp-button"
import { ProductSection } from "./components/product-section"

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

  const cleanProducts = products.map(product => ({
    ...product,
    price: product.price.toNumber()
  }))

  return (
    <>
      <main className="py-8 p-6">
        <h1 className="sr-only">Produtos</h1>
        <div className="flex flex-col md:flex-row md:justify-between md:gap-12">
          <ProductSection
            products={cleanProducts}
            categories={categories}
          />
        </div>
        <WhatsappButton />
      </main>
      <Footer />
    </>
  )
}

export default StorePage