import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outlined';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function Button({
  children,
  variant = 'primary',
  type = 'button',
  disabled = false,
  onClick,
  className,
}: ButtonProps) {
  const variantClasses = {
    primary: 'bg-primary text-white',
    outlined: 'border text-primary',
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`py-2 px-4 ${variantClasses[variant]} hover:bg-primary/80 rounded cursor-pointer font-semibold flex-1 transition-all duration-300 ease-in-out w-full hover:border-opacity-100 ${className}`}
    >
      {children}
    </button>
  );
}
