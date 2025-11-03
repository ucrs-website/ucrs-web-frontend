'use client'

import React, { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import ReCAPTCHA from 'react-google-recaptcha'

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
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const bgClass = theme === 'brand' ? 'bg-[#302f2f]' : 'bg-background'
  const headingClass = theme === 'brand' ? 'text-white' : 'text-foreground'
  const textColorClass = theme === 'brand' ? 'text-[#ed9b98]' : 'text-muted-foreground'

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validate email
    if (!email.trim()) {
      setError('Email is required')
      return
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    try {
      setIsLoading(true)

      // Execute reCAPTCHA
      const recaptchaToken = await recaptchaRef.current?.executeAsync()

      if (!recaptchaToken) {
        setError('reCAPTCHA verification failed. Please try again.')
        setIsLoading(false)
        return
      }

      // Reset reCAPTCHA for next submission
      recaptchaRef.current?.reset()

      // Submit to API
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          recaptchaToken,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
        toast.error(data.error || 'Subscription failed')
        return
      }

      // Success
      toast.success('Thank you for subscribing to our newsletter!', {
        description: 'We appreciate your interest in UCRS.',
      })

      // Reset form
      setEmail('')
      setError('')
    } catch (err) {
      console.error('Newsletter subscription error:', err)
      setError('An unexpected error occurred. Please try again later.')
      toast.error('Subscription failed. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className={`${bgClass} py-24`}>
      <div className="container mx-auto px-4">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
            {/* Heading and supporting text */}
            <div className="flex-1 space-y-5 max-w-[768px]">
              <h2 className={`text-4xl font-semibold leading-[44px] tracking-[-0.72px] ${headingClass}`}>
                {heading}
              </h2>
              <p className={`text-sm leading-[30px] ${textColorClass}`}>
                {supportingText}
              </p>
            </div>

            {/* Email capture form */}
            <form onSubmit={handleSubmit} className="flex gap-4 w-full lg:w-[480px]">
              <div className="flex-1 flex flex-col gap-1.5">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError('')
                  }}
                  disabled={isLoading}
                  className={`bg-white border-[#d5d7da] h-12 rounded-xl ${
                    error ? 'border-red-500' : ''
                  }`}
                  aria-invalid={!!error}
                  aria-describedby={error ? 'email-error' : undefined}
                />
                {error && (
                  <p id="email-error" className="text-sm text-red-500">
                    {error}
                  </p>
                )}
                {!error && (
                  <p className="text-sm leading-5 text-[#ed9b98]">
                    We care about your data in our{' '}
                    <a href="/privacy" className="underline decoration-solid">
                      privacy policy
                    </a>
                    .
                  </p>
                )}
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className="bg-[#e4342d] hover:bg-[#e4342d]/90 text-white px-[18px] py-3 rounded-lg h-12"
              >
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Hidden reCAPTCHA v3 */}
      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
      />
    </section>
  )
}
