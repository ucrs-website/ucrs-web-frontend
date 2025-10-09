import React from 'react'
import { MapPin } from 'lucide-react'

export function OurLocations() {
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
                    Contact us
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

            {/* Right Column - Address */}
            <div className="flex-1 max-w-[560px]">
              <div className="flex gap-4">
                {/* Icon */}
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-primary rounded-lg md:rounded-[10px] flex items-center justify-center border-2 border-white/12 shadow-[0px_0px_0px_1px_inset_rgba(10,13,18,0.18),0px_-2px_0px_0px_inset_rgba(10,13,18,0.05)]">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>

                {/* Address Content */}
                <div className="flex-1 pt-1.5 md:pt-2.5">
                  <div className="flex flex-col gap-1 md:gap-2">
                    <h3 className="text-lg md:text-xl font-semibold text-[#181d27] leading-7 md:leading-[30px]">
                      Richmond Hill
                    </h3>
                    <p className="text-base font-normal text-[#535862] leading-6">
                      212-15 Werthheim Crt., Richmond Hill, ON L4B 3H7, Canada
                    </p>
                  </div>
                </div>
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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2876.5876884947246!2d-79.42244!3d43.8451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDUwJzQyLjQiTiA3OcKwMjUnMjAuOCJX!5e0!3m2!1sen!2sca!4v1234567890123"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="UCRS Location - Richmond Hill, Ontario"
            className="w-full h-full"
          />
        </div>
      </div>
    </section>
  )
}
