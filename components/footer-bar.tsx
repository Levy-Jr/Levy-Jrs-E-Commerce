import Image from "next/image"
import Trofeu from "/public/e-commerce/inicio/trofeu-icone.svg"
import AltaQualidade from "/public/e-commerce/inicio/alta-qualidade-icon.svg"

export const FooterBar = () => {
  return (
    <div className="bg-gradient-to-r from-[#FF7A00] to-[#FFC900] p-8 py-4 overflow-hidden">
      <ul className="relative flex w-max md:w-full gap-8 font-black text-xl justify-between">
        <li className="flex items-center gap-2">
          <Image
            src={AltaQualidade}
            alt="Alta qualidade"
          />
          ALTA QUALIDADE
        </li>
        <li className="flex items-center gap-2">
          <Image
            src={Trofeu}
            alt="troféu"
          />
          MELHOR DO MERCADO
        </li>
        <li className="flex items-center gap-2">
          <Image
            src={AltaQualidade}
            alt="Alta qualidade"
          />
          ALTA QUALIDADE
        </li>
      </ul>
    </div>
  )
}