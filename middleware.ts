import NextAuth from "next-auth"

import { auth } from "@/auth"
import { adminPrefix } from "@/routes"

export default auth(req => {
  const { nextUrl } = req

  const isAdminRoute = nextUrl.pathname.startsWith(adminPrefix)

  if (!isAdminRoute) return

  if (isAdminRoute) {

  }
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", '/', "/(api|trpc)(.*)"]
}