import { db } from "@/lib/db"
import { ProductForm } from "../../_components/product-form"


const UpdateProduct = async ({
  params: { id }
}: {
  params: { id: string }
}) => {
  const product = await db.product.findUnique({
    where: { id },
    include: {
      images: true
    }
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
        <ProductForm
          categories={categories}
          initialData={cleanProduct}
        />
      </div>
    </>
  )
}

export default UpdateProduct