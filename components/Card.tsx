import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'testimonial';
}

const Card: React.FC<CardProps> = ({ variant = 'default', className = '', ...props }) => {
  const baseClasses = 'rounded-xl p-8 transition-all duration-200';

  const variantClasses = {
    default: 'bg-neutral-white shadow-md border border-neutral-gray-200 hover:shadow-lg hover:-translate-y-1',
    testimonial: 'bg-neutral-gray-50 border-l-4 border-primary-red shadow-sm',
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
};

export default Card;