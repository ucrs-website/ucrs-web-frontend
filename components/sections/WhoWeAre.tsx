import React from 'react'
import Image from 'next/image'

interface Card {
  label: string
  title: string
  image: string
}

const cards: Card[] = [
  {
    label: 'Mission',
    title: 'Deliver OEM-quality parts at competitive costs.',
    image: '/images/about/a8febb3a1b498a4a3f08ff809f5f8cac1eeeba2c.png',
  },
  {
    label: 'Vision',
    title: 'Be the global leader in sustainable rail solutions',
    image: '/images/about/bdd5a2601a65a16a87ba6ff17a667534554824d4.png',
  },
  {
    label: 'Values',
    title: 'Quality, Integrity, Innovation',
    image: '/images/about/5eb56ac0ea894d8452d8bf8094a025322a3a9e54.png',
  },
]

export function WhoWeAre() {
  return (
    <section className="w-full py-6 md:py-24 bg-white">
      <div className="container mx-auto px-8 max-w-[1280px]">
        <div className="flex flex-col gap-8 items-center">
          {/* Heading */}
          <div className="flex items-center justify-center p-2.5 overflow-hidden">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#252b42] text-center leading-tight whitespace-nowrap">
              Who We Are
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="flex flex-col lg:flex-row gap-8 w-full">
            {cards.map((card, index) => (
              <div
                key={index}
                className="relative w-full lg:flex-1 h-[480px] overflow-hidden"
              >
                {/* Background Image */}
                <Image
                  src={card.image}
                  alt={card.label}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />

                {/* Bottom Card */}
                <div className="absolute bottom-0 left-0 right-0 pt-24">
                  <div className="backdrop-blur-md bg-white/30 border-t border-white/30 px-6 py-5 pb-8 flex flex-col gap-6 w-full">
                    <div className="flex flex-col gap-3 w-full">
                      <div className="flex flex-col gap-1 w-full">
                        <p className="text-[18px] font-semibold text-[#d2f8be] leading-[28px]">
                          {card.label}
                        </p>
                        <p className="text-[24px] font-normal text-white leading-tight">
                          {card.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
