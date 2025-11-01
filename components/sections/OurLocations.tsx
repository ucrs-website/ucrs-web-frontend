"use client";

import React, { useState } from "react";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface Location {
  id: string;
  name: string;
  address: string;
  mapUrl: string;
}

const locations: Location[] = [
  {
    id: "richmond-hill",
    name: "Richmond Hill, ON",
    address: "15 Wertheim Crt., Unit 212, Richmond Hill, ON, Canada L4B 3H7",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2877.547707271124!2d-79.38788388686599!3d43.84447527097284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b2b4be5f10ad7%3A0x62211a19811fc026!2s15%20Wertheim%20Ct%20%23212%2C%20Richmond%20Hill%2C%20ON%20L4B%203H7%2C%20Canada!5e0!3m2!1sen!2s!4v1762004591973!5m2!1sen!2s",
  },
  {
    id: "welland",
    name: "Welland, ON",
    address: "361 Enterprise Drive, Welland, ON, Canada L3B 6H8",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2919.063762129952!2d-79.2058194868919!3d42.976930471021866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d34800d70abfeb%3A0x35779fa868933039!2s361%20Enterprise%20Dr%2C%20Welland%2C%20ON%20L3B%206H8%2C%20Canada!5e0!3m2!1sen!2s!4v1762004714593!5m2!1sen!2s",
  },
];

export function OurLocations() {
  const [selectedLocation, setSelectedLocation] = useState<string>(
    locations[0].id,
  );

  const activeLocation =
    locations.find((loc) => loc.id === selectedLocation) || locations[0];

  return (
    <section className="w-full bg-white">
      {/* Top Section with Content */}
      <div className="bg-[#fafafa] pb-24 md:pb-40 pt-12 md:pt-24">
        <div className="container mx-auto px-4 md:px-8 max-w-[1280px]">
          <div className="flex flex-col lg:flex-row gap-12 md:gap-16">
            {/* Left Column - Heading */}
            <div className="flex-1 max-w-[768px]">
              <div className="flex flex-col gap-3 md:gap-5">
                <div className="flex flex-col gap-3">
                  <p className="text-sm md:text-base font-semibold text-[#023fc1] leading-5 md:leading-6">
                    Select to route:
                  </p>
                  <h2 className="text-3xl md:text-4xl font-semibold text-[#181d27] leading-[38px] md:leading-[44px] tracking-[-0.02em]">
                    Our locations
                  </h2>
                </div>
                <p className="text-lg md:text-xl font-normal text-[#535862] leading-7 md:leading-[30px]">
                  Come visit our friendly team at one of our offices.
                </p>
              </div>
            </div>

            {/* Right Column - Addresses */}
            <div className="flex-1 max-w-[560px]">
              <div className="flex flex-col gap-4">
                {locations.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => setSelectedLocation(location.id)}
                    className={cn(
                      "flex gap-4 p-4 rounded-xl transition-all duration-200 text-left",
                      "hover:bg-white/60 focus:outline-none focus:ring-2 focus:ring-primary/20",
                      selectedLocation === location.id
                        ? "bg-white shadow-[0px_1px_3px_rgba(16,24,40,0.1),0px_1px_2px_rgba(16,24,40,0.06)]"
                        : "bg-transparent",
                    )}
                  >
                    {/* Icon */}
                    <div
                      className={cn(
                        "flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-[10px] flex items-center justify-center border-2 border-white/12 shadow-[0px_0px_0px_1px_inset_rgba(10,13,18,0.18),0px_-2px_0px_0px_inset_rgba(10,13,18,0.05)] transition-colors duration-200",
                        selectedLocation === location.id
                          ? "bg-primary"
                          : "bg-primary/70",
                      )}
                    >
                      <MapPin className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>

                    {/* Address Content */}
                    <div className="flex-1 pt-1.5 md:pt-2.5">
                      <div className="flex flex-col gap-1 md:gap-2">
                        <h3 className="text-lg md:text-xl font-semibold text-[#181d27] leading-7 md:leading-[30px]">
                          {location.name}
                        </h3>
                        <p className="text-base font-normal text-[#535862] leading-6">
                          {location.address}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="container mx-auto px-4 md:px-8 max-w-[1280px] -mt-16 md:-mt-24">
        <div className="w-full h-60 md:h-[516px] bg-white overflow-hidden">
          {/* Google Maps Embed Container */}
          <iframe
            key={selectedLocation}
            src={activeLocation.mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`UCRS Location - ${activeLocation.name}`}
            className="w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}
