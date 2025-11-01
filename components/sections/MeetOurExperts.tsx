"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

interface TeamMember {
  name: string;
  role: string;
  brief: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Sam Hosseini",
    role: "CEO",
    brief: "20+ years in rail engineering",
    image: "/images/about/team/sam-hosseini.avif",
  },
  {
    name: "Zahra Rafeyi",
    role: "CFO",
    brief: "A short Brief",
    image: "/images/about/team/zahra-rafeyi.avif",
  },
  {
    name: "Daniel Ahmady",
    role: "Design Engineer",
    brief: "A short Brief",
    image: "/images/about/team/daniel-ahmady.avif",
  },
  {
    name: "Alireza Moradian",
    role: "Software Engineer",
    brief: "Build & Improves technology systems",
    image: "/images/about/team/alireza-moradian.avif",
  },
  {
    name: "James Winkler",
    role: "Quality Technician",
    brief: "product and process quality Assurance",
    image: "/images/about/team/james-winkler.avif",
  },
];

function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="relative w-full h-[480px] overflow-hidden rounded-lg">
      {/* Background Image */}
      <Image
        src={member.image}
        alt={member.name}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 85vw, 300px"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />

      {/* Bottom Card */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="backdrop-blur-md bg-white/30 border-t border-white/30 px-6 py-6 flex flex-col gap-2.5">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h3 className="text-lg font-semibold text-white leading-tight">
              {member.name}
            </h3>
            <span className="bg-[#6e231b] px-2.5 py-1 rounded-lg text-sm font-normal text-white">
              {member.role}
            </span>
          </div>
          <p className="text-sm font-normal text-white leading-relaxed">
            {member.brief}
          </p>
        </div>
      </div>
    </div>
  );
}

export function MeetOurExperts() {
  // Mobile carousel with Embla
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

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
    <section className="w-full py-12 md:py-20 bg-white">
      <div className="container mx-auto px-6 max-w-[1280px]">
        <div className="flex flex-col gap-10 md:gap-16">
          {/* Heading */}
          <div className="flex items-center justify-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#252b42] text-center leading-tight">
              Meet our Experts
            </h2>
          </div>

          {/* Mobile: Carousel with 1.5 slides visible */}
          <div className="block md:hidden">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-4">
                {teamMembers.map((member, index) => (
                  <div key={index} className="flex-[0_0_85%] min-w-0">
                    <TeamMemberCard member={member} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop: Static Grid (no carousel) */}
          <div className="hidden md:flex md:flex-wrap md:justify-center md:gap-6 lg:gap-8">
            {teamMembers.slice(0, 3).map((member, index) => (
              <div
                key={index}
                className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-21.333px)]"
              >
                <TeamMemberCard member={member} />
              </div>
            ))}
            <div className="w-full hidden lg:block" />
            {teamMembers.slice(3).map((member, index) => (
              <div
                key={index + 3}
                className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-21.333px)]"
              >
                <TeamMemberCard member={member} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
