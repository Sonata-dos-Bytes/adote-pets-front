import { Icon } from "@iconify/react";
import "./input-with-icon.css";

interface InputWithIconProps {
  icon: string;
  type?: string;
  placeholder?: string;
}

export default function InputWithIcon({
  icon,
  type = "text",
  placeholder,
}: InputWithIconProps) {
  return (
    <div className="input-wrapper">
      <Icon icon={icon} className="input-icon" />
      <input type={type} placeholder={placeholder} />
    </div>
  );
}
