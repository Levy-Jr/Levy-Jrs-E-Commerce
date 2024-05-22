import { Prisma } from "@prisma/client"

export type UserOrder = Prisma.OrderGetPayload<{
  select: {
    id: true,
    orderItems: {
      select: {
        id: true,
        product: {
          select: {
            name: true
          }
        },
        pricePaid: true
      }
    },
    user: true,
    createdAt: true
  },
}>