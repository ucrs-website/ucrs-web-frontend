import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'px-6 py-3 rounded-md text-base font-semibold transition-all duration-200 cursor-pointer border-none outline-none';

  const variantClasses = {
    primary: 'bg-primary-red text-neutral-white hover:bg-primary-red-hover hover:-translate-y-0.5',
    secondary: 'bg-transparent text-primary-red border-2 border-primary-red hover:bg-primary-red hover:text-neutral-white',
    ghost: 'bg-transparent text-neutral-gray-600 hover:bg-neutral-gray-50 hover:text-neutral-gray-700',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
};

export default Button;