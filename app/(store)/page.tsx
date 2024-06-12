import { db } from "@/lib/db";
import Image from "next/image";
import Banner from "/public/e-commerce/inicio/banner.webp"
import { WhatsappButton } from "@/components/ui/whatsapp-button";
import { FeaturedProductCard } from "./_components/featured-product-card";
import { Footer } from "@/components/footer";

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
    take: 3
  })

  return (
    <>
      <main>
        <Image
          src={Banner}
          alt="Banner da loja"
          className="w-full"
        />
        <div className="p-8">
          <h1 className="text-5xl font-bold">Destaques</h1>
          <WhatsappButton />
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-content-between my-10">
            {featuredProducts.map(product => (
              <FeaturedProductCard
                key={product.id}
                product={product}
              />
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Home