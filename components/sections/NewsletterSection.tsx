import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface NewsletterSectionProps {
  heading?: string
  supportingText?: string
  theme?: 'default' | 'brand'
}

export function NewsletterSection({
  heading = 'Sign up for our newsletter',
  supportingText = 'Be the first to know about releases and industry news and insights.',
  theme = 'brand',
}: NewsletterSectionProps) {
  const bgClass = theme === 'brand' ? 'bg-[#302f2f]' : 'bg-background'
  const headingClass = theme === 'brand' ? 'text-white' : 'text-foreground'
  const textColorClass = theme === 'brand' ? 'text-[#ed9b98]' : 'text-muted-foreground'

  return (
    <section className={`${bgClass} py-24`}>
      <div className="container mx-auto px-4">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
            {/* Heading and supporting text */}
            <div className="flex-1 space-y-5  max-w-[768px]">
              <h2 className={`text-4xl font-semibold leading-[44px] tracking-[-0.72px] ${headingClass}`}>
                {heading}
              </h2>
              <p className={`text-sm leading-[30px] ${textColorClass}`}>
                {supportingText}
              </p>
            </div>

            {/* Email capture form */}
            <div className="flex gap-4 w-full lg:w-[480px]">
              <div className="flex-1 flex flex-col gap-1.5">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white border-[#d5d7da] h-12 rounded-xl"
                />
                <p className="text-sm leading-5 text-[#ed9b98]">
                  We care about your data in our{' '}
                  <a href="/privacy" className="underline decoration-solid">
                    privacy policy
                  </a>
                  .
                </p>
              </div>
              <Button
                size="lg"
                className="bg-[#e4342d] hover:bg-[#e4342d]/90 text-white px-[18px] py-3 rounded-lg h-12"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
