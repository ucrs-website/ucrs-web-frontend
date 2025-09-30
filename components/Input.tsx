import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="label text-muted-foreground">
          {label}
        </label>
      )}
      <input
        className={`input text-base transition-colors duration-200 focus:outline-none ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;