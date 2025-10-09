import React from 'react'
import Image from 'next/image'

export function GlobalStandards() {
  return (
    <section className="w-full py-6 md:py-24 bg-white">
      <div className="container mx-auto px-8 max-w-[1280px]">
        <div className="flex flex-col gap-8 items-center">
          {/* Heading */}
          <div className="flex items-center justify-center p-2.5 overflow-hidden">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#252b42] text-center leading-tight">
              Built to Global Standards
            </h2>
          </div>

          {/* AAR-M1003 Badge */}
          <div className="relative px-8 py-3 rounded-[20px] bg-gradient-to-r from-[#4a4a4a] to-[#2a2a2a] shadow-lg">
            <p className="text-3xl md:text-4xl font-bold text-white text-center whitespace-nowrap">
              AAR-M1003
            </p>
          </div>

          {/* Certificate Image */}
          <div className="relative w-full max-w-[800px] aspect-[800/612]">
            <Image
              src="/images/about/aar-m1003-certificate.png"
              alt="AAR-M1003 Quality Assurance Program Certification"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          </div>

          {/* Bottom Quote */}
          <div className="relative w-full max-w-[720px] px-8 py-5 rounded-[20px] bg-gradient-to-r from-[#4a4a4a] to-[#2a2a2a] shadow-lg">
            <p className="text-xl md:text-2xl font-bold text-white text-center leading-tight">
              "Every part undergoes 12+ quality checks."
            </p>
          </div>

          {/* Additional Context */}
          <div className="max-w-[800px] text-center mt-4">
            <p className="text-base md:text-lg text-[#737373] leading-relaxed">
              Our AAR-M1003 certification demonstrates our commitment to meeting the highest quality standards
              set by the Association of American Railroads. This certification ensures that every component we
              manufacture meets rigorous industry requirements for safety, reliability, and performance.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
