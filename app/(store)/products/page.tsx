import { db } from "@/lib/db"
import { ProductCard } from "./components/product-card"
import { Footer } from "@/components/footer"

const StorePage = async () => {
  const products = await db.product.findMany({
    where: {
      isArchived: false
    },
    include: {
      images: true,
      category: true
    }
  })

  return (
    <>
      <main className="py-8 p-6 grid place-content-center mx-auto content-center grid-cols-[repeat(auto-fill,minmax(15.625rem,1fr))] gap-3 md:gap-8 max-w-[60rem]">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </main>
      <Footer />
    </>
  )
}

export default StorePage