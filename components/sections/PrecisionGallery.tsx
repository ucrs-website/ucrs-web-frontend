'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function PrecisionGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const slides = [
    {
      number: '1',
      title: 'Quality Inspection',
      image: '/images/quality-inspection.jpg',
    },
    {
      number: '2',
      title: 'CNC Machining',
      image: '/images/cnc-machining.jpg',
    },
    {
      number: '3',
      title: 'Final Verification',
      image: '/images/final-verification.jpg',
    },
    {
      number: '4',
      title: 'Assembly Line',
      image: '/images/assembly-line.jpg',
    },
  ]

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="max-w-[1280px] mx-auto">
          {/* Header */}
          <div className="mb-12 lg:mb-16">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="max-w-[768px] space-y-2 lg:space-y-[10px]">
                <h2 className="text-3xl lg:text-[44px] font-semibold text-[#181d27] lg:leading-[52.8px] tracking-tight">
                  Precision at Every Step
                </h2>
                <p className="text-base lg:text-[20px] text-[#535862] lg:leading-[30px]">
                  See how we use advanced technology to maintain excellence
                </p>
              </div>

              {/* Desktop Actions */}
              <div className="hidden lg:flex items-center gap-3">
                <Button
                  asChild
                  size="lg"
                  className="h-12 px-6 rounded-lg bg-[#e4342d] hover:bg-[#bb2f27] text-white text-base font-semibold shadow-sm"
                >
                  <Link href="/contact">View our work</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 px-6 rounded-lg text-[#181d27] border-gray-300 hover:bg-gray-50 text-base font-semibold"
                >
                  <Link href="/products">Explore</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Carousel */}
          <div className="relative">
            {/* Cards Container */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out gap-4 lg:gap-8"
                style={{
                  transform: `translateX(-${currentIndex * (100 / (slides.length > 3 ? 3 : 1))}%)`,
                }}
              >
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-21.333px)]"
                  >
                    <div className="relative h-[200px] lg:h-[504px] rounded-2xl overflow-hidden bg-gray-100">
                      {/* Placeholder image with gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400" />

                      {/* Number badge */}
                      <div className="absolute top-4 lg:top-8 left-4 lg:left-8 w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white flex items-center justify-center shadow-md">
                        <span className="text-base lg:text-lg font-bold text-[#181d27]">
                          {slide.number}
                        </span>
                      </div>

                      {/* Title overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 bg-gradient-to-t from-black/60 to-transparent">
                        <h3 className="text-lg lg:text-[26px] font-semibold text-white lg:leading-[38px]">
                          {slide.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-4 mt-8 lg:mt-12">
              <button
                onClick={handlePrev}
                className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700" />
              </button>
              <button
                onClick={handleNext}
                className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden flex-col sm:flex-row items-center gap-3 mt-8">
            <Button
              asChild
              className="w-full sm:w-auto h-9 px-4 rounded-lg bg-[#e4342d] hover:bg-[#bb2f27] text-white text-sm font-semibold"
            >
              <Link href="/contact">View our work</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full sm:w-auto h-9 px-4 rounded-lg text-[#181d27] border-gray-300 hover:bg-gray-50 text-sm font-semibold"
            >
              <Link href="/products">Explore</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
