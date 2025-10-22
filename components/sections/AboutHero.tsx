'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function AboutHero() {
  return (
    <section className="relative w-full lg:py-40 pt-[100px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/about/about-hero.avif)' }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-8 max-w-[1280px]">
        <div className="flex flex-col items-center justify-center text-center gap-8 pt-24">
          {/* Heading and Subheading */}
          <div className="flex flex-col items-center gap-6 max-w-[768px]">
            <div className="flex flex-col items-center gap-3">
              <h1 className="lg:text-7xl lg:max-w-[7568px] text-4xl font-bold text-white leading-[1.1] tracking-tight">
                Driving Rail Innovation Since 2001
              </h1>
            </div>
            <p className="text-[20px] text-[#feeaea] leading-[1.5] max-w-[470px]">
              Maximize Uptime with OEM-Compliant Repairs, Rebuilds, and Custom Engineering
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex items-start gap-3">
            <Link
              href="/products"
              className="inline-flex items-center justify-center !bg-[#ed2c24] hover:!bg-[#d32821] active:!bg-[#c12419] text-white !h-[56px] !min-h-[56px] px-[26px] !rounded-[10px] !text-[18px] font-semibold !leading-[28px] shadow-[0px_0px_0px_1px_inset_rgba(10,13,18,0.18),0px_-2px_0px_0px_inset_rgba(10,13,18,0.05)] !border-2 !border-[rgba(255,255,255,0.12)] transition-colors no-underline"
              style={{
                backgroundColor: '#ed2c24',
                height: '56px',
                minHeight: '56px',
                borderRadius: '10px',
                fontSize: '18px',
                lineHeight: '28px',
                padding: '0 26px',
                border: '2px solid rgba(255,255,255,0.12)',
              }}
            >
              Explore Our Products
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
