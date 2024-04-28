import { Button } from "@/components/ui/button"
import Link from "next/link"

const ProductsPage = () => {
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
    </div>
  )
}

export default ProductsPage