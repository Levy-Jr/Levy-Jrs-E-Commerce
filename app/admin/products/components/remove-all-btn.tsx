"use client"

import Image from "next/image"
import Lixeira from "/public/e-commerce/produtos/lixeira-branca.svg"
import toast from "react-hot-toast"
import { deleteProducts } from "@/actions/delete-product"
import { AlertModal } from "@/components/modals/alert-modal"
import { useState } from "react"

export const RemoveAllBtn = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const onRemoveAll = async () => {
    try {
      await deleteProducts()
      toast.success("Todos os produtos foram deletados!")
    } catch (error) {
      toast.error("Algo deu errado!")
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onRemoveAll}
        loading={loading}
      />
      <button
        className="flex-1 py-2 rounded-full font-bold text-2xl bg-[#F33C52]"
        onClick={() => setOpen(true)}
      >
        Remover tudo
        <Image className="inline ml-2" src={Lixeira} alt="Ícone de lixeira" />
      </button>
    </>
  )
}