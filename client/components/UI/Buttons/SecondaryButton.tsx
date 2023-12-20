type PrimaryButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  isFullWidth?: boolean;
  width?: string | number;
  height?: string | number;
  className?: string;
};

export default function SecondaryButton({
  children,
  onClick,
  isFullWidth = false,
  width = 'auto',
  height = 'auto',
  className = '',
}: PrimaryButtonProps) {
  const fullWidthClass = isFullWidth ? 'w-full' : '';
  const widthClass = typeof width === 'number' ? `w-${width}` : `w-${width}`;
  const heightClass = typeof height === 'number' ? `h-${height}` : `h-${height}`;
  return (
    <button
      onClick={onClick}
      className={`bg-transparent border-primary border-2 text-black p-3 rounded-md text-base ${fullWidthClass} ${widthClass} ${heightClass} ${className}`}
    >
      {children}
    </button>
  );
}
