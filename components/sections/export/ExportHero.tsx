import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ExportHero() {
  return (
    <section className="relative min-h-[720px] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Video with Overlay */}
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
          <source src="/videos/export/export-hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute left-1/2 top-0 w-[1920px] h-[1440px] -translate-x-1/2 md:block hidden">
          {/* Gradient Mask */}
          <div className="absolute inset-0 left-1/2 -translate-x-1/2 w-[1440px] h-[1440px]"></div>
        </div>

        {/* Mobile Grid Pattern */}
        <div className="absolute left-0 top-0 w-full h-[720px] md:hidden">
          <div className="absolute left-1/2 -translate-x-1/2 w-[960px] h-[960px] top-0">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at center top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 95.313%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container max-w-[1280px] px-4 md:px-8 py-24 md:py-32">
        <div className="flex flex-col items-center gap-8 md:gap-12 text-center">
          {/* Heading and Subheading */}
          <div className="flex flex-col items-center gap-3 md:gap-6 max-w-[768px]">
            <div className="flex flex-col items-center gap-3">
              <h1 className="text-2xl md:text-7xl lg:text-[72px] font-display font-semibold text-white leading-tight md:leading-[90px] tracking-tight md:tracking-[-1.44px]">
                Powering Rail Networks Across 37+ Countries
              </h1>
            </div>
            <p className="text-base md:text-xl text-[#feeaea] leading-relaxed md:leading-[30px]">
              Reliable Supply Chains, Certified Quality, and Localized Support
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex gap-3">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white shadow-[inset_0px_0px_0px_1px_rgba(10,13,18,0.18),inset_0px_-2px_0px_0px_rgba(10,13,18,0.05)] text-base md:text-lg px-5 md:px-6 py-3 md:py-4 h-auto"
            >
              <Link href="/quote">GET A QUOTE</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
