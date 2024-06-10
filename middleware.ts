import { auth } from "@/auth"
import { adminPrefix, authRoutes } from "@/routes"

export default auth(req => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isAdminRoute = nextUrl.pathname.startsWith(adminPrefix)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL("/my-account", nextUrl))
    }
    return;
  }

  if (nextUrl.pathname === "/my-account") {
    if (!isLoggedIn) return Response.redirect(new URL("/login", nextUrl))
  }

  if (!isAdminRoute) return
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", '/', "/(api|trpc)(.*)"]
}