/**
 * Products CTA Section
 * Call-to-action section with branding and action buttons
 */

import Link from 'next/link'
import Image from 'next/image'

export function ProductsCTA() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-32 h-12 relative">
              <Image
                src="/logo.png"
                alt="UCRS Logo"
                fill
                className="object-contain"
                sizes="128px"
              />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your Partner in Rolling Stock Maintenance
          </h2>

          {/* Subheading */}
          <p className="text-lg text-gray-600 mb-10">
            Be part of the growth journey alongside UCRS and industry leaders
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/factory-tour"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-900 hover:text-white transition-colors min-w-[200px]"
            >
              Factory Tour
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover transition-colors min-w-[200px]"
            >
              Explore products
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
