'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

// Navigation links from Figma design
const navigationLinks = [
  { href: '/products', label: 'Explore Products' },
  { href: '/factory-tour', label: 'Factory Tour' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
]

export default function HeaderNavigation() {
  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Container with max-width */}
      <div className="mx-auto w-full max-w-[var(--container-max-width,1200px)] px-4">
        {/* Nav wrapper with rounded background */}
        <nav
          className="my-4 rounded-xl border border-border bg-background shadow-sm"
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="flex items-center justify-between gap-6 px-6 py-4">
            {/* Left: Logo */}
            <Link href="/" className="flex-shrink-0" aria-label="UCRS Home">
              <div className="relative h-8 w-[116px]">
                <Image
                  src="/images/logo.png"
                  alt="UCRS - Upper Canada Railway Services"
                  fill
                  className="object-contain"
                  sizes="116px"
                  priority
                />
              </div>
            </Link>

            {/* Center: Desktop Navigation */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList className="gap-6">
                {navigationLinks.map((link) => (
                  <NavigationMenuItem key={link.href}>
                    <NavigationMenuLink asChild>
                      <Link href={link.href} className="text-sm font-semibold text-[rgb(83,88,98)] hover:text-foreground transition-colors duration-200">
                        {link.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Right: Search + CTA */}
            <div className="flex items-center gap-4 ml-auto">
              {/* Search Input - Hidden on mobile */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search in products"
                  className="w-[200px] pl-9 h-9 text-sm"
                  aria-label="Search products"
                />
              </div>

              {/* Request a Quote Button - Hidden on small mobile */}
              <Button
                asChild
                size="sm"
                className="hidden sm:inline-flex h-9 px-4 text-sm font-semibold"
              >
                <Link href="/quote">Request a Quote</Link>
              </Button>

              {/* Mobile Menu Toggle */}
              <div className="lg:hidden">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10"
                      aria-label="Toggle menu"
                    >
                      <Menu className="h-5 w-5" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-64 p-2">
                    <div className="space-y-2">
                      {/* Mobile Search */}
                      <div className="relative md:hidden mb-3">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search in products"
                          className="pl-9 h-9 text-sm"
                        />
                      </div>

                      {/* Mobile Navigation */}
                      <NavigationMenu className="w-full">
                        <NavigationMenuList className="flex-col items-start gap-1 w-full">
                          {navigationLinks.map((link) => (
                            <NavigationMenuItem key={link.href} className="w-full">
                              <NavigationMenuLink asChild>
                                <Link href={link.href} className="block w-full rounded-md px-3 py-2 text-sm font-semibold text-[rgb(83,88,98)] hover:bg-muted hover:text-foreground transition-colors duration-200">
                                  {link.label}
                                </Link>
                              </NavigationMenuLink>
                            </NavigationMenuItem>
                          ))}
                        </NavigationMenuList>
                      </NavigationMenu>

                      {/* Mobile CTA */}
                      <Button
                        asChild
                        size="sm"
                        className="w-full sm:hidden h-9 text-sm font-semibold"
                      >
                        <Link href="/quote">Request a Quote</Link>
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
