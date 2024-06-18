import { db } from "@/lib/db"
import Link from "next/link"
import ProductTable from "./components/product-table"
import Image from "next/image"
import Bolsa from "/public/e-commerce/produtos/bolsa-icone.svg"
import { RemoveAllBtn } from "./components/remove-all-btn"

const ProductsPage = async () => {
  const products = await db.product.findMany({
    include: {
      images: true
    }
  })

  const cleanProducts = products.map(product => ({
    ...product,
    price: product.price.toNumber()
  }))

  return (
    <div className="w-[min(56.25rem,100%)] mx-auto px-4 pb-10 md:px-0">
      <h1 className="text-center font-bold text-4xl mb-12">Produtos</h1>
      <ProductTable products={cleanProducts} />
      <div className="mt-16 flex gap-6 text-center">
        <Link
          className="flex-1 py-2 rounded-full font-bold text-2xl bg-white text-black"
          href="/admin/products/create-product">
          Cadastrar produto
          <Image className="inline ml-2" src={Bolsa} alt="Ícone de bolsa" />
        </Link>
        <RemoveAllBtn />
      </div>
    </div>
  )
}

export default ProductsPage