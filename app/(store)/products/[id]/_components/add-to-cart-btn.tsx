"use client"

import { Button } from "@/components/ui/button"
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
    <Button
      className="bg-[#FF0000] hover:bg-red-600 font-semibold gap-4 text-lg w-full py-6"
      onClick={onAddToCart}
    >
      {children}
    </Button>
  )
}