'use client'

import { useState } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps'
import { capitalCoordinates } from '@/lib/data/country-capitals'
import * as Flags from 'country-flag-icons/react/3x2'
import { cn } from '@/lib/utils'

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

interface TooltipData {
  name: string
  iso2: string
  capital: string
  customers: number
  x: number
  y: number
}

interface ContactInfo {
  label: string
  description: string
  value: string
  href?: string
}

const contactInfoData: ContactInfo[] = [
  {
    label: 'Support',
    description: 'Our friendly team is here to help.',
    value: 'support@ucrs.com',
    href: 'mailto:support@ucrs.com',
  },
  {
    label: 'Sales',
    description: 'Questions or queries? Get in touch!',
    value: 'sales@ucrs.com',
    href: 'mailto:sales@ucrs.com',
  },
  {
    label: 'Fax',
    description: 'Give us your quoete',
    value: '289-597-8278',
    href: 'tel:+12895978278',
  },
  {
    label: 'Phone',
    description: "24/7 we're ready to service you",
    value: '289-597-UCRS (8277)',
    href: 'tel:+12895978277',
  },
]

export function WorldMapAbout() {
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null)
  const [tooltip, setTooltip] = useState<TooltipData | null>(null)
  const [zoom] = useState(1)

  const handleMarkerMouseEnter =
    (capital: typeof capitalCoordinates[0]) => (event: React.MouseEvent) => {
      setHoveredMarker(capital.iso2)
      setTooltip({
        name: capital.name,
        iso2: capital.iso2,
        capital: capital.capital,
        customers: capital.customers,
        x: event.clientX,
        y: event.clientY,
      })
    }

  const handleMarkerMouseMove =
    (capital: typeof capitalCoordinates[0]) => (event: React.MouseEvent) => {
      if (hoveredMarker === capital.iso2) {
        setTooltip((prev) =>
          prev
            ? {
                ...prev,
                x: event.clientX,
                y: event.clientY,
              }
            : null
        )
      }
    }

  const handleMarkerMouseLeave = () => {
    setHoveredMarker(null)
    setTooltip(null)
  }

  return (
    <section className="relative w-full bg-white py-6 md:py-24">
      <div className="container mx-auto px-8 max-w-[1280px]">
        {/* Header */}
        <div className="flex items-center justify-center p-2.5 overflow-hidden mb-8 md:mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#252b42] text-center leading-tight">
            Serving Railroad World Wide
          </h2>
        </div>

        {/* Map Container */}
        <div className="relative mx-auto max-w-[1024px] mb-12 md:mb-16">
          <ComposableMap
            projectionConfig={{
              scale: 147,
            }}
            className="w-full"
            style={{ width: '100%', height: 'auto' }}
          >
            <ZoomableGroup
              center={[0, 20]}
              zoom={zoom}
              filterZoomEvent={(evt: any) => {
                // Disable scroll zoom
                if (evt.type === 'wheel') {
                  return false
                }
                // Disable all zoom events for simplicity
                return false
              }}
            >
              {/* Geographies with dotted/light gray fill */}
              <Geographies geography={geoUrl}>
                {({ geographies }: { geographies: Array<any> }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default: {
                          fill: '#D5D7DA',
                          fillOpacity: 0.3,
                          stroke: '#D5D7DA',
                          strokeWidth: 0,
                          outline: 'none',
                        },
                        hover: {
                          fill: '#D5D7DA',
                          fillOpacity: 0.3,
                          stroke: '#D5D7DA',
                          strokeWidth: 0.5,
                          outline: 'none',
                        },
                        pressed: {
                          fill: '#D5D7DA',
                          fillOpacity: 0.3,
                          stroke: '#D5D7DA',
                          strokeWidth: 0.5,
                          outline: 'none',
                        },
                      }}
                    />
                  ))
                }
              </Geographies>

              {/* Markers for capitals with ripple pulse animation */}
              {capitalCoordinates.map((capital) => (
                <Marker
                  key={capital.iso2}
                  coordinates={capital.coordinates}
                  onMouseEnter={handleMarkerMouseEnter(capital)}
                  onMouseMove={handleMarkerMouseMove(capital)}
                  onMouseLeave={handleMarkerMouseLeave}
                >
                  <g className="marker-group">
                    {/* Pulsing Ring 1 - starts from small and expands */}
                    <circle
                      r={4}
                      fill="none"
                      stroke="#0052FF"
                      strokeWidth={2}
                      className="animate-ripple-pulse"
                      style={{
                        animationDelay: '0s',
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
                        animationDelay: '1s',
                      }}
                    />
                    {/* Inner Circle (solid dot) */}
                    <circle
                      r={4}
                      fill="#0052FF"
                      className="cursor-pointer"
                    />
                  </g>
                </Marker>
              ))}
            </ZoomableGroup>
          </ComposableMap>

          {/* Tooltip/Popover */}
          {tooltip && (
            <div
              className={cn(
                'pointer-events-none fixed z-50 rounded-lg bg-white px-4 py-3 shadow-xl',
                'border border-gray-200',
                'transform -translate-x-1/2 -translate-y-full',
                'transition-opacity duration-200'
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
                    const FlagComponent = Flags[tooltip.iso2 as keyof typeof Flags]
                    return FlagComponent ? (
                      <FlagComponent className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-2xl">
                        {tooltip.iso2
                          .toUpperCase()
                          .split('')
                          .map((char) =>
                            String.fromCodePoint(127397 + char.charCodeAt(0))
                          )
                          .join('')}
                      </span>
                    )
                  })()}
                </div>

                {/* Country Info */}
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-900">{tooltip.name}</span>
                  <span className="text-sm text-gray-600">
                    +{tooltip.customers} compan
                    {tooltip.customers === 1 ? 'y' : 'ies'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Contact Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-8">
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
        </div>
      </div>

      <style jsx>{`
        @keyframes ripple-pulse {
          0% {
            r: 4px;
            opacity: 1;
          }
          100% {
            r: 20px;
            opacity: 0;
          }
        }

        :global(.animate-ripple-pulse) {
          animation: ripple-pulse 2s ease-out infinite;
        }
      `}</style>
    </section>
  )
}
