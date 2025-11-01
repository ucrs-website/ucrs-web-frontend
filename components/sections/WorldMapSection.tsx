"use client";

import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { countriesData, countryMap, getFlagEmoji } from "@/lib/data/countries";
import * as Flags from "country-flag-icons/react/3x2";
import { cn } from "@/lib/utils";
import { Plus, Minus } from "lucide-react";

// TopoJSON file for world map (included with react-simple-maps examples)
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface TooltipData {
  name: string;
  iso2: string;
  customers: number;
  x: number;
  y: number;
}

export function WorldMapSection() {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [zoom, setZoom] = useState(1);

  const handleMouseEnter = (geo: any) => (event: React.MouseEvent) => {
    const countryName = geo.properties.name;
    const country = countryMap.get(countryName);

    if (country) {
      setHoveredCountry(countryName);
      setTooltip({
        name: country.name,
        iso2: country.iso2,
        customers: country.customers,
        x: event.clientX,
        y: event.clientY,
      });
    }
  };

  const handleMouseMove = (geo: any) => (event: React.MouseEvent) => {
    const countryName = geo.properties.name;
    const country = countryMap.get(countryName);

    if (country && hoveredCountry === countryName) {
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

  const handleMouseLeave = () => {
    setHoveredCountry(null);
    setTooltip(null);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.5, 1));
  };

  return (
    <section className="relative w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-wide text-primary">
            We are world-wide
          </p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Export to {countriesData.length} countries in 6 continents
          </h2>
          <p className="text-lg text-muted-foreground">
            +60 years combined experience in the filed with +200 Customers
          </p>
        </div>

        {/* Map Container */}
        <div className="relative mx-auto max-w-7xl">
          {/* Zoom Controls - Desktop Only */}
          {/*<div className="absolute right-4 bottom-[-70px] lg:top-8 z-10 flex-col gap-2 md:flex">
            <button
              onClick={handleZoomIn}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-lg transition-all hover:bg-gray-50 disabled:opacity-50"
              disabled={zoom >= 4}
              aria-label="Zoom in"
            >
              <Plus className="h-5 w-5" />
            </button>
            <button
              onClick={handleZoomOut}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-lg transition-all hover:bg-gray-50 disabled:opacity-50"
              disabled={zoom <= 1}
              aria-label="Zoom out"
            >
              <Minus className="h-5 w-5" />
            </button>
          </div>*/}

          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 147,
            }}
            className="w-full"
            style={{ width: "100%", height: "auto" }}
            height={500}
          >
            <ZoomableGroup
              center={[0, 20]}
              zoom={zoom}
              onMoveEnd={({ zoom: newZoom }: { zoom: number }) =>
                setZoom(newZoom)
              }
              minZoom={1}
              maxZoom={1}
              filterZoomEvent={(evt: any) => {
                // Disable scroll zoom on desktop
                if (evt.type === "wheel") {
                  return false;
                }
                // Allow touch events for mobile pinch-to-zoom
                return (
                  evt.type === "touchstart" ||
                  evt.type === "touchmove" ||
                  evt.type === "touchend"
                );
              }}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }: { geographies: Array<any> }) =>
                  geographies.map((geo) => {
                    const countryName = geo.properties.name;
                    const country = countryMap.get(countryName);
                    const isCustomerCountry = !!country;
                    const isHovered = hoveredCountry === countryName;

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onMouseEnter={handleMouseEnter(geo)}
                        onMouseMove={handleMouseMove(geo)}
                        onMouseLeave={handleMouseLeave}
                        style={{
                          default: {
                            fill: isCustomerCountry ? "gray" : "#E5E7EB",
                            fillOpacity: isCustomerCountry ? 0.7 : 0.9,
                            stroke: "#FFFFFF",
                            strokeWidth: 0.5,
                            outline: "none",
                          },
                          hover: {
                            fill: isCustomerCountry ? "gray" : "#E5E7EB",
                            fillOpacity: isCustomerCountry ? 1 : 0.5,
                            stroke: "#FFFFFF",
                            strokeWidth: 0.75,
                            outline: "none",
                            cursor: isCustomerCountry ? "pointer" : "default",
                          },
                          pressed: {
                            fill: isCustomerCountry ? "gray" : "#E5E7EB",
                            fillOpacity: isCustomerCountry ? 1 : 0.5,
                            stroke: "#FFFFFF",
                            strokeWidth: 0.75,
                            outline: "none",
                          },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>

          {/* Tooltip/Popover */}
          {tooltip && (
            <div
              className={cn(
                "pointer-events-none fixed z-50 rounded-lg bg-white px-4 py-3 shadow-lg",
                "border border-gray-200",
                "transform -translate-x-1/2 -translate-y-full",
                "transition-opacity duration-200",
              )}
              style={{
                left: tooltip.x,
                top: tooltip.y - 10,
              }}
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
                        {getFlagEmoji(tooltip.iso2)}
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
      </div>
    </section>
  );
}
