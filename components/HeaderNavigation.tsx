'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

// Navigation links from Figma design
const navigationLinks = [
  { href: '/products', label: 'Explore Products' },
  { href: '/factory-tour', label: 'Factory Tour' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
]

// Mobile menu items with dropdowns
const mobileMenuItems = [
  {
    label: 'Products',
    hasDropdown: true,
    items: [
      { href: '/products/locomotives', label: 'Locomotives' },
      { href: '/products/parts', label: 'Railway Parts' },
      { href: '/products/equipment', label: 'Equipment' },
    ]
  },
  {
    label: 'Services',
    hasDropdown: true,
    items: [
      { href: '/services/maintenance', label: 'Maintenance' },
      { href: '/services/repair', label: 'Repair' },
      { href: '/services/consulting', label: 'Consulting' },
    ]
  },
  {
    label: 'Pricing',
    href: '/pricing',
    hasDropdown: false,
  },
]

export default function HeaderNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Container with max-width */}
      <div className="mx-auto w-full max-w-[var(--container-max-width,1200px)] px-2 md:px-4">
        {/* Nav wrapper with rounded background */}
        <nav
          className="my-3 md:my-4 rounded-2xl bg-white shadow-sm"
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="flex items-center justify-between gap-3 md:gap-6 px-4 md:px-6 py-3 md:py-4">
            {/* Mobile: Hamburger Menu + Logo (Left) */}
            <div className="flex items-center gap-2 lg:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 p-0 hover:bg-transparent"
                    aria-label="Toggle menu"
                  >
                    <Image
                      src="/icons/hamburger-menu.svg"
                      alt="Menu"
                      width={40}
                      height={40}
                      className="h-10 w-10"
                    />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full p-0 bg-white">
                  {/* Mobile Menu Header */}
                  <div className="flex items-center justify-between px-4 py-3 border-b">
                    <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                      <div className="relative h-8 w-[116px]">
                        <Image
                          src="/images/logo.png"
                          alt="UCRS"
                          fill
                          className="object-contain"
                          sizes="116px"
                        />
                      </div>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setMobileMenuOpen(false)}
                      className="h-10 w-10 p-2 hover:bg-gray-100"
                      aria-label="Close menu"
                    >
                      {/* <X className="h-6 w-6 text-[rgb(65,70,81)]" strokeWidth={2} /> */}
                    </Button>
                  </div>

                  {/* Mobile Menu Content */}
                  <div className="px-4 py-8">
                    <Accordion type="single" collapsible className="w-full space-y-1">
                      {mobileMenuItems.map((item, index) => (
                        item.hasDropdown ? (
                          <AccordionItem key={index} value={`item-${index}`} className="border-0">
                            <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-transparent rounded-lg">
                              <span className="text-base font-semibold text-[rgb(24,29,39)]">
                                {item.label}
                              </span>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-0 pt-1">
                              <div className="space-y-1">
                                {item.items?.map((subItem) => (
                                  <Link
                                    key={subItem.href}
                                    href={subItem.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block px-4 py-2 text-sm text-[rgb(71,74,81)] hover:bg-gray-50 rounded-md"
                                  >
                                    {subItem.label}
                                  </Link>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ) : (
                          <Link
                            key={index}
                            href={item.href || '#'}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-4 py-3 text-base font-semibold text-[rgb(24,29,39)] hover:bg-gray-50 rounded-lg"
                          >
                            {item.label}
                          </Link>
                        )
                      ))}
                    </Accordion>
                  </div>
                </SheetContent>
              </Sheet>

              <Link href="/" className="flex-shrink-0" aria-label="UCRS Home">
                <div className="relative h-8 w-[116px]">
                  <Image
                    src="/images/logo.png"
                    alt="UCRS"
                    fill
                    className="object-contain"
                    sizes="116px"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Logo - Desktop only */}
            <Link href="/" className="hidden lg:block flex-shrink-0" aria-label="UCRS Home">
              <div className="relative h-8 w-[139px]">
                <Image
                  src="/images/logo.png"
                  alt="UCRS - Upper Canada Railway Services"
                  fill
                  className="object-contain"
                  sizes="139px"
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
                      <Link
                        href={link.href}
                        className="text-sm font-semibold text-[rgb(83,88,98)] hover:text-foreground transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Right: Search + CTA */}
            <div className="flex items-center gap-3">
              {/* Search Icon Button - Mobile */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-7 w-7 p-1.5"
                aria-label="Search"
              >
                <Search className="h-4 w-4 text-primary" strokeWidth={1.67} />
              </Button>

              {/* Search Input - Desktop */}
              <div className="relative hidden lg:block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search in products"
                  className="w-[200px] pl-9 h-9 text-sm"
                  aria-label="Search products"
                />
              </div>

              {/* Request a Quote Button */}
              <Button
                asChild
                size="sm"
                className="h-7 px-2 text-xs font-semibold lg:h-9 lg:px-4 lg:text-sm"
              >
                <Link href="/quote">Request a Quote</Link>
              </Button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
