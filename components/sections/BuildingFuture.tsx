"use client";

import React from "react";
import Image from "next/image";

export function BuildingFuture() {
  const items = [
    {
      title: "New Parts & Assemblies",
      description:
        "Manufacturing and supplying rolling stock components that meets or surpasses OEM standards",
      image: "/images/factory-tour/factory-tour-1.webp",
    },
    {
      title: "Assembly Rebuild Solutions",
      description:
        "We rebuild locomotive assemblies on UTEX and Repair & Return basis, strictly adhering to OEM technical specifications.",
      image: "/images/factory-tour/factory-tour-2.webp",
    },
    {
      title: "Obsolescence Management",
      description:
        "Professional designing, prototyping, and manufacturing of components no longer produced by OEM",
      image: "/images/factory-tour/factory-tour-3.webp",
    },
  ];

  // Mobile content - different titles and descriptions
  const mobileItems = [
    {
      title: "Aerospace & Defense",
      description:
        "Manufacturing mission-critical components that meet the stringent tolerance and material demands of the aerospace and defense sectors.",
      image: "/images/factory-tour/factory-tour-1.webp",
    },
    {
      title: "Automotive",
      description:
        "Delivering high-volume, precision parts for the world's leading automotive manufacturers, from rapid prototypes to assembly line components.",
      image: "/images/factory-tour/factory-tour-2.webp",
    },
    {
      title: "Medical Devices",
      description:
        "Producing ultra-precise and reliable components for life-saving medical equipment, manufactured to meet the highest regulatory standards. Export to Sheets",
      image: "/images/factory-tour/factory-tour-3.webp",
    },
  ];

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="max-w-[1280px] mx-auto">
          {/* Header */}
          <div className="mb-12 lg:mb-16 text-center">
            <h2 className="text-3xl lg:text-[44px] font-semibold text-[#181d27] lg:leading-[52.8px] tracking-tight">
              Building a Greener Future
            </h2>
          </div>

          {/* Desktop Grid */}
          <div className="hidden lg:grid grid-cols-3 gap-6">
            {items.map((item, index) => (
              <div key={index} className="flex flex-col gap-4">
                {/* Image */}
                <div className="relative h-[480px] rounded-2xl overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>

                {/* Text Content Below Image */}
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-[#181d27] leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#181d27]/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Grid */}
          <div className="lg:hidden space-y-6">
            {mobileItems.map((item, index) => (
              <div key={index} className="flex flex-col gap-4">
                {/* Image */}
                <div className="relative h-[480px] rounded-2xl overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>

                {/* Text Content Below Image */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-[#181d27] leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#181d27]/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
