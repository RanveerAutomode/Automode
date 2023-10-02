"use client";

import React, { FC, useEffect, useState, ChangeEvent, useRef } from "react";

import Image, { StaticImageData } from "next/image";
import InfoCircle from "@/public/input-icons/info-circle.svg";
import EyeSlash from "@/public/outline-icons/eye-slash.svg";
import Eye from "@/public/outline-icons/eye.svg";
import { on } from "events";
type InputState = "normal" | "focused" | "hovered" | "disabled" | "error";

interface InputProps {
  id?: string;
  type: string;
  value?: string;
  name?: string;
  labelTop?: string;
  labelBottom?: string;
  placeholderValue?: string;
  iconLeft?: StaticImageData;
  labelLeft?: string;
  iconRight?: StaticImageData;
  labelRight?: string;
  disabled?: boolean;
  hasError?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  separatorLeft?: boolean;
  separatorRight?: boolean;
  size?: "small" | "medium" | "large";
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  autoFocus?: boolean;
  maxLength?: number;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = ({
  id,
  type,
  value,
  name,
  labelTop,
  labelBottom,
  placeholderValue,
  iconLeft,
  labelLeft,
  iconRight,
  labelRight,
  separatorLeft,
  separatorRight,
  onChange,
  onClick,
  disabled = false,
  hasError = false,
  onBlur,
  className,
  size = "medium",
  autoFocus = false,
  maxLength,
  onKeyDown,
}) => {
  const [inputState, setInputState] = useState<InputState>("normal");
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [emailMobile, setEmailMobile] = useState("email");
  const [showPassword, setShowPassword] = useState(false);
  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  const hasLeftContent = iconLeft || labelLeft;
  const hasRightContent = iconRight || labelRight;

  useEffect(() => {
    if (disabled) {
      setInputState("disabled");
    } else if (hasError) {
      setInputState("error");
    } else {
      setInputState("normal");
    }
  }, [disabled, hasError]);

  const handleFocus = () => {
    if (!disabled && !hasError) {
      setInputState("focused");
    }
    setIsFocused(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!disabled && !hasError) {
      setInputState("normal");
    }
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const handleMouseEnter = () => {
    if (!disabled && !hasError && !isFocused) {
      setInputState("hovered");
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!disabled && !hasError && !isFocused) {
      setInputState("normal");
    }
    setIsHovered(false);
  };

  const inputStyles: Record<InputState, string> = {
    normal: "border-neutral-200 bg-white text-neutral-600",
    focused:
      "gradient-border ring-primary-50 ring-[3px] bg-white text-neutral-600",
    hovered: "border-neutral-400 bg-white text-neutral-600",
    disabled:
      "border-neutral-200 bg-neutral-100 text-neutral-600 cursor-not-allowed",
    error: "border-red-500 ring-red-50 ring-[3px]",
  };

  const placeholderTextSize =
    size === "small"
      ? "text-caption"
      : size === "medium"
      ? "text-b2"
      : "text-b1";
  const labelTopTextSize = size === "small" ? "text-caption" : "text-b2";

  const Separator: FC = () => (
    <div
      className={`${
        size === "small"
          ? "h-[30px]"
          : size === "medium"
          ? "h-[38px]"
          : "h-[46px]"
      } border-[0.5px] mr-[8px] ${
        !disabled && isHovered ? "border-neutral-400" : "border-neutral-200"
      }`}
    ></div>
  );

  const validateInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (type === "password" || type === "showPassword") {
      if (e.target.value) {
        e.target.value = e.target.value.replace(/[\s]+/g, "");
      } else {
        return;
      }
    }
    // for email only
    else if (type === "email") {
      const regex = /^[a-zA-Z0-9@._-]+$/;

      if (!regex.test(e.target.value)) {
        e.target.value = e.target.value.replace(/[^a-zA-Z0-9@._]+/g, "");
      }
    }
    // else if(type === "any") {
    //   const regex = /^[a-zA-Z0-9@._-]+$/;

    //   if (!regex.test(e.target.value)) {
    //     e.target.value = e.target.value.replace(/[^a-zA-Z0-9@._]+/g, "");
    //   }
    // }
    // else if (type === "num") {
    //   const regex = /^[0-9]+$/;

    //   if (!regex.test(e.target.value)) {
    //     e.target.value = e.target.value.replace(/[^0-9]+/g, "");
    //   }
    // }
    // for mobile only
    else if (type === "mobile") {
      const regex = /^[0-9]+$/;

      if (!regex.test(e.target.value)) {
        e.target.value = e.target.value.replace(/[^0-9]+/g, "");
      }
    }
    // for emailMobile
    else if (type === "emailMobile") {
      const regex = /^[a-zA-Z0-9@._-]+$/;

      if (!regex.test(e.target.value)) {
        e.target.value = e.target.value.replace(/[^a-zA-Z0-9@._]+/g, "");
      }
    }
    // for number only
    else if (type === "num") {
      const regex = /^[0-9]+$/;

      if (!regex.test(e.target.value)) {
        e.target.value = e.target.value.replace(/[^0-9]+/g, "");
      }
    }
    // for any text
    else if (type === "any") {
    }
    // for gstin number
    else if (type === "gstin") {
      e.target.value = e.target.value.toUpperCase().slice(0, 15);
      const regex = /^[a-zA-Z0-9]+$/;

      if (!regex.test(e.target.value)) {
        e.target.value = e.target.value.replace(/[^A-Z0-9]+/g, "");
      }
    } else if (type === "alphaNumericSpc") {
      // it will only allowed alphanumeric and special characters ",./-"
      const regex = /^[a-zA-Z0-9\s,._/-]+$/;

      if (!regex.test(e.target.value)) {
        e.target.value = e.target.value.replace(/[^a-zA-Z0-9\s,._/-]+/g, "");
      }
    } else {
      const regex = /^[a-zA-Z\s]+$/;

      if (!regex.test(e.target.value)) {
        e.target.value = e.target.value.replace(/[^a-zA-Z\s]+/g, "");
      }
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue.length > 2) {
      if (/^[0-9]+$/.test(inputValue) && type === "emailMobile") {
        return setEmailMobile("mobile");
      } else {
        return setEmailMobile("email");
      }
    } else if (inputValue.length === 0) {
      return setEmailMobile("email");
    }
  };

  return (
    <div className={`${className} flex flex-col items-start w-full`}>
      {labelTop && (
        <label
          className={`mb-1 ${labelTopTextSize} font-medium text-neutral-700`}
          htmlFor={id}
        >
          {labelTop}
        </label>
      )}
      <div
        onClick={() => {
          inputRef.current?.focus();
        }}
        className={`relative flex w-full items-center justify-center border rounded-md px-[12px] cursor-text ${
          size === "small"
            ? "h-[32px]"
            : size === "medium"
            ? "h-[40px]"
            : "h-[48px]"
        } ${inputStyles[inputState]}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {iconLeft && (
          <Image
            className={`mr-[8px] ${
              size === "small"
                ? "min-w-14px"
                : size === "medium"
                ? "min-w-[16px]"
                : "min-w-[18px]"
            }`}
            width={size === "small" ? 14 : size === "medium" ? 16 : 18}
            height={size === "small" ? 14 : size === "medium" ? 16 : 18}
            src={iconLeft}
            alt="iconLeft"
          />
        )}
        {labelLeft && (
          <p className="text-caption font-medium bg-gradient-to-r from-primary-500 to-blue-500 text-transparent bg-clip-text mr-[8px]">
            {labelLeft}
          </p>
        )}
        {hasLeftContent && separatorLeft && <Separator />}
        {type === "mobile" ||
        (emailMobile === "mobile" && value && value.length > 0) ? (
          <p className="text-b2 mr-1">+91</p>
        ) : (
          ""
        )}
        <input
          id={id}
          name={name}
          onKeyDown={onKeyDown}
          onChange={(e) => {
            onChange ? onChange(e) : "";
            handleChange(e);
          }}
          autoComplete="off"
          type={inputType}
          maxLength={
            maxLength
              ? 6
              : type === "password" || type === "showPassword"
              ? 16
              : type === "mobile"
              ? 10
              : 999999999
          }
          className={`${
            inputState === "disabled" ? "cursor-not-allowed bg-transparent" : ""
          } outline-none border-none w-full text-ellipsis placeholder-neutral-300 ${
            iconRight || (hasError && "pr-2.5")
          } ${placeholderTextSize}`}
          placeholder={placeholderValue}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          onInput={validateInput}
          ref={inputRef}
        />
        {hasRightContent && separatorRight && <Separator />}

        {
          <div className="flex gap-0.5">
            {hasError && (
              <Image
                className={`${
                  size === "small"
                    ? "min-w-14px"
                    : size === "medium"
                    ? "min-w-[16px]"
                    : "min-w-[18px]"
                } ${labelRight && "mr-[8px]"}`}
                src={InfoCircle}
                width={size === "small" ? 14 : size === "medium" ? 16 : 18}
                height={size === "small" ? 14 : size === "medium" ? 16 : 18}
                alt="iconRight"
              />
            )}
            {type === "password" && (
              <Image
                onMouseDown={(e) => {
                  e.preventDefault();
                  setShowPassword(!showPassword);
                }}
                className={`${labelRight && "mr-[8px]"} cursor-pointer ${
                  size === "small"
                    ? "min-w-14px"
                    : size === "medium"
                    ? "min-w-[16px]"
                    : "min-w-[18px]"
                }`}
                src={showPassword ? Eye : EyeSlash}
                width={size === "small" ? 14 : size === "medium" ? 16 : 18}
                height={size === "small" ? 14 : size === "medium" ? 16 : 18}
                alt="iconRight"
              />
            )}
            {iconRight && (
              <Image
                onMouseDown={(e) => {
                  e.preventDefault();
                  if (onClick) onClick(e);
                }}
                className={`${labelRight && "mr-[8px]"} cursor-pointer hidden ${
                  size === "small"
                    ? "min-w-14px"
                    : size === "medium"
                    ? "min-w-[16px]"
                    : "min-w-[18px]"
                }`}
                src={iconRight}
                width={size === "small" ? 14 : size === "medium" ? 16 : 18}
                height={size === "small" ? 14 : size === "medium" ? 16 : 18}
                alt="iconRight"
              />
            )}
          </div>
        }

        {labelRight && (
          <p
            className={`text-caption font-medium bg-gradient-to-r from-primary-500 to-blue-500 text-transparent bg-clip-text`}
          >
            {labelRight}
          </p>
        )}
      </div>
      {labelBottom ||
        (hasError && (
          <label
            className={`my-1 text-caption font-medium ${
              inputState === "error" ? "text-red-500" : "text-neutral-600"
            }`}
            htmlFor={id}
          >
            {labelBottom || hasError}
          </label>
        ))}
    </div>
  );
};

export default Input;
