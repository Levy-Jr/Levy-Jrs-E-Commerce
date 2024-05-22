import { Prisma, UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";
import { UserOrder } from "./types/OrderType";

export type ExtendedUser = DefaultSession["user"] & {
  fullName: string;
  phoneNumber: string;
  role: UserRole;
  cpf: string;
  orders: UserOrder[]
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}