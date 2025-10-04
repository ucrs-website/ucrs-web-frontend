'use client'

import React from 'react'
import Image from 'next/image'
import { Marquee } from '@/components/ui/marquee'

interface Company {
  name: string
  logoMark: string
  logoText: string
}

interface SocialProofSectionProps {
  heading?: string
  companies?: Company[]
}

const defaultCompanies: Company[] = [
  {
    name: 'OdeaoLabs',
    logoMark: '',
    logoText: '/images/companies/odeaolabs-text.svg',
  },
  {
    name: 'Kintsugi',
    logoMark: '/images/companies/kintsugi-mark.svg',
    logoText: '/images/companies/kintsugi-text.svg',
  },
  {
    name: 'StackedLab',
    logoMark: '/images/companies/stackedlab-mark.svg',
    logoText: '/images/companies/stackedlab-text.svg',
  },
  {
    name: 'Magnolia',
    logoMark: '/images/companies/magnolia-mark.svg',
    logoText: '/images/companies/magnolia-text.svg',
  },
  {
    name: 'Warpspeed',
    logoMark: '/images/companies/warpspeed-mark.svg',
    logoText: '/images/companies/warpspeed-text.svg',
  },
  {
    name: 'Sisyphus',
    logoMark: '/images/companies/sisyphus-mark.svg',
    logoText: '/images/companies/sisyphus-text.svg',
  },
]

export function SocialProofSection({
  heading = 'Over +300 happy customers',
  companies = defaultCompanies,
}: SocialProofSectionProps) {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-8">
        <div className="max-w-[1280px] mx-auto space-y-8">
          {/* Heading */}
          <p className="text-center text-base font-medium text-[#535862] leading-6">
            {heading}
          </p>

          {/* Company logos marquee */}
          <Marquee speed={40} pauseOnHover={true} className="py-4">
            {companies.map((company, index) => (
              <div
                key={index}
                className="flex items-center gap-2 mx-6 h-12"
              >
                {company.logoMark && (
                  <div className="relative h-12 w-10 flex-shrink-0">
                    <Image
                      src={company.logoMark}
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                <div className="relative h-12 flex-shrink-0" style={{ width: company.name === 'OdeaoLabs' ? '140px' : company.name === 'Kintsugi' ? '99px' : company.name === 'StackedLab' ? '149px' : company.name === 'Magnolia' ? '125px' : company.name === 'Warpspeed' ? '143px' : '115px' }}>
                  <Image
                    src={company.logoText}
                    alt={company.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  )
}
