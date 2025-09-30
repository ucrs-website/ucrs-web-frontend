import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-semibold text-neutral-gray-600 mb-2">
          {label}
        </label>
      )}
      <input
        className={`px-4 py-3 rounded-md border-2 border-neutral-gray-200 text-base transition-colors duration-200 focus:border-primary-red focus:outline-none ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;