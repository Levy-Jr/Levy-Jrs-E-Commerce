import LoginForm from "@/app/(store)/auth/components/login-form"
import RegisterForm from "@/app/(store)/auth/components/register-form"

const Auth = () => {
  return (
    <div className="pt-8">
      <h1 className="text-4xl text-center py-6 pb-12">ACESSE SUA CONTA</h1>
      <div className="flex justify-center items-start gap-12">
        <LoginForm />
        <RegisterForm />
      </div>
    </div>
  )
}

export default Auth