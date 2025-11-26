/**
 * Hero Quote Page Component
 * Hero section for the quote request page with background image and CTA
 */

"use client";

import Image from "next/image";

export function HeroQuotePage() {
  const scrollToForm = () => {
    const formElement = document.getElementById("quote-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative w-full h-[500px] md:h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/quote/office-bg2.webp"
          alt="Railway manufacturing facility"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Get a Custom Quote
            <br />
            for Your Rail Needs
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg lg:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Complete the form below, and our team will provide a competitive
            quote within 24 hours.
          </p>

          {/* CTA Button */}
          <button
            onClick={scrollToForm}
            className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white bg-primary hover:bg-primary/90 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Get Quote
          </button>
        </div>
      </div>
    </section>
  );
}
