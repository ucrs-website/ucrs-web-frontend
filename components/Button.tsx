import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', className = '', ...props }) => {
  // Base classes that match DesignSystem.json specifications
  const baseClasses = 'btn inline-flex items-center justify-center font-primary text-base font-semibold border-none outline-none cursor-pointer transition-all duration-200 ease';

  const variantClasses = {
    primary: 'btn-primary bg-primary text-primary-foreground hover:bg-primary-600 hover:-translate-y-1 hover:shadow-md',
    secondary: 'btn-secondary bg-secondary text-secondary-foreground hover:bg-secondary-700 hover:-translate-y-1 hover:shadow-md',
    ghost: 'btn-ghost bg-transparent text-foreground hover:bg-muted hover:text-foreground',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
};

export default Button;