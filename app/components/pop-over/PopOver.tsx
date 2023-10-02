import React, { ReactNode, useEffect, useRef } from "react";

interface PopoverProps {
  children: ReactNode;
  className?: string;
  isOpen: boolean;
  closePopover: () => void;
  shouldCloseOnOverlayClick?: boolean;
  anchorElement: HTMLElement | null; // The reference to the element where popover will be anchored
}

const Popover: React.FC<PopoverProps> = ({
  children,
  isOpen,
  closePopover,
  shouldCloseOnOverlayClick = false,
  anchorElement,
  className,
}: PopoverProps) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        shouldCloseOnOverlayClick &&
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        closePopover();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, shouldCloseOnOverlayClick, closePopover]);

  if (!isOpen || !anchorElement) return null;

  // Positioning of popover relative to anchorElement
  const rect = anchorElement.getBoundingClientRect();
  const style = {
    top: `${rect.top + window.scrollY}px`,
    left: `${rect.left + window.scrollX}px`,
  };

  return (
    <div
      ref={popoverRef}
      onClick={(e) => e.stopPropagation()}
      className={`${className} popover-content bg-white rounded-lg shadow-2xl absolute z-20`}
    >
      {children}
    </div>
  );
};

export default Popover;
