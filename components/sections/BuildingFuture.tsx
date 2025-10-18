"use client";

import React from "react";
import Image from "next/image";
import { Rocket, Settings, Zap } from "lucide-react";

export function BuildingFuture() {
  const items = [
    {
      icon: Rocket,
      title: "New Parts & Assemblies",
      description:
        "Manufacturing and supplying rolling stock components that meets or surpasses OEM standards",
      image: "/images/factory-tour/greener-1.avif",
    },
    {
      icon: Settings,
      title: "Assembly Rebuild Solutions",
      description:
        "We rebuild locomotive assemblies on UTEX and Repair & Return basis, strictly adhering to OEM technical specifications.",
      image: "/images/factory-tour/greener-2.avif",
    },
    {
      icon: Zap,
      title: "Obsolescence Management",
      description:
        "Professional designing, prototyping, and manufacturing of components no longer produced by OEM",
      image: "/images/factory-tour/greener-3.avif",
    },
  ];

  // Mobile content - different titles and descriptions
  const mobileItems = [
    {
      icon: Rocket,
      title: "Aerospace & Defense",
      description:
        "Manufacturing mission-critical components that meet the stringent tolerance and material demands of the aerospace and defense sectors.",
      image: "/images/factory-tour/greener-1.avif",
    },
    {
      icon: Settings,
      title: "Automotive",
      description:
        "Delivering high-volume, precision parts for the world's leading automotive manufacturers, from rapid prototypes to assembly line components.",
      image: "/images/factory-tour/greener-2.avif",
    },
    {
      icon: Zap,
      title: "Medical Devices",
      description:
        "Producing ultra-precise and reliable components for life-saving medical equipment, manufactured to meet the highest regulatory standards. Export to Sheets",
      image: "/images/factory-tour/greener-3.avif",
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
            {items.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="relative h-[480px] rounded-2xl overflow-hidden group"
                >
                  {/* Background Image */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-end p-8">
                    {/* Text Content with Icon */}
                    <div className="space-y-4 backdrop-blur-md bg-gray-600/50 rounded-2xl p-6">
                      {/* Icon inside the container */}
                      <div className="w-12 h-12 flex items-center justify-start">
                        <Icon />
                      </div>

                      <h3 className="text-xl font-semibold text-white leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-sm text-white/90 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Grid */}
          <div className="lg:hidden space-y-6">
            {mobileItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="relative h-[480px] rounded-2xl overflow-hidden"
                >
                  {/* Background Image */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-end p-6">
                    {/* Text Content with Icon */}
                    <div className="space-y-4 backdrop-blur-md bg-gray-600/50 rounded-2xl p-5">
                      {/* Icon inside the container */}
                      <div className="w-10 h-10 flex items-center justify-start">
                        <Icon />
                      </div>

                      <h3 className="text-lg font-semibold text-white leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-sm text-white/90 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
