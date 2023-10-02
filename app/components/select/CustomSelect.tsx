"use client";

import React, { FC, useRef, useState, useEffect } from "react";
import "./CustomSelect.css";
import { Select, Spin } from "antd";
import type { SelectProps } from "antd/es/select";
import Image, { StaticImageData } from "next/image";
// import debounce from "lodash/debounce";
import Box from "@/public/input-icons/box.svg";
import ArrowDown from "@/public/custom-select/arrow-down.svg";
import SearchNormal from "@/public/custom-select/search-normal.svg";
import Avatar from "@/public/custom-select/avatar.svg";
import TickCircle from "@/public/custom-select/tick-circle.svg";
import InfoCircle from "@/public/input-icons/info-circle.svg";
import DotAndNumbers from "@/public/custom-select/dot-and-numbers.svg";
import Svg from "../svg/Svg";

export interface CustomSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, "options" | "children"> {
  options: ValueType[];
  debounceTimeout?: number;
  disabled?: boolean;
  hasError?: string | boolean;
  size?: "small" | "middle" | "large";
  selectMode?: "single" | "multiple";
  labelTop?: string;
  labelBottom?: string;
  iconLeft?: string;
  iconRight?: string;
  labelLeft?: string;
  labelRight?: string;
  separatorLeft?: boolean;
  separatorRight?: boolean;
  LeftOptionIcon?: string;
  RightOptionIcon?: string;
  avatar?: string;
  leftBadgeValue?: string | number;
  rightBadgeValue?: string | number;
  showValue?: boolean;
  className?: string;
  value?: ValueType | ValueType[] | null;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

type InputState =
  | "normal"
  | "focused"
  | "hovered"
  | "disabled"
  | "error"
  | "focusedWrapper";

const inputStyles: Record<InputState, string> = {
  normal: "border-neutral-200 bg-white text-neutral-600",
  focused:
    "gradient-border ring-primary-50 ring-[3px] bg-white text-neutral-600",
  hovered: "border-neutral-400 bg-white text-neutral-600",
  disabled:
    "border-neutral-200 bg-neutral-100 text-neutral-600 cursor-not-allowed",
  error: "border-red-500 ring-red-50 ring-[3px]",
  focusedWrapper: "bg-gradient-to-r from-primary-500 to-blue-500",
};

export type ValueType = {
  key?: string;
  label: React.ReactNode;
  value: string | number;
  LeftOptionIcon?: string;
  RightOptionIcon?: string;
  avatar?: string;
  leftBadgeValue?: string | number;
  rightBadgeValue?: string | number;
};

const CustomSelect = <T extends ValueType = ValueType>({
  options: initialOptions,
  disabled = false,
  hasError = false,
  size = "middle",
  selectMode = "single",
  labelTop,
  labelBottom,
  iconLeft,
  iconRight,
  labelLeft,
  labelRight,
  separatorLeft,
  separatorRight,
  LeftOptionIcon,
  RightOptionIcon,
  avatar,
  value,
  leftBadgeValue,
  rightBadgeValue,
  showValue = false,
  className,
  onBlur,
  ...props
}: CustomSelectProps<ValueType>) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [inputState, setInputState] = useState<InputState>("normal");
  const [hoveredOption, setHoveredOption] = useState<string | number | null>(
    null
  );
  const [selectedOption, setSelectedOption] = useState<
    ValueType | ValueType[] | null
  >(selectMode === "multiple" ? [] : null);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<ValueType[]>([]);

  const hasLeftContent = iconLeft || labelLeft;
  const hasRightContent = iconRight || labelRight;

  useEffect(() => {
    if (value === null) {
      setSelectedOption(null);
    }
  }, [value]);

  useEffect(() => {
    setOptions(initialOptions);
  }, [initialOptions]);

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
    onBlur && onBlur(e);
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

  const Separator: FC = () => (
    <div
      className={`
      ${
        size === "small"
          ? "h-[30px]"
          : size === "middle"
          ? "h-[38px]"
          : "h-[46px]"
      } border-[0.5px] mx-2 ${
        !disabled && isHovered ? "border-neutral-400" : "border-neutral-200"
      }`}
    ></div>
  );

  const labelTopTextSize = size === "small" ? "text-caption" : "text-b2";

