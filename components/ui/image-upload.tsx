"use client"

import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary"

import { useEffect, useState } from "react"
import { Button } from "./button";
import { Check, ImagePlus, Trash } from "lucide-react";
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
          <div key={index} className="relative w-[12.5rem] h-[12.5rem] rounded-md overflow-hidden">
            <div className="z-10 absolute top-2 right-2">
              <Button type="button" onClick={() => {
                onRemove(url)
                toast.success("Imagem excluída. Clique em cadastrar para atualizar")
              }} variant="destructive" size="icon">
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <div className="z-10 absolute top-2 left-2">
              <Button type="button" onClick={
                () => {
                  onDefault(url)
                  toast.success("Imagem setada para imagem principal. Clique em cadastrar para atualizar")
                }
              } className="bg-green-500 hover:bg-green-600" size="icon">
                <Check className="h-4 w-4" />
              </Button>
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
      <CldUploadWidget onSuccess={onUpload} uploadPreset="w37qobsu">
        {({ open }) => {
          const onClick = () => {
            open()
          }

          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Upload an Image
            </Button>
          )
        }}
      </CldUploadWidget>
    </div>
  )
}

export default ImageUpload