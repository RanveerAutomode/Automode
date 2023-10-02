"use client";

import { useEffect, useRef, useState } from "react";
import Svg from "../svg/Svg";

import tick from "public/checkbox-icons/tick.svg";
import minus from "public/checkbox-icons/minus.svg";

type CheckboxProps = {
  size?: "sm" | "md";
  defaultCheck?: boolean;
  disabled?: boolean;
  label?: string;
  supportingText?: string;
  intermediate?: boolean;
  color?: "red" | "primary" | "green" | "blue" | "yellow" | "secondary";
  onKeyDown?: (event: React.KeyboardEvent) => void;
  onChange?: ((checked: any) => void);
  value?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  name?: string;
};

const Checkbox: React.FC<CheckboxProps> = ({
  size = "sm",
  defaultCheck,
  disabled,
  label,
  supportingText,
  intermediate,
  onKeyDown,
  color = "primary",
  onChange,
  value,
  name,
}) => {
  const [checked, setChecked] = useState(defaultCheck || false);
  const checkboxRef = useRef<HTMLButtonElement>(null);
  const [isPressed, setIsPressed] = useState(false);

  const handleRelease = () => {
    setIsPressed(false);
    setChecked(!checked);
  };

  const handleMouseRelease = () => {
    handleRelease();
    if (checkboxRef.current) {
      checkboxRef.current.blur();
    }
  };

  useEffect(() => {
    onChange && onChange({checked: checked , value: value});
  }
  , [checked]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleRelease();
    }
    onKeyDown && onKeyDown(event); // If there are other events attached, it will trigger them as well.
  };

  useEffect(() => {
    setChecked(defaultCheck || false);
  }, [defaultCheck]);

  const bgColor = {
    red: "bg-red-500",
    primary: "bg-gradient-to-r from-primary-500 to-blue-500",
    green: "bg-green-600",
    blue: "bg-blue-500",
    yellow: "bg-yellow-600",
    secondary: "bg-secondary-500",
  };

  const hoverBgColor = {
    red: "hover:bg-red-700",
    primary: "hover:from-primary-700 hover:to-blue-700",
    green: "hover:bg-green-700",
    blue: "hover:bg-blue-700",
    yellow: "hover:bg-yellow-700",
    secondary: "hover:bg-secondary-700",
  };

  const borderColor = {
    red: "border-red-500",
    primary: "border-primary-500",
    green: "border-green-600",
    blue: "border-blue-500",
    yellow: "border-yellow-600",
    secondary: "border-secondary-500",
  };

  const hoverBorderColor = {
    red: "hover:border-red-700",
    primary: "hover:border-primary-700",
    green: "hover:border-green-700",
    blue: "hover:border-blue-700",
    yellow: "hover:border-yellow-700",
    secondary: "hover:border-secondary-700",
  };

  const disabledBgColor = {
    red: "!bg-red-100",
    primary: "!bg-gradient-to-r !from-primary-100 !to-blue-100",
    green: "!bg-green-100",
    blue: "!bg-blue-100",
    yellow: "!bg-yellow-100",
    secondary: "!bg-secondary-100",
  };

  const focusBorderColor = {
    red: "focus:border-red-500 focus:ring-red-50",
    primary: "focus:border-primary-500 focus:ring-primary-50",
    green: "focus:border-green-600 focus:ring-green-50",
    blue: "focus:border-blue-500 focus:ring-blue-50",
    yellow: "focus:border-yellow-600 focus:ring-yellow-50",
    secondary: "focus:border-secondary-500 focus:ring-secondary-50",
  };

  const checkboxSize = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  const checkboxStyle = checked
    ? "bg-primary-500"
    : "border-1 border-primary-300";

  return (
    <div className={`${label && "flex gap-2"}`}>
      <button
        type="button"
        ref={checkboxRef}
        disabled={disabled}
        value={value}
        onClick={() => onChange && onChange({checked: checked , value: value})}
        className={`${
          label && "mt-0.5"
        } border-1 border flex items-center justify-center  rounded-md  ${
          hoverBorderColor[color]
        } outline-none  ${checkboxSize} ${
          checked
            ? `${bgColor[color]} ${borderColor[color]} ${hoverBorderColor[color]} ${hoverBgColor[color]} border-none `
            : "border-neutral-300"
        } ${!isPressed ? `${focusBorderColor[color]} focus:ring` : ""} ${
          disabled &&
          !defaultCheck &&
          "cursor-not-allowed !border-neutral-200 bg-neutral-100"
        } ${
          disabled &&
          defaultCheck &&
          `cursor-not-allowed !border-none ${disabledBgColor[color]}  `
        }`}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={handleMouseRelease}
        onKeyUp={handleKeyDown}
      >
        {checked && !intermediate && (
          <Svg
            icon={tick}
            iconColor="#ffff"
            width={size === "md" ? 15 : 12}
            height={size === "md" ? 7.5 : 6}
          />
        )}
        {intermediate && checked && (
          <Svg
            icon={minus}
            iconColor="#ffff"
            width={size === "md" ? 10 : 8}
            height={size === "md" ? 6 : 4}
          />
        )}
      </button>
      {label && (
        <label>
          {" "}
          <h3
            className={`${
              size === "md" ? "text-b1" : "text-b2"
            } font-medium text-neutral-700 cursor-pointer`}
          >
            {label}
          </h3>
          <p className="text-b2 text-neutral-500">{supportingText}</p>
        </label>
      )}
    </div>
  );
};

export default Checkbox;
