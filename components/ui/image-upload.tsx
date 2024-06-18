"use client"

import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary"

import { useEffect, useState } from "react"
import { Check, Trash } from "lucide-react";
import LogoEditar from "/public/e-commerce/edicao-de-produto/editar-icone.svg"
import toast from "react-hot-toast";

type ImageUploadProps = {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  onDefault: (value: string) => void;
  value: string[];
}

const ImageUpload = ({ disabled, onChange, onRemove, onDefault, value }: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const onUpload = (result: any) => {
    onChange(result.info.secure_url)
  }

  if (!isMounted) return null

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {value.map((url, index) => (
          <div key={index} className="relative w-[min(12.5rem,100%)] aspect-square rounded-md overflow-hidden">
            <div className="z-10 absolute top-0 right-0">
              <button
                type="button"
                className="bg-red-600 p-2 rounded-sm"
                onClick={() => {
                  onRemove(url)
                  toast.success("Imagem excluída. Clique em cadastrar para atualizar")
                }}>
                <Trash className="h-4 w-4 text-white" />
              </button>
            </div>
            <div className="z-10 absolute top-0 left-0">
              <button
                type="button"
                className="bg-[#209e20] p-2 rounded-sm"
                onClick={() => {
                  onDefault(url)
                  toast.success("Imagem setada para imagem principal. Clique em cadastrar para atualizar")
                }
                }>
                <Check className="h-4 w-4 text-white" />
              </button>
            </div>
            <Image
              fill
              src={url}
              alt="Product Image"
            />
          </div>
        )
        )}
      </div>
      <CldUploadWidget onSuccess={onUpload} uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_PRESET}>
        {({ open }) => {
          const onClick = () => {
            open()
          }

          return (
            <button
              className="w-full dashed-button flex text-white py-3 flex-col items-center"
              type="button"
              disabled={disabled}
              onClick={onClick}
            >
              Adicionar imagem
              <Image src={LogoEditar} alt="Logo do ecommerce" />
            </button>
          )
        }}
      </CldUploadWidget>
    </div>
  )
}

export default ImageUpload