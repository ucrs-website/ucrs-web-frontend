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
import { Mail, Phone } from 'lucide-react'

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
  icon: React.ReactNode
  label: string
  value: string
  href?: string
}

const contactInfoData: ContactInfo[] = [
  {
    icon: <Mail className="w-5 h-5" />,
    label: 'Support',
    value: 'sales@ucrs.com',
    href: 'mailto:sales@ucrs.com',
  },
  {
    icon: <Mail className="w-5 h-5" />,
    label: 'Sales',
    value: 'sales@ucrs.com',
    href: 'mailto:sales@ucrs.com',
  },
  {
    icon: <Mail className="w-5 h-5" />,
    label: 'PR',
    value: 'sales@ucrs.com',
    href: 'mailto:sales@ucrs.com',
  },
  {
    icon: <Phone className="w-5 h-5" />,
    label: 'Phone',
    value: '289-597-8277',
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
        <div className="flex items-center justify-center p-2.5 overflow-hidden mb-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#252b42] text-center leading-tight">
            Serving Railroad World Wide
          </h2>
        </div>

        {/* Map Container */}
        <div className="relative mx-auto max-w-7xl mb-12">
          <ComposableMap
            projectionConfig={{
              scale: 147,
            }}
            className="w-full"
            style={{ width: '100%', height: 'auto' }}
          >
            <ZoomableGroup center={[0, 20]} zoom={zoom}>
              {/* Geographies with no visible borders */}
              <Geographies geography={geoUrl}>
                {({ geographies }: { geographies: Array<any> }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default: {
                          fill: '#FFFFFF',
                          stroke: '#FFFFFF',
                          strokeWidth: 0.5,
                          outline: 'none',
                        },
                        hover: {
                          fill: '#FFFFFF',
                          stroke: '#FFFFFF',
                          strokeWidth: 0.5,
                          outline: 'none',
                        },
                        pressed: {
                          fill: '#FFFFFF',
                          stroke: '#FFFFFF',
                          strokeWidth: 0.5,
                          outline: 'none',
                        },
                      }}
                    />
                  ))
                }
              </Geographies>

              {/* Markers for capitals with bouncing animation */}
              {capitalCoordinates.map((capital) => (
                <Marker
                  key={capital.iso2}
                  coordinates={capital.coordinates}
                  onMouseEnter={handleMarkerMouseEnter(capital)}
                  onMouseMove={handleMarkerMouseMove(capital)}
                  onMouseLeave={handleMarkerMouseLeave}
                >
                  <g className="marker-group">
                    {/* Bouncing Circle Marker */}
                    <circle
                      r={6}
                      fill="#C0222B"
                      stroke="#FFFFFF"
                      strokeWidth={2}
                      className={cn(
                        'cursor-pointer transition-all',
                        hoveredMarker === capital.iso2
                          ? 'animate-bounce-slow'
                          : 'animate-bounce-subtle'
                      )}
                      style={{
                        filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25))',
                      }}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {contactInfoData.map((contact, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center gap-3 p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                {contact.icon}
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                  {contact.label}
                </p>
                {contact.href ? (
                  <a
                    href={contact.href}
                    className="text-base font-normal text-gray-600 hover:text-primary transition-colors"
                  >
                    {contact.value}
                  </a>
                ) : (
                  <p className="text-base font-normal text-gray-600">{contact.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-subtle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-6px) scale(1.2);
          }
        }

        :global(.animate-bounce-subtle) {
          animation: bounce-subtle 3s ease-in-out infinite;
        }

        :global(.animate-bounce-slow) {
          animation: bounce-slow 0.6s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
