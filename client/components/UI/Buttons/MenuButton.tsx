import { MouseEventHandler } from "react";

type MenuButtonProps = {
  onClick: (e?: any) => void | Function | null;

  children: React.ReactNode;
  isFullWidth?: boolean;

  className?: string;
};

const MenuButton = (props: MenuButtonProps) => {
  const fullWidthClass = props.isFullWidth ? 'w-full' : '';

  return (
    <button
      onClick={props.onClick}
      className={`bg-transparent border-black border-2 text-black p-1 w-[190px] rounded-md text-base h-[40px] ${fullWidthClass} ${props.className}`}
    >
      {props.children}
    </button>
  );
};

export default MenuButton;
