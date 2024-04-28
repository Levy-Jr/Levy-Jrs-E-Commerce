import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  fullName: string;
  phoneNumber: string;
  role: UserRole;
  cpf: string;
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}