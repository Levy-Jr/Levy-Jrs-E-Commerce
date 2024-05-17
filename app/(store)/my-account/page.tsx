import { currentUser } from "@/lib/auth"
import { MyAccountForm } from "./components/my-account-form"

const MyAccountPage = async () => {
  const user = await currentUser()

  console.log(user?.email)

  return (
    <div className="p-8">
      <h1 className="text-center text-3xl uppercase tracking-wide font-bold my-8">Minha Conta</h1>
      <MyAccountForm user={user} />
    </div>
  )
}

export default MyAccountPage