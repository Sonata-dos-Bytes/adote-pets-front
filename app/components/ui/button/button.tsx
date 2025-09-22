import React from "react";
import "./button.css";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export default function Button({
  children,
  type = "button",
  onClick,
}: ButtonProps) {
  return (
    <button type={type} className="custom-button" onClick={onClick}>
      {children}
    </button>
  );
}
