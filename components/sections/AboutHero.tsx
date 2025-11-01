"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AboutHero() {
  return (
    <section className="relative w-full lg:py-40 pt-[100px] flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        >
          <source src="/videos/about/about-hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-8 max-w-[1280px]">
        <div className="flex flex-col items-center justify-center text-center gap-8 pt-24">
          {/* Heading and Subheading */}
          <div className="flex flex-col items-center gap-6 max-w-[768px]">
            <div className="flex flex-col items-center gap-3">
              <h1 className="lg:text-7xl lg:max-w-[7568px] text-4xl font-bold text-white leading-[1.1] tracking-tight">
                Driving Rail Innovation Since 2001
              </h1>
            </div>
            <p className="text-[20px] text-[#feeaea] leading-[1.5] max-w-[470px]">
              Maximize Uptime with OEM-Compliant Repairs, Rebuilds, and Custom
              Engineering
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex items-start gap-3">
            <Button
              asChild
              size="lg"
              className="h-10 px-3.5 gap-1 text-sm font-semibold lg:h-[60px] lg:px-[22px] lg:gap-2 lg:text-lg rounded-lg lg:rounded-[10px]"
            >
              <Link href="/products">Explore Products</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
