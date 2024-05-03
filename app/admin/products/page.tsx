import { Button } from "@/components/ui/button"
import { db } from "@/lib/db"
import Link from "next/link"
import ProductList from "./components/product-list"

const ProductsPage = async () => {
  const products = await db.product.findMany({})

  const cleanProducts = products.map(product => ({
    ...product,
    price: product.price.toNumber()
  }))

  return (
    <div className="p-8">
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/admin/products/create-product">Cadastrar produto</Link>
        </Button>
        <Button asChild>
          <Link href="/admin/products/create-category">Cadastrar categoria</Link>
        </Button>
      </div>
      {products &&
        <ul className="flex gap-8">
          <ProductList products={cleanProducts} />
        </ul>
      }
    </div>
  )
}

export default ProductsPage