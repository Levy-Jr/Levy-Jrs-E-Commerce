import { db } from "@/lib/db"
import { ProductForm } from "../../_components/product-form"


const UpdateProduct = async ({
  params: { id }
}: {
  params: { id: string }
}) => {
  const product = await db.product.findUnique({
    where: { id }
  })

  const categories = await db.category.findMany({})

  if (!product) return null

  /* setando o valor do preço de "decimal" para "number" para não causar nenhum erro no NextJS */
  const cleanProduct = {
    ...product,
    price: product.price.toNumber()
  }

  return (
    <>
      <div>
        <h1 className="text-4xl font-bold tracking-wider text-center">EDITAR PRODUTO</h1>
        <ProductForm
          categories={categories}
          initialData={cleanProduct}
        />
      </div>
    </>
  )
}

export default UpdateProduct