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
  const bgClass = theme === 'brand' ? 'bg-primary text-primary-foreground' : 'bg-background'
  const textColorClass = theme === 'brand' ? 'text-primary-foreground/80' : 'text-muted-foreground'

  return (
    <section className={`${bgClass} py-24`}>
      <div className="container mx-auto px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-start lg:items-center">
            {/* Heading and supporting text */}
            <div className="flex-1 space-y-2 min-w-[320px] max-w-[768px]">
              <h2 className="text-4xl font-semibold leading-[44px] tracking-[-0.72px]">
                {heading}
              </h2>
              <p className={`text-xl leading-[30px] ${textColorClass}`}>
                {supportingText}
              </p>
            </div>

            {/* Email capture form */}
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto lg:min-w-[400px]">
              <Input
                type="email"
                placeholder="Enter your email"
                className={`flex-1 ${theme === 'brand' ? 'bg-white text-foreground' : ''}`}
              />
              <Button
                size="lg"
                variant={theme === 'brand' ? 'secondary' : 'default'}
                className="sm:w-auto"
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
