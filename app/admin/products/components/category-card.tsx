import { Category } from "@prisma/client"

type CategoryCardProps = {
  category: Category
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <li className="bg-red-600 text-white font-bold py-1 px-2 rounded-md">
      {category.name}
    </li>
  )
}