"use client"

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const AlertModal = ({
  isOpen,
  onClose,
  onConfirm,
  loading
}: AlertModalProps) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <Modal
      title="Você tem certeza?"
      description="Essa ação não pode ser refeita."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <button disabled={loading} className="py-2 px-4 bg-black text-white rounded-full" onClick={onClose} >
          Cancelar
        </button>
        <button disabled={loading} className="bg-red-500 hover:bg-red-600 transition-colors text-white py-2 px-4 rounded-full" onClick={onConfirm} >
          Continuar
        </button>
      </div>
    </Modal>
  )
}