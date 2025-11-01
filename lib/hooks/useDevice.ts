/**
 * useDevice Hook
 * Detects device type and screen size using media queries
 */

'use client'

import { useEffect, useState } from 'react'

export default function useDevice() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    // Define media queries
    const mobileQuery = window.matchMedia('(max-width: 767px)')
    const tabletQuery = window.matchMedia('(min-width: 768px) and (max-width: 1023px)')
    const desktopQuery = window.matchMedia('(min-width: 1024px)')

    // Update state based on current matches
    const updateDeviceState = () => {
      setIsMobile(mobileQuery.matches)
      setIsTablet(tabletQuery.matches)
      setIsDesktop(desktopQuery.matches)
    }

    // Set initial state
    updateDeviceState()

    // Add event listeners
    mobileQuery.addEventListener('change', updateDeviceState)
    tabletQuery.addEventListener('change', updateDeviceState)
    desktopQuery.addEventListener('change', updateDeviceState)

    // Cleanup
    return () => {
      mobileQuery.removeEventListener('change', updateDeviceState)
      tabletQuery.removeEventListener('change', updateDeviceState)
      desktopQuery.removeEventListener('change', updateDeviceState)
    }
  }, [])

  const isResponsive = isMobile || isTablet
  const device = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'

  return {
    isMobile,
    isTablet,
    isDesktop,
    isResponsive,
    device,
  }
}
