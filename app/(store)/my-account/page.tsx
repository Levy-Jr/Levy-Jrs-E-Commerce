import { currentUser } from "@/lib/auth"
import { MyAccountForm } from "./_components/my-account-form"
import { OrderInformation } from "./_components/my-order-information"
import { notFound } from "next/navigation"

const MyAccountPage = async () => {
  const user = await currentUser()

  if (user == null) return notFound()

  return (
    <div className="max-w-screen-md mx-auto py-8 px-4">
      <h1 className="text-center text-3xl uppercase tracking-wide font-bold my-8">Meus Pedidos</h1>
      <OrderInformation orders={user.orders} />
      <h1 className="text-center text-3xl uppercase tracking-wide font-bold my-8">Dados de cadastro</h1>
      <MyAccountForm user={user} />
    </div>
  )
}

export default MyAccountPage