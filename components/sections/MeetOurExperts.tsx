"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  brief: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Sam Hosseini",
    role: "CTO",
    brief: "20+ years in rail engineering",
    image: "/images/about/team/sam-hosseini.avif",
  },
  {
    name: "Zahra Rafeyi",
    role: "CFO",
    brief: "Financial strategist with a focus on growth",
    image: "/images/about/team/zahra-rafeyi.avif",
  },
  {
    name: "Daniel Ahmady",
    role: "Design Engineer",
    brief: "Innovation and quality leader",
    image: "/images/about/team/daniel-ahmady.avif",
  },
];

export function MeetOurExperts() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 1024px)": { slidesToScroll: 1 },
    },
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="w-full py-6 md:py-24 bg-white">
      <div className="container mx-auto px-8 max-w-[1280px]">
        <div className="flex flex-col gap-8 items-center">
          {/* Heading */}
          <div className="flex items-center justify-center p-2.5 overflow-hidden">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#252b42] text-center leading-tight whitespace-nowrap">
              Meet our Experts
            </h2>
          </div>

          {/* Carousel Container */}
          <div className="w-full relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-8">
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className="relative flex-[0_0_80%] lg:flex-[0_0_calc(33.333%-21.333px)] h-[480px] overflow-hidden"
                  >
                    {/* Background Image */}
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 80vw, 33vw"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />

                    {/* Bottom Card */}
                    <div className="absolute bottom-0 left-0 right-0 pt-24">
                      <div className="backdrop-blur-md bg-white/30 border-t border-white/30 px-6 py-5 pb-8 flex flex-col gap-6 w-full">
                        <div className="flex flex-col gap-3 w-full">
                          <div className="flex flex-col gap-1 w-full">
                            <div className="flex items-center gap-2.5 w-full">
                              <div className="text-lg font-semibold text-white leading-7">
                                {member.name}
                              </div>
                              <div className="bg-[#6e231b] px-2.5 rounded-lg py-1 text-base font-light text-white">
                                {member.role}
                              </div>
                            </div>
                            <p className="text-base font-normal text-white leading-6">
                              {member.brief}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows - Desktop only */}
            <div className="hidden lg:flex gap-8 mt-8">
              <button
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                className="flex items-center justify-center w-14 h-14 rounded-full border border-[#e9eaeb] bg-white transition-colors hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6 text-[#717680]" />
              </button>
              <button
                onClick={scrollNext}
                disabled={!canScrollNext}
                className="flex items-center justify-center w-14 h-14 rounded-full border border-[#e9eaeb] bg-white transition-colors hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6 text-[#717680]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
