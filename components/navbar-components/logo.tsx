import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Logo: React.FC = () => {
  return (
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
  );
};

export default Logo;