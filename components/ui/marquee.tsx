'use client'

import React from 'react'
import ReactMarquee from 'react-fast-marquee'

interface MarqueeProps {
  children: React.ReactNode
  speed?: number
  direction?: 'left' | 'right' | 'up' | 'down'
  pauseOnHover?: boolean
  className?: string
  gradient?: boolean
  gradientColor?: string
  gradientWidth?: number | string
}

export function Marquee({
  children,
  speed = 50,
  direction = 'left',
  pauseOnHover = true,
  className = '',
  gradient = false,
  gradientColor = 'white',
  gradientWidth = 200,
}: MarqueeProps) {
  return (
    <ReactMarquee
      speed={speed}
      direction={direction}
      pauseOnHover={pauseOnHover}
      className={className}
      gradient={gradient}
      gradientColor={gradientColor}
      gradientWidth={gradientWidth}
    >
      {children}
    </ReactMarquee>
  )
}
