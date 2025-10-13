'use client'

import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function FactoryTourTabs() {
  return (
    <section className="bg-[#f9fafb] py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="max-w-[1280px] mx-auto">
          <Tabs defaultValue="train" className="w-full">
            {/* Tabs List */}
            <TabsList className="w-full lg:w-auto h-auto p-0 bg-transparent gap-0 mb-8 lg:mb-12 border-b border-gray-200">
              <TabsTrigger
                value="train"
                className="flex-1 lg:flex-none px-4 lg:px-6 py-3 lg:py-3.5 text-sm lg:text-base font-semibold rounded-none border-b-2 border-transparent data-[state=active]:border-[#e4342d] data-[state=active]:text-[#e4342d] data-[state=active]:bg-transparent data-[state=active]:shadow-none text-gray-600 hover:text-gray-900 transition-colors"
              >
                Shot - Train
              </TabsTrigger>
              <TabsTrigger
                value="factory"
                className="flex-1 lg:flex-none px-4 lg:px-6 py-3 lg:py-3.5 text-sm lg:text-base font-semibold rounded-none border-b-2 border-transparent data-[state=active]:border-[#e4342d] data-[state=active]:text-[#e4342d] data-[state=active]:bg-transparent data-[state=active]:shadow-none text-gray-600 hover:text-gray-900 transition-colors"
              >
                Shot - Factory
              </TabsTrigger>
              <TabsTrigger
                value="assembly"
                className="flex-1 lg:flex-none px-4 lg:px-6 py-3 lg:py-3.5 text-sm lg:text-base font-semibold rounded-none border-b-2 border-transparent data-[state=active]:border-[#e4342d] data-[state=active]:text-[#e4342d] data-[state=active]:bg-transparent data-[state=active]:shadow-none text-gray-600 hover:text-gray-900 transition-colors"
              >
                Shot - Assembly
              </TabsTrigger>
            </TabsList>

            {/* Tab Content - Train */}
            <TabsContent value="train" className="mt-0">
              <div className="relative w-full h-[417px] lg:h-[480px] rounded-2xl overflow-hidden bg-gray-200">
                {/* Placeholder with gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-600 via-slate-500 to-slate-400" />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/20" />

                {/* Play Button */}
                <button
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 lg:w-20 lg:h-20 rounded-full backdrop-blur-sm bg-white/80 border-2 border-white/90 flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                  aria-label="Play video"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-0.5 lg:ml-1"
                  >
                    <path
                      d="M6 4L16 10L6 16V4Z"
                      fill="#181d27"
                    />
                  </svg>
                </button>
              </div>
            </TabsContent>

            {/* Tab Content - Factory */}
            <TabsContent value="factory" className="mt-0">
              <div className="relative w-full h-[417px] lg:h-[480px] rounded-2xl overflow-hidden bg-gray-200">
                {/* Placeholder with different gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400" />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/20" />

                {/* Play Button */}
                <button
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 lg:w-20 lg:h-20 rounded-full backdrop-blur-sm bg-white/80 border-2 border-white/90 flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                  aria-label="Play video"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-0.5 lg:ml-1"
                  >
                    <path
                      d="M6 4L16 10L6 16V4Z"
                      fill="#181d27"
                    />
                  </svg>
                </button>
              </div>
            </TabsContent>

            {/* Tab Content - Assembly */}
            <TabsContent value="assembly" className="mt-0">
              <div className="relative w-full h-[417px] lg:h-[480px] rounded-2xl overflow-hidden bg-gray-200">
                {/* Placeholder with different gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-500 to-green-400" />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/20" />

                {/* Play Button */}
                <button
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 lg:w-20 lg:h-20 rounded-full backdrop-blur-sm bg-white/80 border-2 border-white/90 flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                  aria-label="Play video"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-0.5 lg:ml-1"
                  >
                    <path
                      d="M6 4L16 10L6 16V4Z"
                      fill="#181d27"
                    />
                  </svg>
                </button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
