import { Prisma } from "@prisma/client"
import toast from "react-hot-toast"
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

type CartItemType = Prisma.ProductGetPayload<{
  select: {
    id: true,
    images: true,
    name: true,
    price: true
  }
}>

type CartStore = {
  items: CartItemType[];
  addItem: (data: CartItemType) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>((set, get) => ({
    items: [],
    addItem: (data: CartItemType) => {
      const currentItems = get().items;
      const existingItem = currentItems.find(item => item.id === data.id)

      if (existingItem) {
        return toast("Item já está no carrinho.")
      }

      set({ items: [...get().items, data] })
      toast.success("Item adicionado ao carrinho.")
    },
    removeItem: (id: string) => {
      set({ items: [...get().items.filter(item => item.id !== id)] })
      toast.success("Item removido do carrinho.")
    },
    removeAll: () => set({ items: [] })
  }), {
    name: "cart-storage",
    storage: createJSONStorage(() => localStorage)
  })
)

export default useCart