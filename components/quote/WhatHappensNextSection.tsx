/**
 * What Happens Next Section
 * 3-step process cards showing the quote request flow
 */

"use client";

interface Step {
  number: string;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    number: "1",
    title: "Submit Form",
    description:
      "Your RFQ will be received and entered to our extensive part database",
  },
  {
    number: "2",
    title: "Review by Experts",
    description:
      "Your RFQ will be reviewed by our sales and technical team for accuracy, cost and lead times",
  },
  {
    number: "3",
    title: "Recieve Quote",
    description:
      "Our offer will be customized to meet the specifications of your RFQ, ensuring the most competitive pricing and optimal lead time.",
  },
];

export function WhatHappensNextSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-12 md:mb-16">
          What Happens Next?
        </h2>

        {/* Steps Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Background Image with Overlay */}
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{
              backgroundImage: "url(/images/quote/what-happens-bg.avif)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Pink Overlay */}
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: "#E4342D42",
              }}
            />

            {/* Steps Grid */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 p-8 md:p-12 lg:p-16">
              {STEPS.map((step, index) => (
                <div
                  key={index}
                  className="relative backdrop-blur-md bg-white/20 rounded-2xl p-6 md:p-8 border border-white/30 shadow-lg"
                >
                  {/* Step Number */}
                  <div className="text-6xl md:text-7xl font-bold text-white/90 mb-4">
                    {step.number}
                  </div>

                  {/* Step Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-white/90 text-sm md:text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
