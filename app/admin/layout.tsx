import { currentRole } from "@/lib/auth"
import { UserRole } from "@prisma/client"
import { redirect } from "next/navigation"
import AdminNavbar from "./_components/admin-navbar"

export default async function AdminLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const role = await currentRole()

  if (role !== UserRole.ADMIN) redirect("/")

  return (
    <>
      <AdminNavbar />
      {children}
    </>
  )

}