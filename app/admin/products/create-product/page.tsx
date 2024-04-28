import { db } from "@/lib/db"
import { CreateProductForm } from "../../_components/create-product-form"

const CreateProductPage = async () => {
  const categories = await db.category.findMany({})

  return (
    <div>
      <CreateProductForm
        categories={categories}
      />
    </div>
  )
}

export default CreateProductPage