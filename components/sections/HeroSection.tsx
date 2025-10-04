import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface HeroSectionProps {
  heading?: string
  supportingText?: string
}

export function HeroSection({
  heading = 'Precision Railroad Solutions for 57+ Countries',
  supportingText = 'Engage with like-minded creatives in a unique, interactive setting that turns your spontaneous performances into polished digital memories.',
}: HeroSectionProps) {
  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-[768px] space-y-12">
            {/* Text and supporting text */}
            <div className="space-y-6">
              <h1 className="text-6xl font-semibold text-foreground leading-[72px] tracking-[-1.2px]">
                {heading}
              </h1>
              <p className="text-xl text-[rgb(83,88,98)] leading-[30px]">
                {supportingText}
              </p>
            </div>

            {/* Email capture */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-md">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button size="lg" className="sm:w-auto">
                Get started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
