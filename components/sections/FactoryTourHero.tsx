'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

export function FactoryTourHero() {
  return (
    <section className="relative w-full mt-[-110px] lg:pt-40 pt-[200px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/factory-tour/factory-tour-bg.png"
          alt=""
          fill
          className="object-cover"
          priority
          quality={100}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-8 py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto">
          {/* Hero header section */}
          <div className="flex flex-col items-center justify-center text-center gap-8 lg:gap-[48px] px-4 lg:px-8">
            {/* Heading and supporting text */}
            <div className="flex flex-col items-center gap-4 lg:gap-[30px] max-w-[768px]">
              <div className="flex flex-col items-center gap-3">
                <h1 className="lg:text-6xl text-4xl leading-[40px] lg:text-[90px] font-bold text-white lg:leading-[90px] tracking-tight">
                  Innovation in Motion: Explore Our State-of-the-Art Facility
                </h1>
              </div>
              <p className="text-base lg:text-[20px] text-[#e5e7eb] lg:leading-[30px] max-w-[600px]">
                Manufacturing Excellence for Railroads Worldwide
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Button
                asChild
                variant="outline"
                className="w-full sm:w-auto h-9 lg:h-[60px] px-4 lg:px-6 rounded-lg bg-white hover:bg-gray-50 text-[#5A5A5A] border-0 text-sm lg:text-lg font-semibold shadow-sm gap-2"
              >
                <Link href="/contact" className="flex items-center gap-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 lg:w-6 lg:h-6">
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.4976 3.21399L11.5648 3.24805C12.4079 3.67526 13.2282 4.1135 13.9571 4.54006C14.7879 5.02619 15.6858 5.60593 16.5845 6.21683L16.6448 6.25786C18.2059 7.31904 19.4598 8.17139 20.313 8.99942C21.2095 9.86937 21.75 10.794 21.75 12.0001C21.75 13.2062 21.2095 14.1308 20.313 15.0007C19.4598 15.8288 18.2059 16.6811 16.6449 17.7423L16.5845 17.7833C15.6858 18.3942 14.7879 18.974 13.9571 19.4601C13.2282 19.8867 12.4079 20.3249 11.5648 20.7521L11.4976 20.7862C9.94624 21.5724 8.69042 22.2088 7.64119 22.5229C6.53179 22.855 5.52552 22.8662 4.55949 22.2619C3.60608 21.6655 3.13627 20.7515 2.866 19.5892C2.60647 18.4731 2.50474 17.0069 2.37764 15.1751L2.37294 15.1074C2.29806 14.0283 2.25 12.9623 2.25 12.0001C2.25 11.0379 2.29806 9.97182 2.37294 8.89277L2.37764 8.82504C2.50474 6.99322 2.60647 5.52701 2.866 4.41094C3.13627 3.24865 3.60609 2.33465 4.55949 1.73824C5.52552 1.13392 6.53179 1.14513 7.64119 1.47725C8.69041 1.79135 9.94623 2.42777 11.4976 3.21399ZM7.21101 2.91424C6.35111 2.65681 5.83171 2.7117 5.355 3.00991C4.86566 3.31602 4.54855 3.79797 4.32702 4.75067C4.09792 5.73588 4.00226 7.08134 3.86934 8.99662C3.79591 10.0548 3.75 11.084 3.75 12.0001C3.75 12.9162 3.7959 13.9453 3.86934 15.0035C4.00226 16.9188 4.09792 18.2643 4.32702 19.2495C4.54855 20.2022 4.86566 20.6841 5.355 20.9902C5.83171 21.2885 6.35111 21.3433 7.21101 21.0859C8.11597 20.815 9.25196 20.2426 10.8868 19.4141C11.713 18.9954 12.5049 18.572 13.1995 18.1655C13.9915 17.702 14.8594 17.1422 15.7412 16.5428C17.3768 15.4309 18.5202 14.6504 19.2684 13.9243C19.9844 13.2295 20.25 12.6687 20.25 12.0001C20.25 11.3315 19.9844 10.7707 19.2684 10.0759C18.5202 9.34976 17.3768 8.56925 15.7412 7.45734C14.8594 6.85791 13.9915 6.29811 13.1995 5.83469C12.5049 5.4282 11.713 5.00473 10.8868 4.58606C9.25195 3.7576 8.11597 3.18515 7.21101 2.91424Z" fill="#5A5A5A"/>
                  </svg>
                  Start Virtual Tour
                </Link>
              </Button>
              <Button
                asChild
                className="w-full sm:w-auto h-9 lg:h-[60px] px-4 lg:px-6 rounded-lg bg-[#e4342d] hover:bg-[#d32821] active:bg-[#bb2f27] text-white text-sm lg:text-lg font-semibold shadow-sm"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
