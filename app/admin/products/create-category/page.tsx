import { db } from "@/lib/db"
import { CreateCategoryForm } from "../../_components/create-category-form"
import { CategoryCard } from "../components/category-card"

const CreateCategoryPage = async () => {
  const categories = await db.category.findMany({})

  return (
    <div>
      <CreateCategoryForm />
      {categories && categories.length > 0 &&
        <div className="mt-4">
          <h2 className="text-2xl font-bold text-center">Categorias cadastradas: </h2>
          <ul className="flex justify-center mt-2 gap-4">
            {categories.map(category => (
              <CategoryCard
                key={category.id}
                category={category}
              />
            ))}
          </ul>
        </div>
      }
    </div>
  )
}

export default CreateCategoryPage