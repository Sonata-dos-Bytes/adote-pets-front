import type { ReactNode } from 'react';

interface FieldProps {
  label?: string;
  children: ReactNode;
  className?: string;
}

export default function Field({ label, children, className = '' }: FieldProps) {
  return (
    <div className={`w-full ${className}`}>
      {label && <label className="block text-sm text-gray-700 mb-1 font-sans">{label}</label>}
      <div>{children}</div>
    </div>
  );
}
