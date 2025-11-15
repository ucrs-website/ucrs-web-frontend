/**
 * Quote Request Page
 * Main page for requesting quotes for products or services
 */

"use client";

import { useState, useEffect } from "react";
import type { Metadata } from "next";
import { HeroQuotePage } from "@/components/quote/HeroQuotePage";
import { QuoteRequestForm } from "@/components/quote/QuoteRequestForm";
import { WhatHappensNextSection } from "@/components/quote/WhatHappensNextSection";
import { PriorityBanner } from "@/components/quote/PriorityBanner";
import { ContactSection } from "@/components/quote/ContactSection";
import { NewsletterSection } from "@/components/quote/NewsletterSection";
import { OurLocations } from "@/components/sections/OurLocations";

export default function QuotePage() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSuccess = () => {
    setShowSuccess(true);
    setShowError(false);
  };

  const handleError = (error: string) => {
    setErrorMessage(error);
    setShowError(true);
    setShowSuccess(false);
  };

  // Scroll to top when success or error state changes
  useEffect(() => {
    if (showSuccess || showError) {
      // Small delay to ensure DOM has updated
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  }, [showSuccess, showError]);

  // Success State View
  if (showSuccess) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div
            className="max-w-5xl mx-auto rounded-3xl p-12 md:p-16 relative overflow-hidden"
            style={{
              background:
                "linear-gradient(to bottom, rgba(134, 239, 172, 0.95), transparent)",
              backgroundImage:
                "linear-gradient(to bottom, rgba(134, 239, 172, 0.95), transparent), url(/images/quote/quote-form-bg.avif)",
              backgroundSize: "contain",
              backgroundPosition: "center right",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="relative z-10">
              {/* Header */}
              <p className="text-base font-bold uppercase tracking-wider mb-6 text-gray-900">
                REQUEST FOR QUOTE
              </p>

              {/* Success Message - Icon and Text in One Line */}
              <div className="flex items-center gap-4 mb-4">
                {/* Success Icon */}
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-600 rounded-full flex-shrink-0">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                {/* Success Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-green-600">
                  We Received Your Request
                </h1>
              </div>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-gray-800 mb-8">
                Our team will contact you shortly.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error State View
  if (showError) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-red-50 to-red-100 rounded-3xl p-12 md:p-16 relative overflow-hidden">
            {/* UCRS Watermark */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[200px] font-bold text-red-200/30 select-none pointer-events-none">
              UCRS
            </div>

            <div className="relative z-10 text-center">
              {/* Error Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500 rounded-full mb-6">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-red-900 mb-4">
                Request Failed
              </h1>
              <p className="text-lg md:text-xl text-red-800 mb-2">
                We encountered an error processing your request.
              </p>
              <p className="text-sm text-red-700">{errorMessage}</p>

              <button
                onClick={() => setShowError(false)}
                className="mt-8 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Form View
  return (
    <>
      {/* Hero Section */}
      <HeroQuotePage />

      {/* Quote Form Section */}
      <section id="quote-form" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div
            className="mx-auto bg-[#3d4f5c] rounded-2xl p-6 md:p-12 relative overflow-hidden"
            style={{
              backgroundImage: "url(/images/quote/quote-form-bg.avif)",
              backgroundSize: "80%",
              backgroundPosition: "130% 0",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Form Content */}
            <div className="relative z-10">
              <div className="text-center text-white mb-12">
                <p className="text-sm uppercase tracking-wider mb-2 text-gray-300">
                  REQUEST FOR QUOTE
                </p>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Quick Quote, Zero Headache
                </h2>
              </div>

              <QuoteRequestForm
                onSuccess={handleSuccess}
                onError={handleError}
                defaultTab="products"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What Happens Next Section */}
      <WhatHappensNextSection />

      {/* Priority Banner */}
      <PriorityBanner />

      {/* Contact Section */}
      <ContactSection />

      {/* Our Locations Section */}
      <OurLocations />

      {/* Newsletter Section */}
      <NewsletterSection />
    </>
  );
}