  const modifiedOptions = options.map((option) => {
    const {
      label = "",
      value = "",
      LeftOptionIcon: OptionIconLeft = LeftOptionIcon,
      RightOptionIcon: OptionIconRight = RightOptionIcon,
      avatar: OptionAvatar = avatar,
      leftBadgeValue: OptionBadgeLeft = leftBadgeValue,
      rightBadgeValue: OptionBadgeRight = rightBadgeValue,
    } = option;

    const gradient = {
      id: "myGradient",
      colors: ["#5f27cd", "#0476f7"],
      direction: "horizontal" as const,
    };

    return {
      ...option,
      labelString: String(option.label), // Keep a string version of the label for filtering
      label: (
        <div
          onMouseEnter={() => setHoveredOption(option.value)}
          onMouseLeave={() => setHoveredOption(null)}
          className={`flex items-center gap-3 
        `}
        >
          {OptionIconLeft && (
            <Svg
              icon={OptionIconLeft}
              {...(selectedOption &&
              "value" in selectedOption &&
              selectedOption.value === option.value
                ? { gradient: gradient }
                : { color: "text-neutral-600" })}
              width={size === "small" ? 14 : size === "middle" ? 16 : 18}
              height={size === "small" ? 14 : size === "middle" ? 16 : 18}
            />
          )}
          {OptionBadgeLeft && (
            <div
              className={`rounded-full flex items-center justify-center text-caption font-medium ${
                selectedOption &&
                "value" in selectedOption &&
                selectedOption.value === option.value
                  ? "bg-gradient-to-r from-primary-500 to-blue-500 text-white"
                  : hoveredOption === option.value
                  ? "bg-secondary-500 text-white"
                  : "bg-secondary-50 text-secondary-600"
              } ${
                size === "small"
                  ? "h-[14px] w-[14px] min-w-[14px]"
                  : size === "middle"
                  ? "h-[16px] w-[16px] min-w-[16px]"
                  : "h-[18px] w-[18px] min-w-[18px]"
              }`}
            >
              {OptionBadgeLeft}
            </div>
          )}
          {OptionAvatar && (
            <Image width={32} height={32} src={OptionAvatar} alt="avatar" />
          )}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              className={`${
                selectedOption &&
                "value" in selectedOption &&
                selectedOption.value === option.value
                  ? "text-primary-500"
                  : "text-neutral-600"
              } text-b2`}
            >
              {label}
            </span>
            {showValue && (
              <span className="text-caption text-neutral-500">{value}</span>
            )}
          </div>
          {OptionIconRight && (
            <Svg
              icon={OptionIconLeft}
              {...(selectedOption &&
              "value" in selectedOption &&
              selectedOption.value === option.value
                ? { gradient: gradient }
                : { color: "text-neutral-600" })}
              width={size === "small" ? 14 : size === "middle" ? 16 : 18}
              height={size === "small" ? 14 : size === "middle" ? 16 : 18}
            />
          )}
          {OptionBadgeRight && (
            <div
              className={`rounded-full flex items-center justify-center text-caption font-medium ${
                selectedOption &&
                "value" in selectedOption &&
                selectedOption.value === option.value
                  ? "bg-gradient-to-r from-primary-500 to-blue-500 text-white"
                  : hoveredOption === option.value
                  ? "bg-secondary-500 text-white"
                  : "bg-secondary-50 text-secondary-600"
              } ${
                size === "small"
                  ? "h-[14px] w-[14px] min-w-[14px]"
                  : size === "middle"
                  ? "h-[16px] w-[16px] min-w-[16px]"
                  : "h-[18px] w-[18px] min-w-[18px]"
              }`}
            >
              {OptionBadgeRight}
            </div>
          )}
        </div>
      ),
    };
  });

