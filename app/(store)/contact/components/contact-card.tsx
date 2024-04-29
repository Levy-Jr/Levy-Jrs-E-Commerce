"use client"

import Link from "next/link";

type ContactCardProps = {
  title: string;
  desc: string;
  href: string;
}

const ContactCard = ({ title, desc, href }: ContactCardProps) => {
  return (
    <div className="max-w-[30rem] text-center w-full rounded-md overflow-hidden shadow-xl">
      <h2 className="text-lg text-orange-600 py-4 tracking-wider">{title}</h2>
      <p className="py-6 text-lg px-4">{desc}</p>
      <Link
        href={href}
        className="w-full border-t-2 font-bold text-lg inline-block py-4"
      >ACESSAR</Link>
    </div>
  )
}

export default ContactCard