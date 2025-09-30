import React from 'react';

interface HeroProps {
  title: string;
  subtitle: string;
  cta: React.ReactNode;
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, cta, className = '' }) => {
  return (
    <section className={`bg-neutral-gray-50 min-h-[600px] py-16 text-left ${className}`}>
      <div className="container mx-auto px-4">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-neutral-gray-900 mb-6">
          {title}
        </h1>
        <p className="text-xl text-neutral-gray-600 mb-8 max-w-2xl">
          {subtitle}
        </p>
        {cta}
      </div>
    </section>
  );
};

export default Hero;