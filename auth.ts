import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "@/auth.config"
import NextAuth from "next-auth"
import { db } from "./lib/db"
import { UserRole } from "@prisma/client"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error"
  },
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string
      }

      return session
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig
})