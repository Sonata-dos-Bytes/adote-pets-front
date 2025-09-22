import React from "react";
import "./button.css";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  bgColor?: string;
  textColor?: string;
}

export default function Button({
  children,
  type = "button",
  onClick,
  bgColor = "#fff3ed",  
  textColor = "#F57B42", 
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="custom-button"
      style={
        {
          "--bg-color": bgColor,
          "--text-color": textColor,
          "--border-color": textColor,
          "--hover-border-color": textColor,
        } as React.CSSProperties
      }
    >
      {children}
    </button>
  );
}
