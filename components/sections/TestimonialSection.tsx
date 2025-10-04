import React from 'react'
import Image from 'next/image'
import { Star } from 'lucide-react'

interface Testimonial {
  quote: string
  author: {
    name: string
    role: string
    company: string
    image?: string
  }
  rating?: number
}

interface TestimonialSectionProps {
  testimonial: Testimonial
}

export function TestimonialSection({ testimonial }: TestimonialSectionProps) {
  return (
    <section className="bg-muted/50 py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-[768px] mx-auto text-center space-y-8">
            {/* Company logo placeholder */}
            <div className="flex justify-center">
              <div className="w-32 h-8 bg-muted rounded" />
            </div>

            {/* Rating stars */}
            {testimonial.rating && (
              <div className="flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.rating!
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Quote */}
            <blockquote className="text-2xl md:text-3xl font-medium text-foreground leading-[1.4]">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>

            {/* Author */}
            <div className="flex flex-col items-center gap-3">
              {testimonial.author.image && (
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.author.image}
                    alt={testimonial.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <p className="font-semibold text-foreground">
                  {testimonial.author.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.author.role} at {testimonial.author.company}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
