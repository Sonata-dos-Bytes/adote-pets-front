import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  bgColor?: string;
  textColor?: string;
}

export default function Button({
  children,
  type = 'button',
  onClick,
  bgColor = '#fff3ed',
  textColor = '#F57B42',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className='py-2 px-4 border rounded cursor-pointer font-semibold flex-1 transition-all duration-300 ease-in-out w-full hover:border-opacity-100'
      style={{
        backgroundColor: bgColor,
        color: textColor,
        borderColor: textColor,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = textColor;
        e.currentTarget.style.color = bgColor;
        e.currentTarget.style.borderColor = bgColor;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = bgColor;
        e.currentTarget.style.color = textColor;
        e.currentTarget.style.borderColor = textColor;
      }}
    >
      {children}
    </button>
  );
}
