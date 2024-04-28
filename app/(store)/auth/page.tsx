import LoginForm from "@/app/(store)/auth/components/login-form"
import RegisterForm from "@/app/(store)/auth/components/register-form"

const Auth = () => {
  return (
    <div className="pt-8 p-6">
      <h1 className="text-4xl text-center py-6 pb-12">ACESSE SUA CONTA</h1>
      <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-12">
        <LoginForm />
        <RegisterForm />
      </div>
    </div>
  )
}

export default Auth