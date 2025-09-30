import React from 'react';
import Link from 'next/link';

interface NavLink {
  href: string;
  label: string;
  active?: boolean;
}

interface NavigationProps {
  links: NavLink[];
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ links, className = '' }) => {
  return (
    <nav className={`flex space-x-6 ${className}`}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`text-neutral-gray-600 hover:text-primary-red font-medium text-base transition-colors duration-200 ${
            link.active ? 'text-primary-red' : ''
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;