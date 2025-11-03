"use client";

import React from "react";
import Link from "next/link";
import { Wrench, Target, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

interface Service {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}

const services: Service[] = [
  {
    id: "repair-return",
    icon: <Wrench className="h-5 w-5 text-white" />,
    title: "Repair & Return of Assemblies",
    description:
      "Quick turnaround times for repair projects, including disassembly, parts replacement, and testing systems",
    link: "#quote-form",
  },
  {
    id: "obsolescence",
    icon: <Target className="h-5 w-5 text-white" />,
    title: "Obsolescence Management",
    description:
      "Specialized in substitution manufacturing strategies, offering advanced RE subsystemization/product component packaging.",
    link: "#quote-form",
  },
  {
    id: "rebuild",
    icon: <Wrench className="h-5 w-5 text-white" />,
    title: "Comprehensive Locomotive Rebuild Programs",
    description:
      "From the ground up to a like-brand-new rating state. All assemblies are reconditioned for maximum operational reliability.",
    link: "#quote-form",
  },
  {
    id: "consulting",
    icon: <Target className="h-5 w-5 text-white" />,
    title: "Consulting for Locomotive Maintenance & Rebuild",
    description:
      "Meet budgets and maximize expertise. Professional inspection, planning, and optimization for fleet maintenance.",
    link: "#quote-form",
  },
];

export function ExpertServicesGrid() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-[1280px] mx-auto">
          {/* Mobile: Stacked Layout */}
          <div className="lg:hidden space-y-12">
            {/* Header Section */}
            <div className="space-y-4 max-w-[360px]">
              {/* Icon and Heading */}
              <div className="space-y-4">
                {/* Featured Icon */}
                <div className="flex items-center justify-start">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#ECD9D8]">
                    <Zap className="h-5 w-5 text-[#AA1C17]" strokeWidth={2} />
                  </div>
                </div>

                {/* Heading */}
                <h2 className="text-2xl font-semibold text-[#181D27] leading-tight tracking-tight">
                  Our Expert Services
                </h2>
              </div>

              {/* Supporting Text */}
              <p className="text-base text-[#535862] leading-relaxed">
                Discover innovative solutions tailored to your needs. Our team
                is dedicated to providing exceptional service and support.
              </p>

              {/* CTA Button */}
              <Button
                asChild
                size="lg"
                className="h-10 px-3.5 text-sm font-semibold rounded-lg"
              >
                <Link href="#quote-form">Request For Service</Link>
              </Button>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 gap-8">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-gray-50 border border-gray-50 rounded-2xl p-5 space-y-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Icon */}
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
                    {service.icon}
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    {/* Title */}
                    <h3 className="text-lg font-semibold text-[#181D27] leading-tight">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-[#535862] leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Action Link */}
                  <Link
                    href={service.link}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    Request for Service
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: 2-Column Layout (1fr 2fr) */}
          <div className="hidden lg:grid lg:grid-cols-[1fr_2fr] lg:gap-8">
            {/* Left Column: Header Section */}
            <div className="space-y-5 max-w-[360px]">
              {/* Icon and Heading */}
              <div className="space-y-5">
                {/* Featured Icon */}
                <div className="flex items-center justify-start">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#ECD9D8]">
                    <Zap className="h-7 w-7 text-[#AA1C17]" strokeWidth={2} />
                  </div>
                </div>

                {/* Heading */}
                <h2 className="text-4xl font-semibold text-[#181D27] leading-tight tracking-[-0.02em]">
                  Our Expert Services
                </h2>
              </div>

              {/* Supporting Text */}
              <p className="text-lg text-[#535862] leading-relaxed">
                Discover innovative solutions tailored to your needs. Our team
                is dedicated to providing exceptional service and support.
              </p>

              {/* CTA Button */}
              <Button
                asChild
                size="lg"
                className="h-[60px] px-[22px] text-lg rounded-[10px]"
              >
                <Link href="#quote-form">Request For Service</Link>
              </Button>
            </div>

            {/* Right Column: Services Grid (2x2) */}
            <div className="grid grid-cols-2 gap-8">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-gray-50 border border-gray-50 rounded-2xl p-8 space-y-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Icon */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary">
                    {service.icon}
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    {/* Title */}
                    <h3 className="text-xl font-semibold text-[#181D27] leading-tight">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-base text-[#535862] leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Action Link */}
                  <Link
                    href={service.link}
                    className="inline-flex items-center gap-2 text-base font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    Request for Service
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
