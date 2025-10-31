import { Download } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function ExportHero() {
  return (
    <section className="relative min-h-[720px] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <Image
          src="/images/export/hero-bg.png"
          alt=""
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute left-1/2 top-0 w-[1920px] h-[1440px] -translate-x-1/2 md:block hidden">
          {/* Gradient Mask */}
          <div className="absolute inset-0 left-1/2 -translate-x-1/2 w-[1440px] h-[1440px]"></div>

          {/* Grid Lines */}
          <div className="absolute inset-0 left-1/2 -translate-x-1/2 w-[1920px] h-[1440px]">
            {/* Vertical lines */}
            <svg
              className="absolute inset-0 w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="vertical-lines"
                  x="0"
                  y="0"
                  width="120"
                  height="1440"
                  patternUnits="userSpaceOnUse"
                >
                  <line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1440"
                    stroke="white"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#vertical-lines)" />
            </svg>

            {/* Horizontal lines */}
            <svg
              className="absolute inset-0 w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="horizontal-lines"
                  x="0"
                  y="0"
                  width="1920"
                  height="120"
                  patternUnits="userSpaceOnUse"
                >
                  <line
                    x1="0"
                    y1="0"
                    x2="1920"
                    y2="0"
                    stroke="white"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#horizontal-lines)" />
            </svg>
          </div>
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

          <div className="absolute left-1/2 -translate-x-1/2 w-[960px] h-[960px] top-0">
            <svg
              className="absolute inset-0 w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="vertical-lines-mobile"
                  x="0"
                  y="0"
                  width="80"
                  height="960"
                  patternUnits="userSpaceOnUse"
                >
                  <line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="960"
                    stroke="white"
                    strokeWidth="1"
                  />
                </pattern>
                <pattern
                  id="horizontal-lines-mobile"
                  x="0"
                  y="0"
                  width="960"
                  height="80"
                  patternUnits="userSpaceOnUse"
                >
                  <line
                    x1="0"
                    y1="0"
                    x2="960"
                    y2="0"
                    stroke="white"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect
                width="100%"
                height="100%"
                fill="url(#vertical-lines-mobile)"
              />
              <rect
                width="100%"
                height="100%"
                fill="url(#horizontal-lines-mobile)"
              />
            </svg>
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
                Powering Rail Networks Across 57+ Countries
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
              className="bg-primary hover:bg-primary/90 text-white border-2 border-white/12 shadow-[inset_0px_0px_0px_1px_rgba(10,13,18,0.18),inset_0px_-2px_0px_0px_rgba(10,13,18,0.05)] text-base md:text-lg px-5 md:px-6 py-3 md:py-4 h-auto"
            >
              <Download className="w-5 h-5 md:w-6 md:h-6" />
              Download Compliance Guide
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
