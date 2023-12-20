import { Fragment, useState, useRef, useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  disableClickOutside?: boolean; // add this prop to disable click outside functionality
  size?: "sm" | "md" | "lg"; // add this prop for size variations
};

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  disableClickOutside = false,
  size = "lg",
}: ModalProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 0);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      !disableClickOutside &&
      modalRef.current &&
      !modalRef.current.contains(event.target as Node)
    ) {
      handleClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, disableClickOutside]);

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } fixed z-40 inset-0 overflow-y-auto`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-black opacity-40 fixed inset-0" />
        <div
          ref={modalRef}
          className={`${isClosing ? "" : ""} bg-[#F8FAFD] ${
            size === "sm" ? "max-w-sm" : size === "lg" ? "max-w-[1000px] w-[1000px]" : "max-w-md"
          } rounded-lg shadow-lg transform transition-all ease-in-out duration-300`}
        >
          <div className="flex justify-between items-center p-6 border-b">
            <h3 className="text-lg font-medium">{title}</h3>
            <button
              className="text-gray-400 hover:text-gray-500"
              onClick={handleClose}
            >
              Zavřít
            </button>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
