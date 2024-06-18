import { db } from "@/lib/db"
import { ProductForm } from "../../_components/product-form"
import { CreateCategoryForm } from "../../_components/create-category-form"

const CreateProductPage = async () => {
  const categories = await db.category.findMany({})

  return (
    <div>
      <ProductForm
        categories={categories}
      />
      <CreateCategoryForm
        categories={categories}
      />
    </div>
  )
}

export default CreateProductPage