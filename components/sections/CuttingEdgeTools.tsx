'use client'

import React from 'react'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function CuttingEdgeTools() {
  const features = [
    '3D technology for safety concrete designs',
    'Precision CNC Machining',
    'Expert staff for perfect fit and save cost',
  ]

  return (
    <section className="bg-[#f9fafb] py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-8 lg:space-y-12 order-2 lg:order-1">
              {/* Header */}
              <div className="space-y-4 lg:space-y-6">
                <p className="text-sm lg:text-base font-semibold text-[#e4342d] uppercase tracking-wide">
                  Cutting Edge Tools
                </p>
                <h2 className="text-3xl lg:text-[48px] font-semibold text-[#181d27] lg:leading-[60px] tracking-tight">
                  Cutting-Edge Tools for Excellence
                </h2>
              </div>

              {/* Feature List */}
              <div className="space-y-4 lg:space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#dcfae6] flex items-center justify-center">
                      <Check className="w-5 h-5 lg:w-6 lg:h-6 text-[#079455]" strokeWidth={2.5} />
                    </div>
                    <p className="text-base lg:text-[20px] text-[#535862] lg:leading-[30px] pt-1 lg:pt-2">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div>
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto h-10 lg:h-[60px] px-5 lg:px-6 rounded-lg bg-[#e4342d] hover:bg-[#bb2f27] text-white text-sm lg:text-base font-semibold shadow-sm"
                >
                  <Link href="/contact">Learn more</Link>
                </Button>
              </div>
            </div>

            {/* Right Column - Video Player */}
            <div className="order-1 lg:order-2">
              <div className="relative w-full h-[270px] lg:h-[450px] rounded-2xl overflow-hidden bg-gray-200">
                {/* Placeholder with gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-200 via-yellow-100 to-green-200" />

                {/* Play Button */}
                <button
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 lg:w-20 lg:h-20 rounded-full backdrop-blur-sm bg-white/80 border-2 border-white/90 flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                  aria-label="Play video"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-1"
                  >
                    <path
                      d="M8 6L18 12L8 18V6Z"
                      fill="#181d27"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
