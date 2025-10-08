import React from 'react'
import Image from 'next/image'

interface WarrantySectionProps {
  badgeText?: string
  heading?: string
  description?: string
}

export function WarrantySection({
  badgeText = 'Rail industry Endorsed Warranty',
  heading = 'Parts and services are backed up by a 12 months in service warranty',
  description = 'UCRS is committed to provide the highest possible quality parts and services. All parts that are not consumable or subject to wear and tear is guaranteed for 12 months in or 18 months from the shipment whichever comes first.',
}: WarrantySectionProps) {
  return (
    <section className="bg-background py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-16">
          {/* Section header */}
          <div className="flex flex-col gap-8 items-center text-center">
            <div className="flex flex-col gap-5 items-center max-w-[768px] w-full">
              <div className="flex flex-col gap-3 items-start w-full">
                <p className="text-primary font-semibold text-base leading-6 w-full">
                  {badgeText}
                </p>
                <h2 className="text-foreground font-semibold text-4xl leading-[44px] tracking-tight w-full">
                  {heading}
                </h2>
              </div>
              <p className="text-muted-foreground text-xl leading-[30px] w-full">
                {description}
              </p>
            </div>
          </div>

          {/* Warranty Badge Image */}
          <div className="relative w-full h-[400px] md:h-[720px] rounded-xl overflow-hidden">
            <Image
              src="/warranty-badge.avif"
              alt="12-Month Warranty In-Service Coverage - UCRS Railway Parts Quality Guarantee"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1280px"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
