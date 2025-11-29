import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outlined';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({ children, type = 'button', onClick, variant = 'primary' }: ButtonProps) {
  const base = 'w-full border border-gray-300 rounded-lg px-4 py-3 font-semibold text-sm transition-colors duration-200';
  const variantClasses =
    variant === 'primary'
      ? 'bg-orange-50 text-orange-700 border-orange-700 hover:bg-orange-700 hover:text-white'
      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100';

  return (
    <button type={type} onClick={onClick} className={`${base} ${variantClasses}`}>
      {children}
    </button>
  );
}
