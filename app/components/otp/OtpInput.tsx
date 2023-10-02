"use client";

import React, { FC, useState, useRef, useEffect } from "react";
import Divider from "../divider/Divider";

type OtpState = "normal" | "focused" | "hovered" | "disabled" | "error";

const sizes = {
  sm: { width: "w-8", height: "h-8", fontSize: "text-b1" },
  md: { width: "w-10", height: "h-10", fontSize: "text-subtitle" },
  lg: { width: "w-12", height: "h-12", fontSize: "text-title" },
  xl: { width: "w-14", height: "h-14", fontSize: "text-h4" },
  "2xl": { width: "w-16", height: "h-16", fontSize: "text-h3" },
  "3xl": { width: "w-[72px]", height: "h-[72px]", fontSize: "text-h2" },
};

interface OtpProps {
  id?: string;
  labelTop?: string;
  labelBottom?: string;
  placeholderValue?: string | number;
  disabled?: boolean;
  hasError?: string | boolean;
  reset?: boolean;
  inputsCount?: number;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  customSizeClass?: string;
  className?: string;
  name?: string;
  onOtpChange?: (otpValue: string) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>, otpValue: string) => void;
  onComplete?: () => void;
}

const OtpInput: FC<OtpProps> = ({
  placeholderValue = 0,
  hasError = false,
  disabled = false,
  inputsCount = 6,
  size = "lg",
  customSizeClass = "",
  onOtpChange,
  onBlur,
  reset,
  className,
  name,
  onComplete,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [focusIndex, setFocusIndex] = useState<number | null>(null);
  const initialOtpState = Array(inputsCount).fill("normal") as OtpState[];
  const [OtpStates, setOtpStates] = useState<OtpState[]>(initialOtpState);
  const [otpValues, setOtpValues] = useState<string[]>(
    Array(inputsCount).fill("")
  );
  const [lastInputValue, setLastInputValue] = useState("");
  const [otpError, setOtpError] = useState<string | boolean>(false);

  useEffect(() => {
    if (otpValues.join("").length === inputsCount) {
      onComplete ? onComplete() : "";
    }
  }, [lastInputValue]);

  useEffect(() => {
    setOtpStates((prevState) => {
      let newState = [...prevState];
      for (let i = 0; i < inputsCount; i++) {
        if (disabled) {
          newState[i] = "disabled";
        } else if (hasError || otpError !== false) {
          newState[i] = "error";
        } else if (i === focusIndex) {
          newState[i] = "focused";
        } else {
          newState[i] = "normal";
        }
      }
      return newState;
    });

    // If reset is true, clear all inputs
    if (reset) {
      setOtpValues(Array(inputsCount).fill(""));
    }
  }, [disabled, reset, hasError, focusIndex, inputsCount, otpError]);

  useEffect(() => {
    // Update otpValues state when inputsCount changes
    setOtpValues((prevState) => {
      const newState = [...prevState];
      if (inputsCount > prevState.length) {
        // Add new entries for additional inputs
        for (let i = prevState.length; i < inputsCount; i++) {
          newState[i] = "";
        }
      } else if (inputsCount < prevState.length) {
        // Remove entries for removed inputs
        newState.length = inputsCount;
      }
      return newState;
    });

    // Update inputRefs when inputsCount changes
    inputRefs.current = inputRefs.current.slice(0, inputsCount);
  }, [inputsCount]);

  const handleFocus = (index: number) => {
    if (!disabled && !hasError && !otpError) {
      let newState = [...OtpStates];
      newState[index] = "focused";
      setOtpStates(newState);
    }
    setIsFocused(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!disabled && !hasError && !otpError) {
      let newState = [...OtpStates];
      newState.forEach((_, index) => {
        newState[index] = "normal";
      });
      setOtpStates(newState);
    }
    setIsFocused(false);
    // Call the onBlur prop with the current OTP value
    onBlur?.(e, otpValues.join(""));

    if (e.target.value === "" && otpValues.join("").length > 0) {
      setOtpError("OTP must be 6 digits.");
    } else if (e.target.value === "" && otpValues.join("").length === 0) {
      setOtpError("OTP is required.");
    }
  };

  const handleMouseEnter = (index: number) => {
    if (!disabled && !hasError && !isFocused && !otpError) {
      let newState = [...OtpStates];
      newState[index] = "hovered";
      setOtpStates(newState);
    }
  };

  const handleMouseLeave = (index: number) => {
    if (!disabled && !hasError && !isFocused && !otpError) {
      let newState = [...OtpStates];
      newState[index] = "normal";
      setOtpStates(newState);
    }
  };

  const OtpStyles: Record<OtpState, string> = {
    normal: "border-neutral-200 bg-white text-neutral-600",
    focused:
      "gradient-border-otp text-primary-500 ring-primary-50 ring-[3px] bg-white text-neutral-600",
    hovered: "border-neutral-400 bg-white text-neutral-600",
    disabled:
      "border-neutral-200 bg-neutral-100 text-neutral-600 cursor-not-allowed",
    error: "border-red-500 text-red-600 ring-red-50 ring-[3px]",
  };

  const inputRefs = useRef(
    Array.from({ length: inputsCount }, () =>
      React.createRef<HTMLInputElement>()
    )
  );

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const inputElement = event.target as HTMLInputElement;

    // Check if entered value is numeric only, if not discard it
    if (!/^\d*$/.test(inputElement.value)) {
      inputElement.value = "";
      return;
    }

    inputElement.value = inputElement.value.slice(0, 1);

    // If there's a next input, focus on it
    if (index < inputsCount - 1 && inputElement.value !== "") {
      setFocusIndex(index + 1);
      inputRefs.current[index + 1].current?.focus();
    }

    // Update the OTP value in the state
    const newOtpValues = [...otpValues];
    newOtpValues[index] = inputElement.value;
    setOtpValues(newOtpValues);

    // Call the onOtpChange prop with the combined OTP value
    if (onOtpChange) {
      const otpValue = newOtpValues.join("");
      onOtpChange(otpValue);
    }

    if (index === inputsCount - 1) {
      setLastInputValue(inputElement.value);
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Backspace" && event.currentTarget.value === "") {
      // If there's a previous input, focus on it
      if (index > 0) {
        setFocusIndex(index - 1); // Update focus index when moving to previous input
        inputRefs.current[index - 1].current?.focus();
      }
    }
  };

  const handleOtpInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement.value !== "") {
      setOtpError(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-2 items-center">
        {Array.from({ length: inputsCount }, (_, index) => (
          <React.Fragment key={index}>
            <div
              className={`bg-gradient-to-r from-primary-500 to-blue-500 rounded-lg ${
                OtpStates[index] === "focused" ? "rounded-none" : ""
              }`}
            >
              <input
                autoComplete="off"
                placeholder={"0"}
                onChange={(e) => {
                  handleInputChange(e, index), handleOtpInputChange(e, index);
                }}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`${className} overflow-hidden placeholder:text-neutral-300 rounded-md outline-none text-center border font-medium flex items-center justify-between ${
                  customSizeClass
                    ? customSizeClass
                    : `${sizes[size].width} ${sizes[size].height}`
                } ${sizes[size].fontSize} ${OtpStyles[OtpStates[index]]}`}
                maxLength={1}
                type="text"
                onFocus={() => handleFocus(index)}
                onBlur={(e) => handleBlur(e)}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
                disabled={disabled}
                ref={inputRefs.current[index]}
                name={name}
              />
            </div>
            {(index + 1) % 3 === 0 && index !== inputsCount - 1 && (
              <span className="border-neutral-300 border flex items-center justify-center min-w-[8px] max-w-[8px] border-t-0"></span>
            )}
          </React.Fragment>
        ))}
      </div>

      {hasError ? (
        <p className="mt-2 text-b2 text-red-500 max-w-[300px]">{hasError}</p>
      ) : (
        <p className="mt-2 text-b2 text-red-500 max-w-[300px]">{otpError}</p>
      )}
    </div>
  );
};

export default OtpInput;
