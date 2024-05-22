import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "@/auth.config"
import NextAuth from "next-auth"
import { db } from "./lib/db"
import { UserRole } from "@prisma/client"
import { getOrderByUserId, getUserById } from "@/data/user"
import { UserOrder } from "./types/OrderType"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  pages: {
    signIn: "/auth",
    error: "/auth/error"
  },
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.fullName = token.fullName as string;
        session.user.phoneNumber = token.phoneNumber as string;
        session.user.role = token.role as UserRole;
        session.user.cpf = token.cpf as string;
        session.user.orders = token.orders as UserOrder[]
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string
      }

      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token;

      token.fullName = existingUser.fullName
      token.email = existingUser.email
      token.phoneNumber = existingUser.phoneNumber
      token.role = existingUser.role
      token.cpf = existingUser.cpf

      const existingUserOrders = await getOrderByUserId(existingUser.id)
      if (!existingUserOrders) return token

      token.orders = existingUserOrders

      return token
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig
})