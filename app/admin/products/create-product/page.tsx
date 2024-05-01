import { db } from "@/lib/db"
import { ProductForm } from "../../_components/product-form"

const CreateProductPage = async () => {
  const categories = await db.category.findMany({})

  return (
    <div>
      <ProductForm
        categories={categories}
      />
    </div>
  )
}

export default CreateProductPage