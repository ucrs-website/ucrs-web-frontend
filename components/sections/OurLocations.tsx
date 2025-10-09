import React from 'react'
import { MapPin } from 'lucide-react'

export function OurLocations() {
  const address = {
    company: 'Upper Canada Railway Services',
    building: 'Park Place Corporate Centre',
    street: '212-15 Werthheim Crt.',
    city: 'Richmond Hill',
    province: 'ON',
    country: 'Canada',
    postalCode: 'L4B 3H7',
  }

  const fullAddress = `${address.street}, ${address.city}, ${address.province} ${address.postalCode}, ${address.country}`

  return (
    <section className="w-full py-6 md:py-24 bg-white">
      <div className="container mx-auto px-8 max-w-[1280px]">
        <div className="flex flex-col gap-8 items-center">
          {/* Header */}
          <div className="flex items-center justify-center p-2.5 overflow-hidden">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#252b42] text-center leading-tight">
              Our locations
            </h2>
          </div>

          {/* Subtitle */}
          <p className="text-lg text-[#737373] text-center max-w-2xl">
            Visit our headquarters in Richmond Hill, Ontario
          </p>

          {/* Map Container */}
          <div className="w-full max-w-5xl">
            <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden shadow-lg border border-gray-200">
              {/* Google Maps Embed Container */}
              {/* TODO: Replace the src with your actual Google Maps embed URL */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2876.5876884947246!2d-79.42244!3d43.8451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDUwJzQyLjQiTiA3OcKwMjUnMjAuOCJX!5e0!3m2!1sen!2sca!4v1234567890123"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="UCRS Location Map"
                className="absolute inset-0"
              />
            </div>
          </div>

          {/* Address Card */}
          <div className="w-full max-w-2xl">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 shadow-md border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-[#252b42] mb-3">
                    Headquarters
                  </h3>
                  <div className="space-y-1 text-[#737373]">
                    <p className="font-medium text-gray-900">{address.company}</p>
                    <p>{address.building}</p>
                    <p>{address.street}</p>
                    <p>
                      {address.city}, {address.province} {address.postalCode}
                    </p>
                    <p>{address.country}</p>
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      fullAddress
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    <MapPin className="w-4 h-4" />
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
