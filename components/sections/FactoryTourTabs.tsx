"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export function FactoryTourTabs() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const tabs = [
    {
      title: "Factory",
      image: "/images/factory-tour/tabs/factory-panorama1.webp",
    },
    {
      title: "Manufacturing Site",
      image: "/images/factory-tour/tabs/manufacturing-site1.webp",
    },
    {
      title: "Inspection Room",
      image: "/images/factory-tour/tabs/inspection-room1.webp",
    },
    {
      title: "Logistics",
      image: "/images/factory-tour/tabs/logistics1.webp",
    },
    {
      title: "Warehouse",
      image: "/images/factory-tour/tabs/warehouse1.webp",
    },
    {
      title: "Office",
      image: "/images/factory-tour/tabs/office1.webp",
    },
  ];

  const handleTabClick = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideToLoop(index);
    }
  };

  return (
    <section className="bg-[#f9fafb] py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="max-w-[1280px] mx-auto">
          {/* Custom Tabs List */}
          <div className="w-full h-auto mb-8 lg:mb-12 border-b border-gray-200 overflow-x-auto">
            <div className="flex gap-0 min-w-max md:justify-center">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => handleTabClick(index)}
                  className={`
                    flex-shrink-0 px-4 lg:px-6 py-3 lg:py-3.5 text-sm lg:text-base font-semibold
                    border-b-2 transition-colors whitespace-nowrap
                    ${
                      activeIndex === index
                        ? "border-[#e4342d] text-[#e4342d]"
                        : "border-transparent text-gray-600 hover:text-gray-900"
                    }
                  `}
                >
                  {tab.title}
                </button>
              ))}
            </div>
          </div>

          {/* Swiper Content */}
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.realIndex);
            }}
            modules={[Autoplay, Navigation]}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className="w-full"
          >
            {tabs.map((tab, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-[417px] lg:h-[480px] rounded-2xl overflow-hidden bg-gray-200">
                  <Image
                    src={tab.image}
                    alt={tab.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 1280px, 1280px"
                    priority={index === 0}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
