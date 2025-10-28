"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

// Navigation links from Figma design
const navigationLinks = [
  { href: "/products", label: "Explore Products" },
  { href: "/factory-tour", label: "Factory Tour" },
  { href: "/services", label: "Services" },
  { href: "/export", label: "Export & Global Presence" },
  { href: "/about", label: "About Us" },
];

// Mobile menu items with dropdowns
const mobileMenuItems = [
  {
    label: "Products",
    hasDropdown: true,
    items: [
      { href: "/products/locomotives", label: "Locomotives" },
      { href: "/products/parts", label: "Railway Parts" },
      { href: "/products/equipment", label: "Equipment" },
    ],
  },
  {
    label: "Services",
    hasDropdown: true,
    items: [
      { href: "/services/maintenance", label: "Maintenance" },
      { href: "/services/repair", label: "Repair" },
      { href: "/services/consulting", label: "Consulting" },
    ],
  },
  {
    label: "Pricing",
    href: "/pricing",
    hasDropdown: false,
  },
  {
    label: "Resources",
    hasDropdown: true,
    items: [
      { href: "/resources/blog", label: "Blog" },
      { href: "/resources/guides", label: "Guides" },
      { href: "/resources/documentation", label: "Documentation" },
    ],
  },
  {
    label: "About",
    href: "/about",
    hasDropdown: false,
  },
];

// Footer links for mobile menu (two columns)
const mobileFooterLinks = {
  column1: [
    { href: "/about", label: "About us" },
    { href: "/press", label: "Press" },
    { href: "/careers", label: "Careers" },
    { href: "/legal", label: "Legal" },
  ],
  column2: [
    { href: "/support", label: "Support" },
    { href: "/contact", label: "Contact" },
    { href: "/sitemap", label: "Sitemap" },
    { href: "/cookie-settings", label: "Cookie settings" },
  ],
};

export default function HeaderNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 z-50 w-full">
      {/* Container with max-width */}
      <div className="mx-auto w-full max-w-[var(--container-max-width,1200px)] px-2 md:px-4">
        {/* Nav wrapper with rounded background */}
        <nav
          className="my-3 md:my-4 rounded-2xl bg-white shadow-sm border-[1px] border-gray-100"
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
                  <VisuallyHidden>
                    <SheetTitle>Navigation Menu</SheetTitle>
                  </VisuallyHidden>

                  {/* Mobile Menu Header */}
                  <div className="flex items-center justify-between px-4 py-3 border-0">
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
                  </div>

                  {/* Mobile Menu Content */}
                  <div className="flex flex-col h-[calc(100vh-64px)]">
                    {/* Main Menu Items - Scrollable */}
                    <div className="flex-1 overflow-y-auto px-4 py-6">
                      <Accordion
                        type="single"
                        collapsible
                        className="w-full space-y-1"
                      >
                        {mobileMenuItems.map((item, index) =>
                          item.hasDropdown ? (
                            <AccordionItem
                              key={index}
                              value={`item-${index}`}
                              className="border-0"
                            >
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
                              href={item.href || "#"}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block px-4 py-3 text-base font-semibold text-[rgb(24,29,39)] hover:bg-gray-50 rounded-lg"
                            >
                              {item.label}
                            </Link>
                          ),
                        )}
                      </Accordion>
                    </div>

                    {/* Footer Section - Sticky to Bottom */}
                    <div className="border-t border-gray-200 bg-white px-4 py-6 space-y-4 mt-auto">
                      {/* Two Column Links */}
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                        <div className="space-y-2.5">
                          {mobileFooterLinks.column1.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block text-sm text-[rgb(71,74,81)] hover:text-[rgb(24,29,39)]"
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                        <div className="space-y-2.5">
                          {mobileFooterLinks.column2.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block text-sm text-[rgb(71,74,81)] hover:text-[rgb(24,29,39)]"
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Sign up / Log in Buttons */}
                      <div className="space-y-2.5 pt-2">
                        <Button
                          asChild
                          className="w-full h-11 text-base font-semibold"
                        >
                          <Link
                            href="/contact"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            Get Quote
                          </Link>
                        </Button>
                      </div>
                    </div>
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
            <Link
              href="/"
              className="hidden lg:block flex-shrink-0"
              aria-label="UCRS Home"
            >
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
              <NavigationMenuList className="gap-1">
                {navigationLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <NavigationMenuItem key={link.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={link.href}
                          className={`text-xs font-semibold transition-all duration-200 rounded-lg px-2.5 py-2 whitespace-nowrap ${
                            isActive
                              ? "!bg-red-200 !text-red-800 hover:!bg-red-300 hover:!text-red-900"
                              : "hover:!bg-red-100 hover:!text-red-700 text-[rgb(71,74,81)]"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                })}
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
  );
}
