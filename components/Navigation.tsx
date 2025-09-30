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
          className={`nav-link hover:text-primary font-medium text-base transition-colors duration-200 ${
            link.active ? 'nav-link active' : ''
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;