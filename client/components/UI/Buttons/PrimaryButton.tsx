import { ReactNode } from 'react';

interface PrimaryButtonProps {
  children: ReactNode;
  onClick?: (e?: any) => void | null | Function | Promise<any>;
  isFullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean; // new prop
}

export default function PrimaryButton({
  children,
  onClick,
  isFullWidth = false,
  type,
  className = '',
  disabled = false, // new prop
}: PrimaryButtonProps) {
  const fullWidthClass = isFullWidth ? 'w-full' : '';
  const disabledClass = disabled
    ? 'border-input_border border-2 border-dashed  cursor-not-allowed text-input_border'
    : 'bg-dochazka text-white'; // new line
  return (
    <button
      type={type}
      onClick={onClick}
      className={`p-3 rounded-md text-base ${fullWidthClass} ${className} ${disabledClass}`} // updated line
      disabled={disabled} // new prop
    >
      {children}
    </button>
  );
}
