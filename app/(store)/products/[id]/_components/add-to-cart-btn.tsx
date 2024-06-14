"use client"

import useCart from "@/hooks/use-cart";
import { CartItemType } from "@/types/CartType";

type AddToCartButtonProps = {
  children: React.ReactNode;
  data: CartItemType;
}

export const AddToCartButton = ({ children, data }: AddToCartButtonProps) => {
  const cart = useCart()

  const onAddToCart = () => {
    cart.addItem(data)
  }

  return (
    <button
      className="font-bold rounded-full border border-white transition-colors hover:bg-white hover:text-black gap-4 text-xl w-full py-3"
      onClick={onAddToCart}
    >
      {children}
    </button>
  )
}