'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, Settings, ClipboardList, Package, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ProcessStep {
  id: string
  icon: React.ReactNode
  label: string
  labelMobile?: string
}

const processSteps: ProcessStep[] = [
  {
    id: 'diagnostic',
    icon: <Search className="h-12 w-12 lg:h-12 lg:w-12 text-[#535862]" strokeWidth={1.5} />,
    label: 'Diagnostic Inspection',
  },
  {
    id: 'restoration',
    icon: <Settings className="h-12 w-12 lg:h-12 lg:w-12 text-[#535862]" strokeWidth={1.5} />,
    label: 'Full-Scope Restoration',
    labelMobile: 'OEM-Compliant Repair',
  },
  {
    id: 'testing',
    icon: <ClipboardList className="h-12 w-12 lg:h-12 lg:w-12 text-[#535862]" strokeWidth={1.5} />,
    label: 'OEM Compliant Testing',
    labelMobile: 'Quality Assurance Testing',
  },
  {
    id: 'shipping',
    icon: <Package className="h-12 w-12 lg:h-12 lg:w-12 text-[#535862]" strokeWidth={1.5} />,
    label: 'Return Shipping',
  },
]

interface ComprehensiveRepairsProps {
  headingDesktop?: string
  headingMobile?: string
  warrantyTextDesktop?: string
  warrantyTextMobile?: string
  ctaText?: string
  ctaHref?: string
  productImage?: string
}

export function ComprehensiveRepairs({
  headingDesktop = 'Comprehensive Repairs, Guaranteed Performance',
  headingMobile = 'Precision Repairs, Guaranteed Performance',
  warrantyTextDesktop = 'All repairs backed by a 12-month warranty.',
  warrantyTextMobile = 'All repairs backed by a 2-year warranty.',
  ctaText = 'Request For Service',
  ctaHref = '#',
  productImage = '/images/services/motor-repair-comparison.png',
}: ComprehensiveRepairsProps) {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-[1280px] mx-auto">
          {/* Mobile Layout */}
          <div className="lg:hidden space-y-8">
            {/* Heading */}
            <div className="text-center space-y-3">
              <h2 className="text-2xl font-semibold text-[#181D27] leading-tight tracking-tight">
                {headingMobile}
              </h2>

              {/* Warranty Badge */}
              <div className="inline-flex items-center gap-2 text-sm text-[#1570EF]">
                <Award className="h-4 w-4" strokeWidth={2} />
                <span className="font-medium">{warrantyTextMobile}</span>
              </div>
            </div>

            {/* Process Steps Grid (2x2) */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-8">
              {processSteps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10">
                    {index === 0 && (
                      <Search className="h-10 w-10 text-[#535862]" strokeWidth={1.5} />
                    )}
                    {index === 1 && (
                      <Settings className="h-10 w-10 text-[#535862]" strokeWidth={1.5} />
                    )}
                    {index === 2 && (
                      <ClipboardList className="h-10 w-10 text-[#535862]" strokeWidth={1.5} />
                    )}
                    {index === 3 && (
                      <Package className="h-10 w-10 text-[#535862]" strokeWidth={1.5} />
                    )}
                  </div>
                  <p className="text-sm font-semibold text-[#181D27] text-center">
                    {step.labelMobile || step.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Product Image */}
            <div className="relative w-full aspect-square max-w-[360px] mx-auto rounded-xl overflow-hidden bg-[#F3F4F6] shadow-sm">
              <Image
                src={productImage}
                alt="Before and after comparison of locomotive motor repair - showing damaged motor on left and restored motor on right"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 360px"
              />
              {/* Red vertical divider */}
              <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-[#E4342D] transform -translate-x-1/2" />
            </div>

            {/* CTA Button */}
            <div className="flex justify-center">
              <Button
                asChild
                size="lg"
                className="h-10 px-3.5 text-sm font-semibold rounded-lg w-full max-w-[328px]"
              >
                <Link href={ctaHref}>{ctaText}</Link>
              </Button>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:flex lg:flex-col lg:items-center lg:space-y-12">
            {/* Heading with Warranty Badge */}
            <div className="text-center space-y-3">
              <h2 className="text-4xl font-semibold text-[#181D27] leading-tight tracking-[-0.02em]">
                {headingDesktop}
              </h2>

              {/* Warranty Badge */}
              <div className="inline-flex items-center gap-2 text-base text-[#1570EF]">
                <Award className="h-5 w-5" strokeWidth={2} />
                <span className="font-medium">{warrantyTextDesktop}</span>
              </div>
            </div>

            {/* Process Steps Row */}
            <div className="flex items-start justify-center gap-16">
              {processSteps.map((step) => (
                <div key={step.id} className="flex flex-col items-center gap-4 max-w-[160px]">
                  <div className="flex items-center justify-center w-12 h-12">
                    {step.icon}
                  </div>
                  <p className="text-base font-semibold text-[#181D27] text-center leading-tight">
                    {step.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Product Image */}
            <div className="relative w-full max-w-[750px] aspect-[3/2] rounded-2xl overflow-hidden bg-[#F3F4F6] shadow-md">
              <Image
                src={productImage}
                alt="Before and after comparison of locomotive motor repair - showing damaged motor on left and restored motor on right"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 750px, 100vw"
              />
              {/* Red vertical divider */}
              <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-[#E4342D] transform -translate-x-1/2" />
            </div>

            {/* CTA Button */}
            <Button
              asChild
              size="lg"
              className="h-[52px] px-[18px] text-base font-semibold rounded-lg"
            >
              <Link href={ctaHref}>{ctaText}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
