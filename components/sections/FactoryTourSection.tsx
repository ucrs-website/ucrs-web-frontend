"use client";

import React from "react";
import { TrendingDown, Zap, Users } from "lucide-react";
import Image from "next/image";

interface Feature {
  icon: React.ElementType;
  title: string;
}

interface FactoryTourSectionProps {
  subheading?: string;
  heading?: string;
  description?: string;
  features?: Feature[];
}

const defaultFeatures: Feature[] = [
  {
    icon: TrendingDown,
    title: "OEM quality at competitive cost",
  },
  {
    icon: Zap,
    title: "Excellent technical and after sales support",
  },
  {
    icon: Users,
    title: "Backed by Industry-Leading Warranty",
  },
];

export function FactoryTourSection({
  subheading = "We are the best at what we do",
  heading = "Inside Factory Tour",
  description = "State of art facility on 3.5 acre land dedicated to manufacturing and service of rolling stock parts and assemblies.",
  features = defaultFeatures,
}: FactoryTourSectionProps) {
  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-[1280px] mx-auto space-y-12 md:space-y-16">
          {/* Top Row: Heading/Description + Features */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Left: Heading and Description */}
            <div className="space-y-5">
              {/* Subheading */}
              <p className="text-sm md:text-base font-semibold text-[rgb(1,64,194)] leading-6">
                {subheading}
              </p>

              {/* Heading */}
              <h2 className="text-2xl md:text-4xl font-semibold text-[rgb(24,29,39)] leading-tight md:leading-[44px] tracking-tight md:-tracking-[0.72px]">
                {heading}
              </h2>

              {/* Description */}
              <p className="text-base md:text-xl text-[rgb(83,88,98)] leading-relaxed md:leading-[30px]">
                {description}
              </p>
            </div>

            {/* Right: Features List */}
            <div className="space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 min-w-[240px]"
                  >
                    {/* Icon Container */}
                    <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-[10px] bg-white border border-[rgb(233,234,235)] shadow-sm flex items-center justify-center">
                      <Icon
                        className="w-5 h-5 md:w-6 md:h-6 text-[rgb(65,70,81)]"
                        strokeWidth={2}
                      />
                    </div>

                    {/* Feature Title */}
                    <h3 className="text-base md:text-xl font-semibold text-[rgb(24,29,39)] leading-[30px] flex-1">
                      {feature.title}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Row: Full-width Image */}
          <div className="w-full max-w-[800px] mx-auto">
            <Image
              src="/images/inside-factory-tour.webp"
              alt="Inside Factory Tour"
              width={800}
              height={450}
              className="w-full h-auto rounded-xl shadow-lg"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
