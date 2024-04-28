import { currentUser } from "@/lib/auth"

const MyAccountPage = async () => {
  const user = await currentUser()
  console.log(user)

  return (
    <div>
    </div>
  )
}

export default MyAccountPage