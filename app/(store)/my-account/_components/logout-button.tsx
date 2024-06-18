"use client"

import { logout } from "@/actions/logout"

type LogoutButtonProps = {
  children?: React.ReactNode;
}

export const LogoutButton = ({
  children
}: LogoutButtonProps) => {
  const onClick = () => {
    logout()
  }

  return (
    <button
      onClick={onClick}
      className="cursor-pointer bg-[#F33C52] hover:bg-[#ac3241] gap-4 text-2xl rounded-full p-6"
    >
      {children}
    </button>
  )
}