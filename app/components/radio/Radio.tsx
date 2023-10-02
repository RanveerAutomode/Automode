"use client";

import { set } from "lodash";
import { useEffect, useRef, useState } from "react";

type RadioProps = {
  size?: "sm" | "md";
  defaultCheck?: string;
  disabled?: boolean;
  label?: string;
  supportingText?: string;
  color?: "red" | "primary" | "green" | "blue" | "yellow" | "secondary";
  options: {
    supportingText: string;
    id: string;
    name: string;
    value: string;
  }[];
  value?: string;
  onChange?: (value: string) => void;
};

const Radio: React.FC<RadioProps> = ({
  size = "sm",
  defaultCheck,
  disabled,
  label,
  supportingText,
  color = "primary",
  options,
  value,
  onChange,
}) => {
  const [checked, setChecked] = useState<string>(defaultCheck || "");
  const [isHovered, setIsHovered] = useState<string>("");
  const radioRef = useRef<HTMLButtonElement>(null);
  const [isPressed, setIsPressed] = useState(false);

  const handleRelease = () => {
    // setIsPressed(false);
    if (radioRef.current) {
      radioRef.current.blur();
    }
  };

  const bgColor = {
    red: "bg-red-500",
    primary: "bg-gradient-primary-500",
    green: "bg-green-600",
    blue: "bg-blue-500",
    yellow: "bg-yellow-600",
    secondary: "bg-secondary-500",
  };

  const hoverBgColor = {
    red: "bg-red-700",
    primary: "bg-primary-700",
    green: "bg-green-700",
    blue: "bg-blue-700",
    yellow: "bg-yellow-700",
    secondary: "bg-secondary-700",
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
  const disabledBorderColor = {
    red: "border-red-100",
    primary: "border-primary-100",
    green: "border-green-100",
    blue: "border-blue-100",
    yellow: "border-yellow-100",
    secondary: "!border-secondary-100",
  };

  const disabledBgColor = {
    red: "!bg-red-100",
    primary: "!bg-primary-100",
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

  useEffect(() => {
    const handleKeyDown = () => setIsPressed(true);
    const handleMouseDown = () => setIsPressed(false);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  useEffect(() => {
    if (value === "") {
      setChecked(defaultCheck || "");
    } else if (value !== undefined) {
      setChecked(options.find((option) => option.value === value)?.id || "");
    }
  }, [value, defaultCheck]);

  return (
    <>
      {options.map((option, index) => (
        <div className={`${"flex gap-2 items-center"}`} key={index}>
          <button
            ref={radioRef}
            onMouseEnter={() => setIsHovered(option.id)}
            onMouseLeave={() => setIsHovered("")}
            onClick={() => {
              setChecked(option.id);
              if (onChange) {
                onChange(option.value);
              }
            }}
            disabled={disabled}
            className={`${
              label && "mt-1"
            } flex items-center justify-center border-2 border flex items-center justify-center rounded-full ${
              !disabled && hoverBorderColor[color]
            } outline-none ${checkboxSize} ${
              checked === option.id && color !== "primary"
                ? `${borderColor[color]} ${
                    !disabled && hoverBorderColor[color]
                  } `
                : color === "primary"
                ? `border-none ${
                    checked === option.id
                      ? `bg-gradient-primary-500 ${
                          isHovered === option.id && "bg-gradient-primary-700"
                        }`
                      : "bg-neutral-300"
                  }`
                : "border-neutral-300"
            } ${isPressed ? `${focusBorderColor[color]} focus:ring` : ""} ${
              disabled &&
              !defaultCheck &&
              "cursor-not-allowed !border-neutral-200 bg-neutral-100"
            } ${
              disabled &&
              defaultCheck &&
              `cursor-not-allowed ${disabledBorderColor[color]} `
            }`}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={handleRelease}>
            {color === "primary" && (
              <div
                className={` ${
                  size === "md" ? "w-4 h-4" : "w-3 h-3"
                } bg-white rounded-full flex items-center justify-center`}>
                {checked === option.id && (
                  <div
                    className={`${
                      size === "md" ? "w-2 h-2" : "w-1.5 h-1.5"
                    } bg-gradient-primary-500 rounded-full ${
                      isHovered === option.id && "bg-gradient-primary-700"
                    }`}></div>
                )}
              </div>
            )}
            {checked === option.id && color !== "primary" && (
              <div
                className={`${bgColor[color]} ${
                  isHovered === option.id && hoverBgColor[color]
                } ${disabled && defaultCheck && disabledBgColor[color]} ${
                  size === "md" ? "w-2 h-2" : "w-1.5 h-1.5"
                } rounded-full`}></div>
            )}
          </button>
          {
            <label className="cursor-pointer" onClick={() => {
              setChecked(option.id);
              if (onChange) {
                onChange(option.value);
              }
            }}
            onMouseEnter={() => setIsHovered(option.id)}
            onMouseLeave={() => setIsHovered("")}
                >
              {" "}
              <h3
                className={`${
                  size === "md" ? "text-b1" : ""
                } font-medium text-neutral-700`}>
                {label}
              </h3>
              <p className="text-b2 text-neutral-500">
                {option.supportingText}
              </p>
            </label>
          }
        </div>
      ))}
    </>
  );
};

export default Radio;

// how to use it

//  <Radio size="md"
//  options={[
//  { supportingText: "Active", id: "active", name: "status", value: "active" },
//  { supportingText: "InActive", id: "inActive", name: "status", value: "inActive" }
//  ]}/>
