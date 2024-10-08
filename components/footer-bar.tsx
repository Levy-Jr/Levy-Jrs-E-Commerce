"use client"

import Image from "next/image"
import Trofeu from "/public/e-commerce/inicio/trofeu-icone.svg"
import AltaQualidade from "/public/e-commerce/inicio/alta-qualidade-icon.svg"
import useEmblaCarousel from "embla-carousel-react"
import Autoscroll from "embla-carousel-auto-scroll"

export const FooterBar = () => {
  const [emblaRef] = useEmblaCarousel({
    loop: true,
    watchDrag: false
  }, [Autoscroll()])

  return (
    <div className="bg-gradient-to-r from-[#FF7A00] to-[#FFC900] px-8 py-4 overflow-hidden" ref={emblaRef}>
      <div className="flex w-max font-black text-xl">
        <ul className="flex md:w-full flex-[0_0_100%] justify-between">
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
        <ul className="flex md:w-full mx-[22.5%] flex-[0_0_100%] justify-between">
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
          <li className="flex items-center gap-2">
            <Image
              src={Trofeu}
              alt="troféu"
            />
            MELHOR DO MERCADO
          </li>
        </ul>
      </div>
    </div>
  )
}