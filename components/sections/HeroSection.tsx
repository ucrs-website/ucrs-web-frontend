import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface HeroSectionProps {
  heading?: React.ReactNode;
  supportingText?: string;
  subtitle?: string;
  checkItems?: string[];
}

export function HeroSection({
  heading = (
    <>
      Precision{" "}
      <span className="text-[#24466b]">Rolling Stock Parts & Services</span> On
      Global Scale
    </>
  ),
  supportingText = "Upper Canada Railway Services (UCRS) delivers high-quality parts and assemblies for railway rolling stock.",
  subtitle = "Trusted worldwide for precision manufacturing and dependable solutions. Backed by exceptional customer service and after-sales support.",
  checkItems = [
    "5000+ OEM-Compatible Parts",
    "AAR-M1003 Certified",
    "37+ Countries Served",
    "60+ Years Combined Experience",
  ],
}: HeroSectionProps) {
  return (
    <section className="bg-white relative pt-16 pb-8 lg:pt-40 pt-[100px]">
      {/* Background pattern */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1920px] h-[1440px] pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-black/10 to-transparent opacity-5" />
      </div>

      <div className="relative z-10 container mx-auto px-8">
        <div className="max-w-[1280px] mx-auto space-y-10">
          {/* Main content */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-start">
            {/* Left column - Text and CTAs */}
            <div className="flex-1 max-w-[768px] space-y-8">
              {/* Text and supporting text */}
              <div className="space-y-6">
                <h1 className="text-4xl md:text-[60px] font-semibold text-[#181d27] md:leading-[72px] tracking-[-1.2px]">
                  {heading}
                </h1>
                <div className="space-y-2">
                  <p className="text-2xl text-[#535862] leading-[28.64px]">
                    {supportingText}
                  </p>
                  <p className="text-base text-[#6c737f] leading-6">
                    {subtitle}
                  </p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#e4342d] hover:bg-[#bb2f27] active:bg-[#bb2f27] text-white h-12 rounded-lg shadow-sm"
                >
                  <Link href="/quote">Get Quote</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 rounded-lg text-[#e4342d] border-[#e4342d] hover:bg-[#ffe0d9]"
                >
                  <Link href="/products">Explore Products</Link>
                </Button>
              </div>
            </div>

            {/* Right column - Check items */}
            <div className="flex flex-col gap-5 max-w-[480px] lg:pl-4">
              {checkItems.map((item, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <div className="bg-[#dcfae6] rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/images/check-icon.svg"
                      alt=""
                      width={16}
                      height={16}
                      className="w-4 h-4"
                    />
                  </div>
                  <p className="text-lg text-[#535862] leading-7 pt-0.5">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Video player */}
          <div className="relative w-full max-w-[1216px] mx-auto">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100">
              <video
                autoPlay
                muted
                loop
                playsInline
                disablePictureInPicture
                controlsList="nodownload nofullscreen noremoteplayback"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              >
                <source src="/videos/hero-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
