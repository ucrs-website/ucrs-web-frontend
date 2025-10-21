'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const testimonials = [
  {
    id: 1,
    quote:
      "UCRS has saved us thousands of hours of work. We're able to spin up projects and features faster with their reliable parts and support.",
    author: 'Ammar Foley',
    role: 'Operations Director, GlobalRail',
    avatar: '/images/export/avatar-1.png',
  },
  {
    id: 2,
    quote:
      "The quality and consistency of parts from UCRS is unmatched. Their global supply chain ensures we never face delays in our operations.",
    author: 'Sarah Chen',
    role: 'Procurement Manager, TransEuropa',
    avatar: '/images/export/avatar-1.png',
  },
  {
    id: 3,
    quote:
      "Working with UCRS has transformed our maintenance operations. Their 24/7 support and real-time tracking gives us complete peace of mind.",
    author: 'Michael Rodriguez',
    role: 'Chief Engineer, Pacific Railways',
    avatar: '/images/export/avatar-1.png',
  },
  {
    id: 4,
    quote:
      "From customs clearance to delivery, UCRS handles everything seamlessly. Their expertise in international trade is invaluable to our business.",
    author: 'Elena Petrov',
    role: 'Supply Chain Director, RailConnect',
    avatar: '/images/export/avatar-1.png',
  },
]

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <section className="bg-gradient-to-br from-gray-800 via-gray-900 to-black py-12 md:py-24">
      <div className="container max-w-[1280px] px-4 md:px-8">
        <div className="flex flex-col items-center gap-8 md:gap-12">
          {/* Heading */}
          <div className="text-center">
            <h2 className="text-2xl md:text-5xl font-display font-medium text-[#ffcd94] tracking-tight leading-tight">
              Trusted by Railways Leaders Worldwide
            </h2>
          </div>

          {/* Testimonial Content */}
          <div className="w-full max-w-4xl">
            <div className="flex flex-col items-center gap-8 text-center">
              {/* Quote */}
              <p className="text-2xl md:text-5xl font-display font-medium text-white leading-tight tracking-tight">
                {testimonials[currentIndex].quote}
              </p>

              {/* Avatar and Attribution */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border border-black/10">
                  <div className="absolute inset-0 bg-[#c7d1b0]" />
                  <Image
                    src={testimonials[currentIndex].avatar}
                    alt={testimonials[currentIndex].author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-lg font-semibold text-white">
                    {testimonials[currentIndex].author}
                  </p>
                  <p className="text-base text-[#fff3f3]">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Dots */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all duration-300',
                  index === currentIndex
                    ? 'bg-primary w-8'
                    : 'bg-white/30 hover:bg-white/50'
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
