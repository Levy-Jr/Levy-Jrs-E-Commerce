import { db } from "@/lib/db"

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } })

    return user
  } catch (error) {
    return null
  }
}

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id
      }
    })

    return user
  } catch (error) {
    return null
  }
}

export const getOrderByUserId = async (userId: string) => {
  try {
    const order = await db.order.findMany({
      where: {
        userId
      },
      select: {
        id: true,
        pricePaid: true,
        product: {
          select: {
            name: true
          }
        },
        user: true
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    return order
  } catch (error) {
    return null
  }
}