"use client";

import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { capitalCoordinates } from "@/lib/data/country-capitals";
import * as Flags from "country-flag-icons/react/3x2";
import { cn } from "@/lib/utils";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface TooltipData {
  name: string;
  iso2: string;
  capital: string;
  customers: number;
  x: number;
  y: number;
}

interface ContactInfo {
  label: string;
  description: string;
  value: string;
  href?: string;
}

const contactInfoData: ContactInfo[] = [
  {
    label: "Sales",
    description: "Questions or queries? Get in touch!",
    value: "sales@ucrs.com",
    href: "mailto:sales@ucrs.com",
  },
  {
    label: "Customer Support",
    description: "Track your order in real time",
    value: "commercial@ucrs.com",
    href: "mailto:commercial@ucrs.com",
  },
  {
    label: "Technical Support",
    description: "Our friendly team is here to help.",
    value: "support@ucrs.com",
    href: "mailto:support@ucrs.com",
  },
  {
    label: "Phone",
    description: "We're ready to service you",
    value: "289-597-UCRS (8277)",
    href: "tel:+12895978277",
  },
];

export function WorldMapAbout() {
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [zoom] = useState(1);

  const handleMarkerMouseEnter =
    (capital: (typeof capitalCoordinates)[0]) => (event: React.MouseEvent) => {
      setHoveredMarker(capital.iso2);
      setTooltip({
        name: capital.name,
        iso2: capital.iso2,
        capital: capital.capital,
        customers: capital.customers,
        x: event.clientX,
        y: event.clientY,
      });
    };

  const handleMarkerMouseMove =
    (capital: (typeof capitalCoordinates)[0]) => (event: React.MouseEvent) => {
      if (hoveredMarker === capital.iso2) {
        setTooltip((prev) =>
          prev
            ? {
                ...prev,
                x: event.clientX,
                y: event.clientY,
              }
            : null,
        );
      }
    };

  const handleMarkerMouseLeave = () => {
    setHoveredMarker(null);
    setTooltip(null);
  };

  return (
    <section className="relative w-full bg-white py-6 md:py-24 md:mb-[-100px]">
      <div className="container mx-auto px-8 max-w-[1280px]">
        {/* Header */}
        <div className="flex items-center justify-center p-2.5 overflow-hidden mb-8 md:mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-[#252b42] text-center leading-tight">
            Serving Railroad World Wide
          </h2>
        </div>

        {/* Map Container */}
        <div className="relative mx-auto max-w-[1024px] mb-12 md:mb-16">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 147,
              center: [0, 20],
            }}
            className="w-full"
            style={{ width: "100%", height: "auto" }}
            height={500}
          >
            <defs>
              {/* Dotted pattern for country fills */}
              <pattern
                id="dot-pattern"
                x="0"
                y="0"
                width="3"
                height="3"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="1" cy="1" r="0.9" fill="#D5D7DA" opacity="1" />
              </pattern>
            </defs>
            <ZoomableGroup
              center={[0, 20]}
              zoom={zoom}
              minZoom={1}
              maxZoom={1}
              filterZoomEvent={(evt: any) => {
                // Disable scroll zoom
                if (evt.type === "wheel") {
                  return false;
                }
                // Disable all zoom events for simplicity
                return false;
              }}
            >
              {/* Geographies with dotted pattern fill */}
              <Geographies geography={geoUrl}>
                {({ geographies }: { geographies: Array<any> }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default: {
                          fill: "url(#dot-pattern)",
                          stroke: "none",
                          strokeWidth: 0,
                          outline: "none",
                        },
                        hover: {
                          fill: "url(#dot-pattern)",
                          stroke: "none",
                          strokeWidth: 0,
                          outline: "none",
                        },
                        pressed: {
                          fill: "url(#dot-pattern)",
                          stroke: "none",
                          strokeWidth: 0,
                          outline: "none",
                        },
                      }}
                    />
                  ))
                }
              </Geographies>

              {/* Markers for capitals with conditional ripple pulse animation */}
              {capitalCoordinates.map((capital) => (
                <Marker
                  key={capital.iso2}
                  coordinates={capital.coordinates}
                  onMouseEnter={handleMarkerMouseEnter(capital)}
                  onMouseMove={handleMarkerMouseMove(capital)}
                  onMouseLeave={handleMarkerMouseLeave}
                >
                  <g className="marker-group">
                    {/* Pulsing Ring 1 - only shows on hover */}
                    {hoveredMarker === capital.iso2 && (
                      <>
                        <circle
                          r={4}
                          fill="none"
                          stroke="#0052FF"
                          strokeWidth={2}
                          className="animate-ripple-pulse"
                          style={{
                            animationDelay: "0s",
                          }}
                        />
                        {/* Pulsing Ring 2 - delayed for continuous effect */}
                        <circle
                          r={4}
                          fill="none"
                          stroke="#0052FF"
                          strokeWidth={2}
                          className="animate-ripple-pulse"
                          style={{
                            animationDelay: "1s",
                          }}
                        />
                      </>
                    )}
                    {/* Inner Circle (solid dot) */}
                    <circle r={4} fill="#0052FF" className="cursor-pointer" />
                  </g>
                </Marker>
              ))}
            </ZoomableGroup>
          </ComposableMap>

          {/* Tooltip/Popover */}
          {tooltip && (
            <div
              className={cn(
                "pointer-events-auto fixed z-50 rounded-lg bg-white px-4 py-3 shadow-xl",
                "border border-gray-200",
                "transform -translate-x-1/2 -translate-y-full",
                "transition-opacity duration-200",
              )}
              style={{
                left: tooltip.x,
                top: tooltip.y - 10,
              }}
              onMouseEnter={() => setHoveredMarker(tooltip.iso2)}
              onMouseLeave={handleMarkerMouseLeave}
            >
              <div className="flex items-center gap-3">
                {/* Flag Icon */}
                <div className="flex h-8 w-12 items-center justify-center overflow-hidden rounded">
                  {(() => {
                    const FlagComponent =
                      Flags[tooltip.iso2 as keyof typeof Flags];
                    return FlagComponent ? (
                      <FlagComponent className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-2xl">
                        {tooltip.iso2
                          .toUpperCase()
                          .split("")
                          .map((char) =>
                            String.fromCodePoint(127397 + char.charCodeAt(0)),
                          )
                          .join("")}
                      </span>
                    );
                  })()}
                </div>

                {/* Country Info */}
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-900">
                    {tooltip.name}
                  </span>
                  <span className="text-sm text-gray-600">
                    +{tooltip.customers} compan
                    {tooltip.customers === 1 ? "y" : "ies"}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Contact Information Section */}
        {/*<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-8">
          {contactInfoData.map((contact, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center gap-5"
            >
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold text-[#181d27] leading-[30px]">
                  {contact.label}
                </h3>
                <p className="text-base font-normal text-[#535862] leading-6">
                  {contact.description}
                </p>
              </div>
              {contact.href ? (
                <a
                  href={contact.href}
                  className="text-sm font-semibold text-[#023fc1] hover:underline transition-all leading-5"
                >
                  {contact.value}
                </a>
              ) : (
                <p className="text-sm font-semibold text-[#023fc1] leading-5">
                  {contact.value}
                </p>
              )}
            </div>
          ))}
        </div>*/}
      </div>
    </section>
  );
}