  return (
    <div
      className={`flex flex-col items-start justify-between w-full ${className}`}
    >
      {labelTop && (
        <label
          className={`mb-1 ${labelTopTextSize} font-medium text-neutral-700`}
        >
          {labelTop}
        </label>
      )}
      <div
        ref={wrapperRef}
        className={`relative flex w-full items-center justify-between border rounded-md px-[12px] custom-select ${
          size === "small"
            ? "min-h-[32px]"
            : size === "middle"
            ? "min-h-[40px]"
            : "min-h-[48px]"
        } ${inputStyles[inputState]}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {iconLeft && (
          <Image
            className={`${
              !labelLeft && separatorLeft ? "mr-[0px]" : "mr-[8px]"
            }`}
            width={size === "small" ? 14 : size === "middle" ? 16 : 18}
            height={size === "small" ? 14 : size === "middle" ? 16 : 18}
            src={iconLeft}
            alt="iconLeft"
          />
        )}
        {labelLeft && (
          <p
            className={`text-caption font-medium bg-gradient-to-r from-primary-500 to-blue-500 text-transparent bg-clip-text ${
              !separatorLeft ? "mr-[8px]" : ""
            }`}
          >
            {labelLeft}
          </p>
        )}
        {hasLeftContent && separatorLeft && <Separator />}
        <Select
          optionLabelProp="labelString"
          getPopupContainer={() => wrapperRef.current || document.body}
          className={`text-caption min-w-[80px] w-full placeholder-neutral-300 ${
            inputState === "disabled" ? "cursor-not-allowed bg-transparent" : ""
          }`}
          //   dropdownRender={(menu) => <div className="">{menu}</div>}
          dropdownStyle={{ width: "100%" }}
          labelInValue
          filterOption={(input, option) =>
            option?.labelString.toLowerCase().includes(input.toLowerCase())
          }
          notFoundContent={fetching ? <Spin size="small" /> : null}
          {...props}
          options={modifiedOptions}
          onDropdownVisibleChange={setOpen}
          suffixIcon={
            <Image
              width={size === "small" ? 14 : size === "middle" ? 16 : 18}
              height={size === "small" ? 14 : size === "middle" ? 16 : 18}
              src={open ? SearchNormal : ArrowDown}
              alt="dropdown icon"
            />
          }
          dropdownRender={(menu) => (
            <div onMouseLeave={() => setHoveredOption(null)}>{menu}</div>
          )}
          placeholder={open ? "Type here..." : "Select"}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          mode={selectMode === "multiple" ? "multiple" : undefined}
          showSearch
          onChange={(value) => {
            if (selectMode === "multiple") {
              if (Array.isArray(value)) {
                setSelectedOption(value);
              } else {
                setSelectedOption([]);
              }
            } else {
              setSelectedOption(value);
            }
            props.onChange && props.onChange(value, options);
          }}
          value={value ? value : selectedOption}
          maxTagCount={2}
          maxTagPlaceholder={
            Array.isArray(selectedOption) && selectedOption.length > 1
              ? `+${selectedOption.length - 2} more...`
              : ""
          }
        />
        {hasRightContent && separatorRight && <Separator />}
        {hasError ? (
          <Image
            className={`${separatorRight ? "ml-0" : "ml-2"} ${
              size === "small"
                ? "min-w-[14px]"
                : size === "middle"
                ? "min-w-[16px]"
                : "min-w-[18px]"
            }`}
            src={InfoCircle}
            width={size === "small" ? 14 : size === "middle" ? 16 : 18}
            height={size === "small" ? 14 : size === "middle" ? 16 : 18}
            alt="iconRight"
          />
        ) : iconRight ? (
          <Image
            className={`${separatorRight ? "ml-0" : "ml-2"} ${
              size === "small"
                ? "min-w-[14px]"
                : size === "middle"
                ? "min-w-[16px]"
                : "min-w-[18px]"
            }`}
            src={iconRight}
            width={size === "small" ? 14 : size === "middle" ? 16 : 18}
            height={size === "small" ? 14 : size === "middle" ? 16 : 18}
            alt="iconRight"
          />
        ) : null}
        {labelRight && (
          <p
            className={`text-caption font-medium bg-gradient-to-r from-primary-500 to-blue-500 text-transparent bg-clip-text ${
              iconRight && "ml-[8px]"
            }`}
          >
            {labelRight}
          </p>
        )}
      </div>
      {/* </div> */}
      {labelBottom ||
        (hasError && (
          <label
            className={`my-1 text-caption font-medium ${
              inputState === "error" ? "text-red-500" : "text-neutral-600"
            }`}
          >
            {labelBottom || hasError}
          </label>
        ))}
    </div>
  );
};

export default CustomSelect;
