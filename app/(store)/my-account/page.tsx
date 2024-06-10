import { currentUser } from "@/lib/auth"
import { MyAccountForm } from "./_components/my-account-form"
import { notFound } from "next/navigation"

const MyAccountPage = async () => {
  const user = await currentUser()

  if (user == null) return notFound()

  return (
    <div className="max-w-screen-md mx-auto py-8 px-4">
      <h1 className="text-center text-4xl font-bold my-8">Minha conta</h1>
      <MyAccountForm user={user} />
    </div>
  )
}

export default MyAccountPage