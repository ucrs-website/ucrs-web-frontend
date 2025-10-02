import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { PlayCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-[1200px] mx-auto space-y-16">
          {/* Top Content wrapper */}
          <div className="flex flex-col items-center text-center space-y-12">
            {/* Logo */}
            <Link href="/" aria-label="UCRS Home">
              <div className="relative h-8 w-[116px]">
                <Image
                  src="/images/logo.png"
                  alt="UCRS - Upper Canada Railway Services"
                  fill
                  className="object-contain"
                  sizes="116px"
                />
              </div>
            </Link>

            {/* Heading and supporting text */}
            <div className="max-w-[768px] space-y-4">
              <h2 className="text-3xl md:text-[30px] font-semibold text-foreground leading-[38px]">
                Start growing with Untitled
              </h2>
              <p className="text-lg md:text-xl text-[rgb(83,88,98)] leading-[30px]">
                Join over 4,000+ startups already growing with Untitled.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
              {/* View demo button */}
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-5 gap-2 text-base font-semibold"
              >
                <PlayCircle className="h-5 w-5" />
                View demo
              </Button>

              {/* Explore products button */}
              <Button
                asChild
                size="lg"
                className="h-12 px-5 gap-2 text-base font-semibold"
              >
                <Link href="/products">
                  <ArrowRight className="h-5 w-5" />
                  Explore products
                </Link>
              </Button>
            </div>
          </div>

          {/* Bottom section - Copyright & Links */}
          <div className="border-t border-border pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              {/* Copyright text */}
              <p className="text-base text-muted-foreground">
                © {currentYear} Untitled UI. All rights reserved.
              </p>

              {/* Footer links */}
              <div className="flex items-center gap-6">
                <Link
                  href="/terms"
                  className="text-base text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms
                </Link>
                <Link
                  href="/privacy"
                  className="text-base text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy
                </Link>
                <Link
                  href="/cookies"
                  className="text-base text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
