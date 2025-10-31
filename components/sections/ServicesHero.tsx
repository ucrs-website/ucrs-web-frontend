"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServicesHeroProps {
  heading?: string;
  supportingText?: string;
  ctaText?: string;
  ctaHref?: string;
  backgroundImage?: string;
}

export function ServicesHero({
  heading = "Expert Solutions for Railway Maintenance & Repair",
  supportingText = "Maximize Uptime with OEM-Compliant Repairs, Rebuilds, and Custom Engineering",
  ctaText = "Download Compliance Guide",
  ctaHref = "#",
  backgroundImage = "/images/services/ServiceLandScape.avif",
}: ServicesHeroProps) {
  return (
    <section className="relative w-full lg:pt-40 pt-[100px] min-h-[434px] lg:min-h-[720px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Railway maintenance workshop"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* 20% Black Overlay */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 h-full min-h-[434px] lg:min-h-[720px]">
        <div className="flex flex-col items-center justify-center h-full max-w-[1280px] mx-auto pt-16 pb-24 lg:pt-24 lg:pb-0">
          {/* Content Wrapper */}
          <div className="flex flex-col items-center text-center space-y-8 lg:space-y-12 max-w-[328px] lg:max-w-[768px]">
            {/* Heading and Supporting Text */}
            <div className="space-y-3 lg:space-y-6">
              {/* Heading */}
              <h1 className="text-2xl lg:text-7xl font-semibold text-white leading-[1.3] lg:leading-[1.25] tracking-tight lg:tracking-[-0.02em]">
                {heading}
              </h1>

              {/* Supporting Text */}
              <p className="text-base lg:text-xl text-[rgba(254,234,233,1)] leading-[1.5]">
                {supportingText}
              </p>
            </div>

            {/* CTA Button */}
            <Button
              asChild
              size="lg"
              className="h-10 px-3.5 gap-1 text-sm font-semibold lg:h-[60px] lg:px-[22px] lg:gap-2 lg:text-lg rounded-lg lg:rounded-[10px]"
            >
              <Link href={ctaHref}>
                <Download className="h-4 w-4 lg:h-5 lg:w-5" />
                {ctaText}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
