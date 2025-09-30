import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Services' },
    { href: '/products', label: 'Products' },
    { href: '/contact', label: 'Contact' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ];

  const socialLinks = [
    { href: 'https://facebook.com/ucrs', icon: Facebook, label: 'Facebook' },
    { href: 'https://twitter.com/ucrs', icon: Twitter, label: 'Twitter' },
    { href: 'https://linkedin.com/company/ucrs', icon: Linkedin, label: 'LinkedIn' },
    { href: 'https://youtube.com/ucrs', icon: Youtube, label: 'YouTube' },
  ];

  return (
    <footer className="bg-neutral-gray-900 text-neutral-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary-red">UCRS</h3>
            <p className="text-neutral-gray-300 mb-4">
              Leading provider of railway parts, locomotive maintenance, and railway services.
              Quality parts for all railway systems.
            </p>
            <p className="text-sm text-neutral-gray-400">
              © {currentYear} UCRS. All rights reserved.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-gray-300 hover:text-primary-red transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-red mt-0.5 flex-shrink-0" />
                <div className="text-neutral-gray-300">
                  <p>123 Railway Street</p>
                  <p>Rail City, RC 12345</p>
                  <p>United States</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-red flex-shrink-0" />
                <a
                  href="tel:+1-555-123-4567"
                  className="text-neutral-gray-300 hover:text-primary-red transition-colors duration-200"
                >
                  +1 (555) 123-4567
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-red flex-shrink-0" />
                <a
                  href="mailto:info@ucrs.com"
                  className="text-neutral-gray-300 hover:text-primary-red transition-colors duration-200"
                >
                  info@ucrs.com
                </a>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-gray-300 hover:text-primary-red transition-colors duration-200"
                    aria-label={social.label}
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;