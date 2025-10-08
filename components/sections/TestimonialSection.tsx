'use client'

import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowLeft, ArrowRight, Star } from 'lucide-react'

/**
 * Testimonial Interface
 *
 * @example
 * ```tsx
 * const testimonial: Testimonial = {
 *   quote: "UCRS has transformed our railway operations...",
 *   author: {
 *     name: "John Smith",
 *     role: "Operations Director"
 *   },
 *   company: {
 *     name: "Global Railways Inc.",
 *     location: "USA, California"
 *   },
 *   image: "/testimonial-factory.avif",
 *   rating: 5
 * }
 * ```
 */
export interface Testimonial {
  quote: string
  author: {
    name: string
    role: string
  }
  company: {
    name: string
    location: string // e.g., "USA, California"
  }
  image: string // Path to the testimonial background image
  rating?: number // Optional rating out of 5
}

interface TestimonialSectionProps {
  testimonials: Testimonial[]
}

export function TestimonialSection({ testimonials }: TestimonialSectionProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  const currentTestimonial = testimonials[selectedIndex] || testimonials[0]

  return (
    <section className="bg-background">
      <div className="flex flex-col lg:flex-row lg:h-full">
        {/* Left side - Quote and Controls */}
        <div className="flex-1 flex items-center justify-end lg:py-24 px-4 lg:px-0">
          <div className="w-full max-w-[640px] lg:pr-8 py-16 lg:py-0">
            <div className="flex flex-col gap-10 px-4 lg:px-8">
              {/* Quote */}
              <blockquote className="text-3xl lg:text-[48px] font-medium text-foreground lg:leading-[60px] tracking-tight">
                &ldquo;{currentTestimonial.quote}&rdquo;
              </blockquote>

              {/* Attribution and Controls */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <p className="text-lg font-semibold text-foreground leading-7">
                    {currentTestimonial.author.name}
                  </p>
                  <p className="text-base text-muted-foreground leading-6">
                    {currentTestimonial.author.role}
                  </p>
                </div>

                {/* Navigation Arrows */}
                <div className="flex gap-8 shrink-0">
                  <button
                    onClick={scrollPrev}
                    className="w-14 h-14 rounded-full border border-border flex items-center justify-center hover:bg-accent transition-colors"
                    aria-label="Previous testimonial"
                  >
                    <ArrowLeft className="w-6 h-6 text-muted-foreground" strokeWidth={2} />
                  </button>
                  <button
                    onClick={scrollNext}
                    className="w-14 h-14 rounded-full border border-border flex items-center justify-center hover:bg-accent transition-colors"
                    aria-label="Next testimonial"
                  >
                    <ArrowRight className="w-6 h-6 text-muted-foreground" strokeWidth={2} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Image with Overlay Card */}
        <div className="flex-1 relative h-[500px] lg:h-auto lg:min-h-0 lg:min-w-[560px]">
          <div className="overflow-hidden h-full" ref={emblaRef}>
            <div className="flex h-full">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 relative h-full">
                  {/* Background Image */}
                  <Image
                    src={testimonial.image}
                    alt={`${testimonial.company.name} - ${testimonial.company.location}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />

                  {/* Bottom Card */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 pt-24">
                    <div className="backdrop-blur-md bg-white/30 border border-white/30 rounded-2xl p-5 space-y-2">
                      {/* Company Name and Rating */}
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-white text-[30px] font-semibold leading-[38px] flex-1">
                          {testimonial.company.name}
                        </h3>

                        {/* Rating Stars */}
                        {testimonial.rating && (
                          <div className="flex gap-1 shrink-0">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${
                                  i < testimonial.rating!
                                    ? 'fill-white text-white'
                                    : 'fill-white/30 text-white/30'
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Location and Author */}
                      <div className="text-white space-y-0.5">
                        <p className="text-lg font-semibold leading-7">
                          {testimonial.company.location}
                        </p>
                        <p className="text-base font-medium leading-6">
                          {testimonial.author.name}, {testimonial.author.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
