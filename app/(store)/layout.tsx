import Navbar from "@/components/navbar"

export default async function StoreLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <>
      <Navbar />
      {children}
    </>
  )

}