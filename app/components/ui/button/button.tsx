import React from 'react';
import { CTA_BUTTON } from '../styles';

interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  variant?: 'primary' | 'ghost';
}

export default function Button({ children, type = 'button', onClick, variant = 'primary' }: ButtonProps) {
  const variantClasses =
    variant === 'primary'
      ? 'bg-orange-50 text-orange-700 border-orange-700 hover:bg-orange-700 hover:text-white'
      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100';

  return (
    <button type={type} onClick={onClick} className={`${CTA_BUTTON} ${variantClasses}`}>
      {children}
    </button>
  );
}
