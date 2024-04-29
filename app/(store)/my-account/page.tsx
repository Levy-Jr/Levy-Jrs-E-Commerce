import { currentUser } from "@/lib/auth"
import { LogoutButton } from "./components/logout-button"

const MyAccountPage = async () => {
  const user = await currentUser()

  return (
    <div>
      <span>Usuário: {user?.fullName}</span>
      <br />
      <LogoutButton>Sair</LogoutButton>
    </div>
  )
}

export default MyAccountPage