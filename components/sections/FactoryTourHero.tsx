'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { Play } from 'lucide-react'

export function FactoryTourHero() {
  return (
    <section className="relative w-full lg:h-[100dvh] mt-[-110px] pt-[80px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/factory-tour/factory-tour-bg.png"
          alt=""
          fill
          className="object-cover"
          priority
          quality={100}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-8 py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto">
          {/* Hero header section */}
          <div className="flex flex-col items-center justify-center text-center gap-8 lg:gap-[48px] px-4 lg:px-8">
            {/* Heading and supporting text */}
            <div className="flex flex-col items-center gap-4 lg:gap-[30px] max-w-[768px]">
              <div className="flex flex-col items-center gap-3">
                <h1 className="lg:text-6xl text-4xl leading-[40px] lg:text-[90px] font-bold text-white lg:leading-[90px] tracking-tight">
                  Innovation in Motion:<br /> Explore Our State-of-the-Art Facility
                </h1>
              </div>
              <p className="text-base lg:text-[20px] text-[#e5e7eb] lg:leading-[30px] max-w-[600px]">
                Manufacturing Excellence for Railroads Worldwide
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Button
                asChild
                variant="outline"
                className="w-full sm:w-auto h-9 lg:h-[60px] px-4 lg:px-6 rounded-lg bg-white hover:bg-gray-50 text-[#1f2937] border-0 text-sm lg:text-lg font-semibold shadow-sm gap-2"
              >
                <Link href="/contact">
                  <Play className="w-4 h-4 lg:w-5 lg:h-5 fill-current" />
                  Start Virtual Tour
                </Link>
              </Button>
              <Button
                asChild
                className="w-full sm:w-auto h-9 lg:h-[60px] px-4 lg:px-6 rounded-lg bg-[#e4342d] hover:bg-[#d32821] active:bg-[#bb2f27] text-white text-sm lg:text-lg font-semibold shadow-sm"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
