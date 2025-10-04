import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'

interface HeroSectionProps {
  heading?: string
  supportingText?: string
  checkItems?: string[]
}

export function HeroSection({
  heading = 'Precision Railroad Solutions for 57+ Countries',
  supportingText = 'Engage with like-minded creatives in a unique, interactive setting that turns your spontaneous performances into polished digital memories.',
  checkItems = [
    '500+ OEM-Compatible Parts',
    'AAR-M1003 Certified',
    '57+ Countries Served',
    '30+ Years in Rail',
  ],
}: HeroSectionProps) {
  return (
    <section className="bg-white relative pt-16 pb-24">
      {/* Background pattern */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1920px] h-[1440px] pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-black/10 to-transparent opacity-5" />
      </div>

      <div className="relative z-10 container mx-auto px-8 py-24">
        <div className="max-w-[1280px] mx-auto space-y-16">
          {/* Main content */}
          <div className="flex gap-8 items-end">
            {/* Left column - Text and form */}
            <div className="flex-1 max-w-[768px] space-y-12">
              {/* Text and supporting text */}
              <div className="space-y-6">
                <h1 className="text-6xl font-semibold text-[#181d27] leading-[72px] tracking-[-1.2px]">
                  {heading}
                </h1>
                <p className="text-xl text-[#535862] leading-[30px]">
                  {supportingText}
                </p>
              </div>

              {/* Email capture */}
              <div className="flex gap-4 max-w-[480px]">
                <div className="flex-1 flex flex-col gap-1.5">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="h-12 rounded-xl border-[#d5d7da] bg-white"
                  />
                  <p className="text-sm text-[#535862] leading-5">
                    We will contact you right away.
                  </p>
                </div>
                <Button
                  size="lg"
                  className="bg-[#e4342d] hover:bg-[#e4342d]/90 text-white px-[18px] py-3 h-12 rounded-lg border-2 border-white/[0.12]"
                >
                  Get Quote
                </Button>
              </div>
            </div>

            {/* Right column - Check items */}
            <div className="flex flex-col gap-5 max-w-[480px] pl-4 pb-6">
              {checkItems.map((item, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <div className="bg-[#dcfae6] rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/images/check-icon.svg"
                      alt=""
                      width={16}
                      height={16}
                      className="w-4 h-4"
                    />
                  </div>
                  <p className="text-lg text-[#535862] leading-7 pt-0.5">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Video player */}
          <div className="relative w-full max-w-[1216px] mx-auto">
            <div className="relative h-[480px] rounded-2xl overflow-hidden">
              <Image
                src="/images/hero-video-poster.png"
                alt="Train on railroad"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/30" />
              <button
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full backdrop-blur-sm bg-white/20 border-2 border-white/30 flex items-center justify-center hover:bg-white/30 transition-colors"
                aria-label="Play video"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1"
                >
                  <path
                    d="M10 8L24 16L10 24V8Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
