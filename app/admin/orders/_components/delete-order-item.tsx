"use client"

import { deleteOrder } from "@/actions/orders"
import { AlertModal } from "@/components/modals/alert-modal"
import Image from "next/image"
import { useState } from "react"
import toast from "react-hot-toast"
import Lixeira from "/public/e-commerce/encomendas/lixeira-icone.svg"

export const DeleteOrderItem = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const onDelete = async (id: string) => {
    try {
      setLoading(true)
      await deleteOrder(id)
      setOpen(false)
      toast.success("Encomenda deletada")
    } catch (error) {
      toast.error("Algo deu errado")
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onDelete(id)}
        loading={loading}
      />
      <button
        onClick={() => setOpen(true)}
      >
        <Image className="w-full" src={Lixeira} alt="Ícone de lixeira" />
      </button>
    </>
  )
}