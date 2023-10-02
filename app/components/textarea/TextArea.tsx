"use client";

import React, { FC, useState, useEffect } from "react";

type TextAreaState = "normal" | "focused" | "hovered" | "disabled" | "error";

interface TextAreaProps {
  id?: string;
  labelTop?: string;
  labelBottom?: string;
  placeholderValue: string;
  disabled?: boolean;
  hasError?: boolean;
  className?: string;
  value?: string;
  resize?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: FC<TextAreaProps> = ({
  id,
  labelTop,
  labelBottom,
  placeholderValue,
  onChange,
  value,
  disabled = false,
  hasError = false,
  className,
  resize,
  ...props
}) => {
  const [textAreaState, setTextAreaState] = useState<TextAreaState>("normal");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (disabled) {
      setTextAreaState("disabled");
    } else if (hasError) {
      setTextAreaState("error");
    } else {
      setTextAreaState("normal");
    }
  }, [disabled, hasError]);

  const handleFocus = () => {
    if (!disabled && !hasError) {
      setTextAreaState("focused");
    }
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (!disabled && !hasError) {
      setTextAreaState("normal");
    }
    setIsFocused(false);
  };

  const handleMouseEnter = () => {
    if (!disabled && !hasError && !isFocused) {
      setTextAreaState("hovered");
    }
  };

  const handleMouseLeave = () => {
    if (!disabled && !hasError && !isFocused) {
      setTextAreaState("normal");
    }
  };

  const textAreaStyles: Record<TextAreaState, string> = {
    normal: "border-neutral-200 bg-white text-neutral-600",
    focused:
      "gradient-border-input ring-primary-50 ring-[3px] bg-white text-neutral-600",
    hovered: "border-neutral-400 bg-white text-neutral-600",
    disabled:
      "border-neutral-200 bg-neutral-100 text-neutral-600 cursor-not-allowed",
    error: "border-red-500 ring-red-50 ring-[3px]",
  };

  return (
    <div
      className={`flex flex-col items-start w-full max-w-[330px] ${className}`}
    >
      {labelTop && (
        <label
          className="mb-1 font-medium text-neutral-700 text-b2"
          htmlFor={id}
        >
          {labelTop}
        </label>
      )}
      <div
        className={`relative flex w-full items-start overflow-hidden justify-center border rounded-md ${textAreaStyles[textAreaState]}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <textarea
          value={value}
          id={id}
          name={id}
          onChange={onChange}
          className={`${
            textAreaState === "disabled"
              ? "cursor-not-allowed bg-transparent"
              : ""
          } outline-none h-[96px] text-b2 py-2 px-2 border-none w-full placeholder-neutral-300`}
          placeholder={placeholderValue}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{ resize: resize ? "both" : "none" }}
        />
      </div>
      {labelBottom && (
        <label
          className={`my-1 text-caption font-medium ${
            textAreaState === "error" ? "text-red-500" : "text-neutral-600"
          }`}
          htmlFor={id}
        >
          {labelBottom}
        </label>
      )}
    </div>
  );
};

export default TextArea;
