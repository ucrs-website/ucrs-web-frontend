'use client'

import React from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProcessStep {
  id: string
  number: number
  title: string
  titleMobile?: string
}

interface ServiceFeature {
  id: string
  label: string
  labelMobile?: string
}

const processSteps: ProcessStep[] = [
  {
    id: 'scanning',
    number: 1,
    title: '3D Scanning & CAD Modeling',
  },
  {
    id: 'analysis',
    number: 2,
    title: 'Material Analysis & Prototyping',
  },
  {
    id: 'compliant',
    number: 3,
    title: 'OEM-Compliant',
    titleMobile: 'AAR-Compliant Production',
  },
]

const serviceFeatures: ServiceFeature[] = [
  {
    id: 'preventative',
    label: 'Preventative Maintenance Plan',
    labelMobile: 'Emergency Support Plans',
  },
  {
    id: 'cost',
    label: 'Cost-Benefit Analysis',
  },
  {
    id: 'custom',
    label: 'Custom Maintenance Schedules',
  },
]

interface BreathingNewLifeProps {
  headingLine1?: string
  headingLine2?: string
  className?: string
}

export function BreathingNewLife({
  headingLine1 = 'Breathing New Life',
  headingLine2 = 'into Legacy Parts',
  className,
}: BreathingNewLifeProps) {
  return (
    <section className={cn('bg-white py-16 lg:py-24', className)}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-[1280px] mx-auto">
          {/* Heading */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl lg:text-4xl font-semibold text-[#1570EF] leading-tight tracking-tight">
              {headingLine1}
              <br />
              {headingLine2}
            </h2>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:block">
            {/* Process Steps - Horizontal */}
            <div className="flex items-start justify-center gap-20 mb-16">
              {processSteps.map((step) => (
                <div key={step.id} className="flex flex-col items-center max-w-[220px]">
                  {/* Numbered Circle */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#535862] mb-6">
                    <span className="text-lg font-bold text-white">{step.number}</span>
                  </div>
                  {/* Step Title */}
                  <p className="text-base font-semibold text-[#181D27] text-center leading-tight">
                    {step.title}
                  </p>
                </div>
              ))}
            </div>

            {/* Service Features - Horizontal */}
            <div className="flex items-center justify-center gap-16">
              {serviceFeatures.map((feature) => (
                <div key={feature.id} className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-5 h-5 rounded bg-[#17B26A]">
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-sm font-medium text-[#181D27]">{feature.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden">
            {/* Process Steps - Vertical Stack */}
            <div className="flex flex-col items-center gap-8 mb-12">
              {processSteps.map((step) => (
                <div key={step.id} className="flex flex-col items-center max-w-[280px]">
                  {/* Numbered Circle */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#535862] mb-4">
                    <span className="text-lg font-bold text-white">{step.number}</span>
                  </div>
                  {/* Step Title */}
                  <p className="text-base font-semibold text-[#181D27] text-center leading-tight">
                    {step.titleMobile || step.title}
                  </p>
                </div>
              ))}
            </div>

            {/* Service Features - Vertical Stack */}
            <div className="flex flex-col items-start gap-4 max-w-[328px] mx-auto">
              {serviceFeatures.map((feature, index) => (
                <div key={feature.id} className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-5 h-5 rounded bg-[#17B26A] flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-sm font-medium text-[#181D27]">
                    {index === 0 && feature.labelMobile ? feature.labelMobile : feature.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
