"use client"

import { deleteOrders } from "@/actions/orders"
import { AlertModal } from "@/components/modals/alert-modal"
import Image from "next/image"
import { useState } from "react"
import toast from "react-hot-toast"
import Lixeira from "/public/e-commerce/encomendas/lixeira-icone.svg"

export const DeleteOrderItems = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const onDelete = async () => {
    try {
      setLoading(true)
      await deleteOrders()
      setOpen(false)
      toast.success("Encomendas deletadas!")
    } catch (error) {
      toast.error("Algo deu errado")
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onDelete()}
        loading={loading}
      />
      <button
        className="mb-4 flex items-center gap-2 text-xl text-[#F33C52]"
        onClick={() => setOpen(true)}
      >
        Remover tudo
        <Image className="" src={Lixeira} alt="Ícone de lixeira" />
      </button>
    </>
  )
}