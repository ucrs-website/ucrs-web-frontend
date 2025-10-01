import React from 'react';
import clsx from 'clsx';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={clsx("max-w-[1216px] mx-auto px-4 md:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
};

export default Container;