import { Prisma, UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  fullName: string;
  phoneNumber: string;
  role: UserRole;
  cpf: string;
  orders: Prisma.OrderGetPayload<{
    select: {
      id: true,
      pricePaid: true,
      product: {
        select: {
          name: true
        }
      },
      user: true,
      createdAt: true
    },
  }>[]
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}