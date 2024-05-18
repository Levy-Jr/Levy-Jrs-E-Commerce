"use client"

import { deleteOrder } from "@/actions/orders"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { useTransition } from "react"

export const DeleteDropDownItem = ({ id }: { id: string }) => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() => startTransition(async () => {
        await deleteOrder(id)
        router.refresh()
      })}
    >
      Deletar
    </DropdownMenuItem>
  )
}