'use client'

import React from 'react'
import { Factory, Gauge, Shield } from 'lucide-react'

export function FactoryTourFeatures() {
  const features = [
    {
      icon: Factory,
      title: 'Building a Sustainable Facility',
      description:
        'We build a sustainable facility that balances environmental responsibility with cutting-edge production capabilities.',
    },
    {
      icon: Gauge,
      title: 'ERP-Fully Harmony Output',
      description:
        'Our integrated ERP system ensures seamless coordination across all manufacturing processes for maximum efficiency.',
    },
    {
      icon: Shield,
      title: 'World-Class Safety Standards',
      description:
        'Industry-leading safety protocols and certified training programs protect our team and ensure quality at every step.',
    },
  ]

  return (
    <section className="bg-[#f9fafb] py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="max-w-[1280px] mx-auto">
          {/* Header */}
          <div className="mb-12 lg:mb-16">
            <div className="max-w-[768px] mx-auto text-center space-y-3 lg:space-y-4">
              <p className="text-sm lg:text-base font-semibold text-[#e4342d] uppercase tracking-wide">
                How We Build Reliability
              </p>
              <h2 className="text-3xl lg:text-[44px] font-semibold text-[#181d27] lg:leading-[52.8px] tracking-tight">
                Built on Trust, Powered by Excellence
              </h2>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-start gap-4 lg:gap-5">
                {/* Icon */}
                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-[#e4342d]/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 lg:w-7 lg:h-7 text-[#e4342d]" strokeWidth={2} />
                </div>

                {/* Text */}
                <div className="space-y-2">
                  <h3 className="text-lg lg:text-xl font-semibold text-[#181d27] leading-[30px]">
                    {feature.title}
                  </h3>
                  <p className="text-base text-[#535862] leading-6">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
