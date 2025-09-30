import React from 'react';

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {}

const Header: React.FC<HeaderProps> = ({ className = '', ...props }) => {
  return (
    <header
      className={`bg-neutral-white h-20 shadow-sm sticky top-0 z-50 px-4 ${className}`}
      {...props}
    />
  );
};

export default Header;