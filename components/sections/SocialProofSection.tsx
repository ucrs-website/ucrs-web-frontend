import React from 'react'
import Image from 'next/image'

interface Company {
  name: string
  logo: string
}

interface SocialProofSectionProps {
  heading?: string
  companies?: Company[]
}

const defaultCompanies: Company[] = [
  { name: 'Company 1', logo: '/images/companies/company1.svg' },
  { name: 'Company 2', logo: '/images/companies/company2.svg' },
  { name: 'Company 3', logo: '/images/companies/company3.svg' },
  { name: 'Company 4', logo: '/images/companies/company4.svg' },
  { name: 'Company 5', logo: '/images/companies/company5.svg' },
  { name: 'Company 6', logo: '/images/companies/company6.svg' },
]

export function SocialProofSection({
  heading = 'Join 4,000+ companies already growing',
  companies = defaultCompanies,
}: SocialProofSectionProps) {
  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-[1200px] mx-auto">
          {/* Heading */}
          <p className="text-center text-base font-medium text-muted-foreground mb-8">
            {heading}
          </p>

          {/* Company logos grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {companies.map((company, index) => (
              <div
                key={index}
                className="relative w-full h-12 grayscale hover:grayscale-0 transition-all opacity-50 hover:opacity-100"
              >
                <Image
                  src={company.logo}
                  alt={company.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
