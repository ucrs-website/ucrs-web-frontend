'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function CuttingEdgeTools() {
  const features = [
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
        >
          <path
            d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: '3D modeling for OEM-compatible designs',
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
        >
          <path
            d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 7l-1.5 1.5M16 11l-1.5 1.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: 'Precision CNC Machining',
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
        >
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
          <path
            d="M12 1v6m0 6v6M23 12h-6m-6 0H1"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
      title: 'Rigorous quality checks for every part',
    },
  ]

  // Mobile-specific features
  const mobileFeatures = [
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
        >
          <path
            d="M12 2L2 7l10 5 10-5-10-5z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 17l10 5 10-5M2 12l10 5 10-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: 'Robotic welding systems for precision',
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
        >
          <path
            d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: '3D modeling for OEM-compatible designs',
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
        >
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
          <path
            d="M12 1v6m0 6v6M23 12h-6m-6 0H1"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
      title: 'AI-driven predictive maintenance tools',
    },
  ]

  return (
    <section className="bg-[#f9fafb] py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-8 lg:space-y-12 order-2 lg:order-1">
              {/* Header */}
              <div className="space-y-4 lg:space-y-6">
                <p className="text-sm lg:text-base font-semibold text-[#e4342d] uppercase tracking-wide">
                  We know the way
                </p>
                <h2 className="text-3xl lg:text-[48px] font-semibold text-[#181d27] lg:leading-[60px] tracking-tight">
                  Cutting-Edge Tools for Excellence
                </h2>
              </div>

              {/* Feature List - Desktop */}
              <div className="hidden lg:block space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-700">
                      {feature.icon}
                    </div>
                    <p className="text-lg font-medium text-[#181d27] pt-3">
                      {feature.title}
                    </p>
                  </div>
                ))}
              </div>

              {/* Feature List - Mobile */}
              <div className="lg:hidden space-y-6">
                {mobileFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-700">
                      {feature.icon}
                    </div>
                    <p className="text-base font-medium text-[#181d27] pt-3">
                      {feature.title}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div>
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto h-10 lg:h-[50px] px-5 lg:px-6 rounded-lg bg-[#e4342d] hover:bg-[#bb2f27] text-white text-sm lg:text-base font-semibold shadow-sm"
                >
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>

            {/* Right Column - Video Player */}
            <div className="order-1 lg:order-2">
              <div className="relative aspect-video rounded-xl overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/ea8pWpDRzZM?si=jbmaBxhuylPX4WNV"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
