'use client'

import React from 'react'
import { Rocket, Cog } from 'lucide-react'

export function BuildingFuture() {
  const testimonials = [
    {
      icon: Rocket,
      title: 'Your Parte In Guarantees',
      quote:
        'Our commitment to quality and precision engineering has transformed railway maintenance standards across the industry.',
    },
    {
      icon: Cog,
      title: 'Advanced Manufacturing',
      quote:
        'Leveraging cutting-edge technology and expert craftsmanship to deliver superior railway components.',
    },
    {
      icon: Cog,
      title: 'Sustainable Practices',
      quote:
        'Building a greener future through eco-friendly manufacturing processes and renewable energy solutions.',
    },
  ]

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="max-w-[1280px] mx-auto">
          {/* Header */}
          <div className="mb-12 lg:mb-16">
            <div className="max-w-[1216px] mx-auto">
              <h2 className="text-3xl lg:text-[44px] font-semibold text-[#181d27] lg:leading-[52.8px] tracking-tight">
                Building a Greener Future
              </h2>
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="relative h-[480px] rounded-2xl overflow-hidden"
              >
                {/* Background Image Placeholder */}
                <div
                  className={`absolute inset-0 ${
                    index === 0
                      ? 'bg-gradient-to-br from-blue-300 via-indigo-200 to-purple-300'
                      : index === 1
                      ? 'bg-gradient-to-br from-gray-400 via-gray-300 to-gray-200'
                      : 'bg-gradient-to-br from-slate-300 via-blue-200 to-sky-300'
                  }`}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Content */}
                <div className="relative h-full flex flex-col justify-between p-5 lg:p-8">
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg bg-white/90 flex items-center justify-center">
                    <testimonial.icon className="w-5 h-5 text-[#181d27]" strokeWidth={2} />
                  </div>

                  {/* Text Content */}
                  <div className="space-y-3 lg:space-y-4">
                    <h3 className="text-xl lg:text-[26px] font-semibold text-white lg:leading-[38px]">
                      {testimonial.title}
                    </h3>
                    <p className="text-base text-white/90 leading-6">
                      {testimonial.quote}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
