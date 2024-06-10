import Image from "next/image"
import LoginForm from "../components/login-form"
import Logo from "/public/e-commerce/logo.svg"

const LoginPage = () => {
  return (
    <div className="lg:flex">
      <div className="pt-16 lg:pt-0 lg:static lg:right-0 lg:translate-x-0 lg:w-1/2 lg:top-0 lg:bg-[#1E1E1E] lg:grid lg:place-items-center">
        <Image
          src={Logo}
          alt="Logo"
          className="lg:w-[min(32.188rem,100%)] mx-auto"
        />
      </div>
      <LoginForm />
    </div>
  )
}

export default LoginPage