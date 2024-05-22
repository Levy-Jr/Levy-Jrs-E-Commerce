import { Prisma } from "@prisma/client"

export type CartItemType = Prisma.ProductGetPayload<{
  select: {
    id: true,
    images: true,
    name: true,
    price: true
  }
}>