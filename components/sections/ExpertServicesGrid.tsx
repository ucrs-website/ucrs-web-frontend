'use client'

import React from 'react'
import Link from 'next/link'
import { Wrench, Target, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Zap } from 'lucide-react'

interface Service {
  id: string
  icon: React.ReactNode
  title: string
  description: string
  link: string
}

const services: Service[] = [
  {
    id: 'repair-return',
    icon: <Wrench className="h-5 w-5 text-white" />,
    title: 'Repair & Return of Assemblies',
    description:
      'Quick turnaround times for repair projects, including disassembly, parts replacement, and testing systems',
    link: '#',
  },
  {
    id: 'obsolescence',
    icon: <Target className="h-5 w-5 text-white" />,
    title: 'Obsolescence Management',
    description:
      'Specialized in substitution manufacturing strategies, offering advanced RE subsystemization/product component packaging.',
    link: '#',
  },
  {
    id: 'rebuild',
    icon: <Wrench className="h-5 w-5 text-white" />,
    title: 'Comprehensive Locomotive Rebuild Programs',
    description:
      'From the ground up to a like-brand-new rating state. All assemblies are reconditioned for maximum operational reliability.',
    link: '#',
  },
  {
    id: 'consulting',
    icon: <Target className="h-5 w-5 text-white" />,
    title: 'Consulting for Locomotive Maintenance & Rebuild',
    description:
      'Meet budgets and maximize expertise. Professional inspection, planning, and optimization for fleet maintenance.',
    link: '#',
  },
]

export function ExpertServicesGrid() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-[1280px] mx-auto space-y-12 lg:space-y-16">
          {/* Header Section */}
          <div className="space-y-4 lg:space-y-5 max-w-[360px] lg:max-w-full">
            {/* Icon and Heading */}
            <div className="space-y-4 lg:space-y-5">
              {/* Featured Icon */}
              <div className="flex items-center justify-start lg:justify-start">
                <div className="flex items-center justify-center w-10 h-10 lg:w-14 lg:h-14 rounded-full bg-[#ECD9D8]">
                  <Zap className="h-5 w-5 lg:h-7 lg:w-7 text-[#AA1C17]" strokeWidth={2} />
                </div>
              </div>

              {/* Heading */}
              <h2 className="text-2xl lg:text-4xl font-semibold text-[#181D27] leading-tight tracking-tight lg:tracking-[-0.02em]">
                Our Expert Services
              </h2>
            </div>

            {/* Supporting Text */}
            <p className="text-base lg:text-lg text-[#535862] leading-relaxed">
              Discover innovative solutions tailored to your needs. Our team is dedicated to
              providing exceptional service and support.
            </p>

            {/* CTA Button */}
            <Button
              asChild
              size="lg"
              className="h-10 px-3.5 text-sm font-semibold lg:h-[60px] lg:px-[22px] lg:text-lg rounded-lg lg:rounded-[10px]"
            >
              <Link href="#services">Request For Service</Link>
            </Button>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white border border-gray-100 rounded-2xl p-5 lg:p-8 space-y-5 lg:space-y-6 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Icon */}
                <div className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-primary">
                  {service.icon}
                </div>

                {/* Content */}
                <div className="space-y-3 lg:space-y-4">
                  {/* Title */}
                  <h3 className="text-lg lg:text-xl font-semibold text-[#181D27] leading-tight">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm lg:text-base text-[#535862] leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Action Link */}
                <Link
                  href={service.link}
                  className="inline-flex items-center gap-2 text-sm lg:text-base font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  Request for Service
                  <ArrowRight className="h-4 w-4 lg:h-5 lg:w-5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
