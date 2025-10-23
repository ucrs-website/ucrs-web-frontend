/**
 * Explore Products Hero Section
 * Hero section with heading, subheading, and search bar
 */

'use client'

import { Search } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function ExploreProductsHero() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // TODO: Navigate to search results or filter products
      // For now, just log the search
      console.log('Searching for:', searchQuery)
      // Future: router.push(`/products/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
            Premium Locomotive Components
            <br />
            <span className="text-primary">Made to OEM Standards</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-10">
            Browse 5000+ Certified Parts for Locomotives, Freight Cars, and Coaches
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative flex items-center">
              <div className="absolute left-4 pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search in products"
                className="w-full pl-12 pr-4 py-3.5 md:py-4 text-base border-2 border-gray-200 rounded-l-lg focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="submit"
                className="px-6 md:px-8 py-3.5 md:py-4 bg-primary text-white font-semibold rounded-r-lg hover:bg-primary-hover transition-colors whitespace-nowrap"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
