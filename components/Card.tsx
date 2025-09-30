import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'testimonial';
}

const Card: React.FC<CardProps> = ({ variant = 'default', className = '', ...props }) => {
  // Base classes that match DesignSystem.json specifications
  const baseClasses = 'card bg-card text-card-foreground border border-border transition-all duration-200 ease';

  const variantClasses = {
    default: '',
    testimonial: 'card-testimonial bg-muted border-l-4 border-l-primary',
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
};

export default Card;