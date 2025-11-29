import { X } from 'lucide-react';
import type { ReactNode } from 'react';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
}

export function Dialog({
  isOpen,
  onClose,
  children,
  maxWidth = '4xl',
}: DialogProps) {
  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-[9999] p-4'>
      <div
        className={`bg-white rounded-3xl shadow-2xl overflow-hidden ${maxWidthClasses[maxWidth]} w-full flex flex-col md:flex-row relative`}
      >
        <X
          className='absolute top-6 right-6 w-8 h-8 text-gray-800 cursor-pointer z-10 hover:text-gray-600 transition-colors'
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
}

interface DialogContentProps {
  children: ReactNode;
  className?: string;
  side?: 'left' | 'right';
}

export function DialogContent({
  children,
  className = '',
  side,
}: DialogContentProps) {
  const sideOrder = side === 'left' ? 'order-first' : 'order-last';

  return (
    <div
      className={`flex flex-col gap-5 md:w-1/2 p-8 md:p-12 ${sideOrder} ${className}`}
    >
      {children}
    </div>
  );
}

interface DialogHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function DialogHeader({
  title,
  description,
  className = '',
}: DialogHeaderProps) {
  return (
    <div className={className}>
      <h2 className='text-2xl font-bold text-gray-800 mb-2'>{title}</h2>
      {description && <p className='text-gray-500 text-sm'>{description}</p>}
    </div>
  );
}

interface DialogFooterProps {
  children: ReactNode;
  className?: string;
}

export function DialogFooter({ children, className = '' }: DialogFooterProps) {
  return (
    <div className={`text-center text-sm text-gray-600 mt-6 ${className}`}>
      {children}
    </div>
  );
}

interface DialogSidebarProps {
  children: ReactNode;
  className?: string;
  side?: 'left' | 'right';
}

export function DialogSidebar({
  children,
  className = '',
  side = 'right',
}: DialogSidebarProps) {
  const sideOrder = side === 'left' ? 'order-first' : 'order-last';

  return (
    <div
      className={`hidden md:w-1/2 bg-gradient-to-br from-orange-50 to-white p-8 md:flex flex-col items-center justify-center gap-5 ${sideOrder} ${className}`}
    >
      {children}
    </div>
  );
}
