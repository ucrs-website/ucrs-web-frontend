'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function FactoryTourHero() {
  return (
    <section className="relative w-full bg-[#181d27] pt-[80px]">
      {/* Background pattern */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1920px] h-[1440px] pointer-events-none z-0 overflow-hidden opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-8 py-24 lg:py-32">
        <div className="max-w-[1280px] mx-auto">
          {/* Hero header section */}
          <div className="flex flex-col items-center justify-center text-center gap-8 lg:gap-12 px-4 lg:px-8">
            {/* Heading and supporting text */}
            <div className="flex flex-col items-center gap-6 lg:gap-[30px] max-w-[768px]">
              <div className="flex flex-col items-center gap-3">
                <h1 className="text-4xl lg:text-[72px] font-semibold text-white lg:leading-[90px] tracking-tight">
                  Innovation in Motion:<br className="hidden lg:block" /> Explore Our State-of-
                  <br className="hidden lg:block" />
                  the-Art Facility
                </h1>
              </div>
              <p className="text-base lg:text-[20px] text-[#d0d5dd] lg:leading-[30px] max-w-[600px]">
                Where Design Precision and Excellence Meet Speed
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Button
                asChild
                className="w-full sm:w-auto h-9 lg:h-[60px] px-4 lg:px-7 rounded-lg bg-[#e4342d] hover:bg-[#bb2f27] active:bg-[#bb2f27] text-white text-sm lg:text-lg font-semibold shadow-sm"
              >
                <Link href="/contact">Schedule Visit</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full sm:w-auto h-9 lg:h-[60px] px-4 lg:px-[22px] rounded-lg text-white border-white/20 hover:bg-white/10 text-sm lg:text-lg font-semibold"
              >
                <Link href="#explore">Explore</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
