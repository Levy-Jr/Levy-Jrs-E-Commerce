import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import Link from "next/link";
import { ProductCard } from "./products/components/product-card";

const Home = async () => {
  const featuredProducts = await db.product.findMany({
    where: {
      isFeatured: true,
      isArchived: false
    },
    include: {
      category: true,
      images: true
    },
    take: 2
  })

  return (
    <main className="mt-6">
      <h1 className="text-center text-4xl tracking-wide font-semibold">E-COMMERCE DE <span className="text-red-600 font-bold">PERIFÉRICOS</span></h1>
      <div className="grid grid-cols-2 mx-auto gap-4 my-8 max-w-[40rem]">
        {featuredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="flex justify-center">
        <Button
          className="bg-red-600 hover:bg-red-700 max-w-48 py-6 w-full font-bold tracking-widest"
          asChild
        >
          <Link href="/products">VER MAIS</Link>
        </Button>
      </div>
    </main>
  );
}

export default Home