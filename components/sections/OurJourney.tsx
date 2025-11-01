"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface JourneyItem {
  year: string;
  description: string;
  image: string;
}

const journeyData: JourneyItem[] = [
  {
    year: "2001",
    description:
      "Journey to Excellence started: Company restructured with focus on manufacturing",
    image: "/images/about/year2001.avif",
  },
  {
    year: "2014",
    description: "Corporate Reorganization",
    image: "/images/about/year2014.avif",
  },
  {
    year: "2018",
    description: "Manufacturing Startup Allanburg, ON",
    image: "/images/about/year2018.avif",
  },
  {
    year: "2019",
    description: "Construction started in Welland, ON",
    image: "/images/about/year2019.avif",
  },
  {
    year: "2021",
    description: "AAR-M1003 Certification",
    image: "/images/about/year2021.avif",
  },
  {
    year: "2022",
    description: "Operation moved to Welland, ON",
    image: "/images/about/year2022.avif",
  },
];

export function OurJourney() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % journeyData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-white w-full pt-12 lg:pt-24 pb-12 lg:pb-12">
      <div className="container mx-auto px-8 max-w-[1280px]">
        <div className="flex flex-col gap-14">
          {/* Heading */}
          <div className="px-0">
            <h2 className="text-4xl lg:text-5xl text-center lg:text-left font-bold text-[#181d27] leading-tight">
              Our <span className="text-[#2a5d92]">Journey</span>
            </h2>
          </div>

          {/* Content Grid */}
          <div className="flex flex-col md:flex-row gap-16 items-start">
            {/* Timeline Items - Left */}
            <div className="flex flex-col w-full md:max-w-[560px]">
              {journeyData.map((item, index) => (
                <button
                  key={item.year}
                  onClick={() => setSelectedIndex(index)}
                  className={`
                    w-full text-left pl-6 pr-0 py-4
                    border-l-4 transition-colors
                    ${
                      selectedIndex === index
                        ? "border-[#0052ff]"
                        : "border-[#f5f5f5]"
                    }
                  `}
                >
                  <div className="flex flex-col gap-2">
                    <p className="text-[20px] font-semibold text-[#181d27] leading-[30px]">
                      {item.year}
                    </p>
                    <p className="text-[16px] font-normal text-[#535862] leading-[24px]">
                      {item.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Image - Right */}
            <div className="relative w-full md:w-[560px] h-[560px] rounded-[24px] shadow-[2px_4px_15.9px_0px_rgba(0,0,0,0.25)] overflow-hidden flex-shrink-0">
              <Image
                src={journeyData[selectedIndex].image}
                alt={`Journey milestone ${journeyData[selectedIndex].year}`}
                fill
                className="object-cover"
                sizes="560px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
