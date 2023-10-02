"use client";

import { on } from "events";
import { useRef, useState } from "react";

type SwitchProps = {
  size?: "sm" | "md";
  defaultActive?: boolean | null;
  disabled?: boolean;
  label?: string;
  supportingText?: string;
  onToggle?: () => void;
};

const Switch: React.FC<SwitchProps> = ({
  size = "sm",
  defaultActive = false,
  disabled,
  label,
  supportingText,
  onToggle,
}) => {
  const switchRef = useRef<HTMLButtonElement>(null);
  const [isActive, setIsActive] = useState(
    defaultActive ? defaultActive : false
  );
  const [isPressed, setIsPressed] = useState(false);

  const handleRelease = () => {
    setIsPressed(false);
    if (switchRef.current) {
      switchRef.current.blur();
    }
  };

  const handleToggle = () => {
    setIsActive(!isActive);
    onToggle && onToggle();
  };

  const switchSizeClass = size === "md" ? "w-11 h-6" : "w-9 h-5";
  const togglerSizeClass = size === "md" ? "w-5 h-5" : "w-4 h-4";

  return (
    <div className={`${label && "flex gap-2"}`}>
      <button
        ref={switchRef}
        type="button"
        disabled={disabled}
        className={`flex items-center rounded-xl p-0.5 cursor-pointer outline-none ${
          !isPressed ? "focus:ring" : ""
        } focus:ring-primary-50  bg-gradient-to-r ${
          isActive
            ? `${
                !disabled
                  ? "hover:from-primary-700 hover:to-blue-700 from-primary-500 to-blue-500"
                  : "bg-primary-100"
              }`
            : ` ${
                !disabled
                  ? "bg-secondary-100 hover:bg-secondary-200"
                  : "bg-secondary-100"
              } `
        } ${disabled ? "!cursor-not-allowed" : ""} ${switchSizeClass}`}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={handleRelease}
        onClick={handleToggle}
      >
        <div
          className={`bg-white rounded-full shadow-sm transform transition-transform ${
            isActive
              ? `${size === "md" ? "translate-x-5" : "translate-x-4"}`
              : "translate-x-0"
          } ${
            disabled && !defaultActive ? "!bg-secondary-100" : ""
          } ${togglerSizeClass}`}
        ></div>
      </button>
      {label && (
        <label>
          {" "}
          <h3
            className={`${
              size === "md" ? "text-b1" : ""
            } font-medium text-neutral-700`}
          >
            {label}
          </h3>
          <p className="text-b2 text-neutral-500">{supportingText}</p>
        </label>
      )}
    </div>
  );
};

export default Switch;
