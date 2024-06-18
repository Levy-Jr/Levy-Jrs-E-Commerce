import { Category } from "@prisma/client"
import Image from "next/image"
import X from "/public/e-commerce/edicao-de-produto/x-icone-branco.svg"
import { deleteCategory } from "@/actions/delete-category"
import toast from "react-hot-toast"

type CategoryCardProps = {
  category: Category
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
  const onDelete = async (id: string) => {
    try {
      await deleteCategory(id)
      toast.success("Categoria deletada!")
    } catch (error) {
      toast.error("Certifique-se de remover todos produtos com essa categoria")
    }
  }

  return (
    <li className="bg-black text-white font-bold py-1 px-2 rounded-md">
      <button
        type="button"
        className="flex items-center gap-2"
        onClick={() => onDelete(category.id)}
      >
        {category.name}
        <Image
          src={X}
          alt="Ícone de excluir"
        />
      </button>
    </li>
  )
}