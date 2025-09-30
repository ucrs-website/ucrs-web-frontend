'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from './Navigation';

interface NavLink {
 href: string;
 label: string;
 active?: boolean;
}

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
 transparent?: boolean;
}

// Navigation structure for railway services company
const navigationLinks: NavLink[] = [
 { href: '/', label: 'Home', active: true },
 { href: '/services', label: 'Services' },
 { href: '/products', label: 'Products' },
 { href: '/about', label: 'About' },
 { href: '/contact', label: 'Contact' }
];

const Header: React.FC<HeaderProps> = ({
 className = '',
 transparent = false,
 ...props
}) => {
 const [isMenuOpen, setIsMenuOpen] = useState(false);
 const [isScrolled, setIsScrolled] = useState(false);

 // Handle scroll effect for header background
 useEffect(() => {
   const handleScroll = () => {
     setIsScrolled(window.scrollY > 10);
   };

   window.addEventListener('scroll', handleScroll);
   return () => window.removeEventListener('scroll', handleScroll);
 }, []);

 // Close mobile menu when clicking outside
 useEffect(() => {
   const handleClickOutside = (event: MouseEvent) => {
     const target = event.target as Element;
     if (!target.closest('.mobile-menu') && !target.closest('.menu-button')) {
       setIsMenuOpen(false);
     }
   };

   if (isMenuOpen) {
     document.addEventListener('click', handleClickOutside);
     document.body.style.overflow = 'hidden'; // Prevent body scroll when menu is open
   } else {
     document.body.style.overflow = 'unset';
   }

   return () => {
     document.removeEventListener('click', handleClickOutside);
     document.body.style.overflow = 'unset';
   };
 }, [isMenuOpen]);

 const headerClasses = `
   ${transparent && !isScrolled
     ? 'bg-transparent shadow-none'
     : 'bg-white shadow-sm border-b border-gray-100'
   }
   h-20 sticky top-0 z-50 px-4 md:px-6 lg:px-8 transition-all duration-300
   ${className}
 `.trim();

 return (
   <header className={headerClasses} {...props}>
     <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
       {/* Logo Section */}
       <div className="flex-shrink-0">
         <Link href="/" className="flex items-center space-x-2">
           <div className="relative w-12 h-12 md:w-16 md:h-16">
             <Image
               src="/images/logo.png"
               alt="UCRS - Upper Canada Railway Services"
               fill
               className="object-contain"
               sizes="(max-width: 768px) 48px, 64px"
               priority
             />
           </div>
           <div className="hidden sm:block">
             <h1 className="text-xl md:text-2xl font-bold text-gray-900">
               UCRS
             </h1>
             <p className="text-xs md:text-sm text-gray-600 font-medium">
               Railway Services
             </p>
           </div>
         </Link>
       </div>

       {/* Desktop Navigation */}
       <div className="hidden lg:block">
         <Navigation links={navigationLinks} />
       </div>

       {/* CTA Button & Mobile Menu Button */}
       <div className="flex items-center space-x-4">
         {/* Desktop CTA Button */}
         <div className="hidden md:block">
           <Link
             href="/contact"
             className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-md font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
           >
             Get Quote
           </Link>
         </div>

         {/* Mobile Menu Button */}
         <button
           onClick={() => setIsMenuOpen(!isMenuOpen)}
           className="menu-button lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
           aria-label="Toggle mobile menu"
         >
           <svg
             className={`w-6 h-6 transition-transform duration-200 ${
               isMenuOpen ? 'rotate-45' : ''
             }`}
             fill="none"
             stroke="currentColor"
             viewBox="0 0 24 24"
           >
             {isMenuOpen ? (
               <path
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 strokeWidth={2}
                 d="M6 18L18 6M6 6l12 12"
               />
             ) : (
               <path
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 strokeWidth={2}
                 d="M4 6h16M4 12h16M4 18h16"
               />
             )}
           </svg>
         </button>
       </div>
     </div>

     {/* Mobile Menu Overlay */}
     <div
       className={`mobile-menu lg:hidden fixed inset-0 top-20 bg-white transform transition-transform duration-300 ease-in-out ${
         isMenuOpen ? 'translate-x-0' : 'translate-x-full'
       }`}
       style={{ zIndex: 40 }}
     >
       <div className="px-4 py-6 space-y-4">
         {navigationLinks.map((link) => (
           <Link
             key={link.href}
             href={link.href}
             onClick={() => setIsMenuOpen(false)}
             className={`block py-3 px-4 text-lg font-medium rounded-md transition-all duration-200 ${
               link.active
                 ? 'text-red-600 bg-red-50'
                 : 'text-gray-700 hover:text-red-600 hover:bg-gray-50'
             }`}
           >
             {link.label}
           </Link>
         ))}

         {/* Mobile CTA Button */}
         <div className="pt-4 border-t border-gray-200">
           <Link
             href="/contact"
             onClick={() => setIsMenuOpen(false)}
             className="block w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-md font-semibold text-center transition-all duration-200"
           >
             Get Quote
           </Link>
         </div>
       </div>
     </div>

     {/* Mobile Menu Backdrop */}
     {isMenuOpen && (
       <div
         className="lg:hidden fixed inset-0 top-20 bg-black bg-opacity-25"
         style={{ zIndex: 30 }}
         onClick={() => setIsMenuOpen(false)}
       />
     )}
   </header>
 );
};

export default Header;