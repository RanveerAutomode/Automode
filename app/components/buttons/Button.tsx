"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import Svg from "../svg/Svg";
import Loader from "../loader/Loader";
import { set } from "lodash";

type ButtonProps = {
  children?: ReactNode;
  leftIcon?: any;
  rightIcon?: any;
  icon?: any;
  size?: "sm" | "md" | "lg";
  color?: "red" | "primary" | "green" | "blue" | "yellow" | "secondary";
  ghost?: boolean;
  disabled?: boolean;
  textButton?: boolean;
  id?: string;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  count?: number;
  ghostBg?: string;
};
const Button: React.FC<ButtonProps> = ({
  children,
  leftIcon,
  rightIcon,
  icon,
  size = "sm",
  color = "primary",
  ghost,
  disabled,
  textButton,
  id,
  type,
  loading,
  className,
  onClick,
  onKeyDown,
  count,
  ghostBg,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [buttonTextColor, setButtonTextColor] = useState("");
  const [textColorChanged, setTextColorChanged] = useState(false);
  const [loadingMode, setLoadingMode] = useState(
    ghost || textButton || (color === "secondary" && isPressed)
      ? "dark"
      : color === "secondary"
      ? "dark"
      : "light"
  );
  const buttonRef = useRef<HTMLButtonElement>(null);

  const loaderColor =
    ghost || textButton || color === "secondary" ? color : "white";
  const centerBgColor = color;

  const handlePress = () => {
    if (loading) return;
    setIsPressed(true);
    setTextColorChanged(true);
    if (ghost && color !== "secondary") {
      setLoadingMode("light");
    }
  };

  const handleRelease = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsPressed(false);
    setTextColorChanged(!textColorChanged);
    if (buttonRef.current) {
      buttonRef.current.blur();
    }
    if (ghost && color !== "secondary") {
      setLoadingMode("dark");
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    setTextColorChanged(!textColorChanged);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setTextColorChanged(!textColorChanged);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setTextColorChanged(!textColorChanged);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTextColorChanged(!textColorChanged);
  };

  const hendleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      buttonRef.current?.click();
      buttonRef.current?.blur();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (buttonRef.current) {
        const computedStyle = getComputedStyle(buttonRef.current);
        const buttonTextColor = computedStyle.color;
        setButtonTextColor(buttonTextColor);
      }
    }, 100);
  }, [textColorChanged, disabled, loading, color, ghost, textButton]);

  useEffect(() => {
    setTimeout(() => {
      handleMouseLeave();
    }, 100);
  }
  , [color]);

  // color styles

  const colorStyles =
    color === "red" && !disabled && !textButton
      ? `focus:ring-red-100 shadow-[0_2px_2px_rgba(252,55,45,0.2)] ${
          ghost
            ? `text-red-500 ${
                !loading && "largeTablet:hover:border-transparent"
              } ${
                !loading && "largeTablet:hover:bg-red-700"
              } border-red-500  focus:bg-red-600 focus:text-white ${
                isPressed && "text-white"
              } ${!loading && "largeTablet:hover:text-white"}`
            : `bg-red-600 ${
                !loading && "largeTablet:hover:bg-red-700"
              } text-white focus:ring-red-100 largeTablet:hover:!text-white`
        } ${isPressed ? "largeTablet:hover:bg-red-800 focus:!bg-red-800" : ""}`
      : color === "green" && !disabled && !textButton
      ? `focus:ring-green-100 shadow-[0_2px_2px_rgba(11,196,110,0.2)] ${
          ghost
            ? `text-green-600 ${
                !loading && "largeTablet:hover:border-transparent"
              } ${
                !loading && "largeTablet:hover:bg-green-700"
              } border-green-600  focus:bg-green-600 focus:text-white ${
                isPressed && "text-white"
              } ${!loading && "largeTablet:hover:text-white"}`
            : `bg-green-600 ${
                !loading && "largeTablet:hover:bg-green-700"
              } text-white focus:ring-green-100 largeTablet:hover:!text-white`
        } ${
          isPressed ? "largeTablet:hover:bg-green-800 focus:!bg-green-800" : ""
        }`
      : color === "blue" && !disabled && !textButton
      ? `focus:ring-blue-100 shadow-[0_2px_2px_rgba(4,118,247,0.2)] ${
          ghost
            ? `text-blue-500 ${
                !loading && "largeTablet:hover:border-transparent"
              } ${
                !loading && "largeTablet:hover:bg-blue-700"
              } border-blue-500  focus:bg-blue-500 focus:text-white ${
                isPressed && "text-white"
              } ${!loading && "largeTablet:hover:text-white"}`
            : `bg-blue-500 ${
                !loading && "largeTablet:hover:bg-blue-700"
              } text-white focus:ring-blue-100 largeTablet:hover:!text-white`
        } ${
          isPressed ? "largeTablet:hover:bg-blue-800 focus:!bg-blue-800" : ""
        }`
      : color === "yellow" && !disabled && !textButton
      ? `focus:ring-yellow-100 shadow-[0_2px_2px_rgba(249,192,4,0.2)] ${
          ghost
            ? `text-yellow-600 ${
                !loading && "largeTablet:hover:border-transparent"
              } ${
                !loading && "largeTablet:hover:bg-yellow-700"
              } border-yellow-600 focus:bg-yellow-600 focus:text-white ${
                isPressed && "text-white"
              } ${!loading && "largeTablet:hover:text-white"}`
            : `bg-yellow-600 ${
                !loading && "largeTablet:hover:bg-yellow-700"
              } text-white focus:ring-yellow-100 largeTablet:hover:!text-white`
        } ${
          isPressed
            ? "largeTablet:hover:bg-yellow-800 focus:!bg-yellow-800"
            : ""
        }`
      : color === "secondary" && !disabled && !textButton
      ? `focus:ring-secondary-100 shadow-[0_2px_2px_rgba(133,146,163,0.2)] ${
          ghost
            ? `text-secondary-700 ${
                !loading && ""
             // "largeTablet:hover:border-transparent"
              } ${
                !loading && "largeTablet:hover:bg-secondary-50"
              } border-secondary-100 focus:ring-secondary-50`
            : `bg-secondary-50 ${
                textButton ? "text-secondary-500" : "text-secondary-700"
              } ${
                !ghost && !loading && "largeTablet:hover:text-white"
              } focus:ring-secondary-100 focus:!bg-secondary-500 focus:text-white ${
                isPressed && "text-white"
              } ${!loading && "largeTablet:hover:bg-secondary-700"}`
        } ${
          isPressed && !ghost && !textButton
            ? "largeTablet:hover:bg-secondary-600 focus:!bg-secondary-600"
            : "focus:!bg-secondary-100"
        }`
      : !disabled &&
        !textButton &&
        `focus:ring-primary-100 ${
          !loading && "largeTablet:hover:text-white"
        } shadow-[0_2px_2px_rgba(95,39,205,0.2)] ${
          ghost
            ? `!ring-primary-500 ${
                ghost &&
                !disabled &&
                !textButton &&
                !isHovered &&
                "gradient-border-primary"
              } ${
                ghost &&
                !disabled &&
                !textButton &&
                isHovered &&
                "gradient-border-primary-hover"
              } text-primary-500 border-primary-500 ${
                !loading && !ghost
                  ? "largeTablet:hover:border-primary-700"
                  : `${
                      color !== "primary" &&
                      !loading &&
                      "largeTablet:hover:border-none"
                    }`
              } focus:bg-primary-500 ${
                !loading && "largeTablet:hover:!bg-primary-700"
              } focus:text-white ${
                isPressed && "text-white gradient-border-primary-clicked"
              }`
            : `bg-gradient-to-r from-primary-500 to-blue-500 text-white ${
                !loading &&
                "largeTablet:hover:bg-gradient-to-r largeTablet:hover:from-primary-700 largeTablet:hover:to-blue-700"
              } largeTablet:hover:!text-white`
        } ${
          isPressed
            ? "largeTablet:hover:!from-primary-800 largeTablet:hover:!to-blue-800 focus:!from-primary-800 focus:!to-blue-800"
            : ""
        }`;

  // size styles

  const sizeStyles =
    size === "md"
      ? `h-[40px] text-b2 ${icon ? "px-[12px]" : "px-[16px]"} gap-[8px]`
      : size === "lg"
      ? `h-[48px] text-subtile ${icon ? "px-[16px]" : "px-[24px]"}  gap-[8px]`
      : `h-[32px] text-caption ${icon ? "px-[10px]" : "px-[12px]"} gap-[4px]`;

  const ghostStyles = ghost ? "bg-white border" : "";

  // disabled styles

  const disabledStyles =
    disabled && !textButton
      ? color === "red"
        ? "bg-red-50 text-red-100 border-red-100"
        : color === "blue"
        ? "bg-blue-50 text-blue-100 border-blue-100"
        : color === "yellow"
        ? "bg-yellow-50 text-yellow-200 border-yellow-200"
        : color === "green"
        ? "bg-green-50 text-green-200 border-green-200"
        : color === "secondary"
        ? "bg-secondary-50 text-secondary-200 border-secondary-200"
        : "bg-gradient-to-r from-primary-50 to-blue-50 text-primary-100 border-primary-100"
      : "";

  const disabledTextStyles =
    (disabled && textButton) || ghost
      ? color === "red"
        ? "text-red-100"
        : color === "blue"
        ? "text-blue-100"
        : color === "yellow"
        ? "text-yellow-200"
        : color === "green"
        ? "text-green-200"
        : color === "secondary"
        ? "text-secondary-200"
        : "text-primary-100"
      : "";

  // text button styles

  const textButtonStyles =
    textButton && !disabled
      ? color === "red"
        ? `text-red-500 ${
            !loading &&
            "largeTablet:hover:text-red-700 largeTablet:hover:bg-red-50 largeTablet:hover:shadow-[0_2px_2px_rgba(252,55,45,0.2)]"
          } focus:ring-red-100 ${isPressed ? "!text-red-900 !bg-red-100" : ""}`
        : color === "blue"
        ? `text-blue-500 ${
            !loading &&
            "largeTablet:hover:text-blue-700 largeTablet:hover:bg-blue-50 largeTablet:hover:shadow-[0_2px_2px_rgba(4,118,247,0.2)]"
          } focus:ring-blue-100 ${
            isPressed ? "!text-blue-900 !bg-blue-100" : ""
          } `
        : color === "yellow"
        ? `text-yellow-600 ${
            !loading &&
            "largeTablet:hover:text-yellow-700 largeTablet:hover:bg-yellow-50 largeTablet:hover:shadow-[0_2px_2px_rgba(249,192,4,0.2)]"
          } focus:ring-yellow-100 ${
            isPressed ? "!text-yellow-900 !bg-yellow-100" : ""
          } `
        : color === "green"
        ? `text-green-600 ${
            !loading &&
            "largeTablet:hover:text-green-700 largeTablet:hover:bg-green-50 largeTablet:hover:shadow-[0_2px_2px_rgba(11,196,110,0.2)]"
          } focus:ring-green-100 ${
            isPressed ? "!text-green-900 !bg-green-100" : ""
          } `
        : color === "secondary"
        ? `text-secondary-500  ${
            !loading &&
            "largeTablet:hover:bg-secondary-50 largeTablet:hover:text-secondary-700 largeTablet:hover:shadow-[0_2px_2px_rgba(133,146,163,0.2)]"
          } focus:ring-secondary-100 ${
            isPressed ? "!text-secondary-900 !bg-secondary-100" : ""
          } `
        : ` ${
            !loading &&
            "largeTablet:hover:bg-gradient-to-r  largeTablet:hover:shadow-[0_2px_2px_rgba(95,39,205,0.2)]"
          } ${
            !isPressed && "from-primary-50 to-blue-50"
          } focus:ring-primary-100 ${
            isPressed
              ? "!bg-gradient-to-r from-primary-100 to-blue-100"
              : ""
          } `
      : "";

  const primaryGradientStyles = {
    id: "myGradient",
    colors: ["#5f27cd", "#0476f7"],
    direction: "horizontal" as const,
  };

  return (
    <button
      onKeyDown={onKeyDown}
      id={id}
      type={type}
      onClick={onClick}
      onKeyDownCapture={hendleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={buttonRef}
      disabled={disabled}
      className={`${className} ${colorStyles} ${sizeStyles} ${ghostStyles} ${disabledStyles}
      ${textButtonStyles}
      ${disabled && "cursor-not-allowed"}
      ${disabledTextStyles}
      ${!isPressed ? "focus:ring" : ""}
      ${
        ghost &&
        color === "secondary" &&
        !disabled &&
        "shadow-[0_1px_2px_rgba(133,146,163,0.2)]"
      }

      rounded-md font-medium flex items-center justify-center outline-none w-[100%] transition-all duration-100 ${
        ghost && color === "primary" && "!p-0 border-none"
      }`}
      onMouseDown={handlePress}
      onMouseUp={handleRelease}
    >
      {ghost && color === "primary" ? (
        <div
          className={`${sizeStyles} w-full flex items-center  justify-center h-full rounded-[7px] ${ghostBg ? ghostBg : "bg-white"} ${
            (isHovered || isFocused) && !loading && "!bg-transparent"
          } trasition-all duration-200`}
        >
          {loading && (
            <Loader
              size={size}
              mode={loadingMode as "dark" | "light" | undefined}
              color={loaderColor}
              isPressed={isPressed}
              textButton={textButton}
              ghost={ghost}
              centerBg={centerBgColor}
            />
          )}

          {leftIcon ? (
            <Svg
              icon={leftIcon}
              {...(!isHovered &&
                !isFocused &&
                ghost &&
                color === "primary" ? { gradient: primaryGradientStyles } : { iconColor: buttonTextColor })}
              width={size === "md" ? 14 : size === "lg" ? 16 : 12}
              height={size === "md" ? 14 : size === "lg" ? 16 : 12}
            />
          ) : null}

          {children && !icon ? (
            <span
              className={`${
                (isFocused || isHovered) && !loading && "!text-white"
              }  bg-gradient-to-r from-primary-500 to-blue-500 bg-clip-text text-transparent whitespace-nowrap`}
            >
              {children}
            </span>
          ) : (
            <span className={`hidden`}>icon</span>
          )}

          {
            count  && (
              <div className={`w-[18px] h-[18px] flex items-center justify-center text-caption font-medium text-white rounded-full ${isHovered ? "bg-white" : "bg-gradient-primary-500"}`}><p className={`${isHovered && "text-gradient-primary-500"}`}>{count}</p></div>
            )
          }

          {rightIcon ? (
            <Svg
              icon={rightIcon}
              {...(!isHovered &&
                !isFocused &&
                ghost ?
                color === "primary" && { gradient: primaryGradientStyles } : {iconColor: buttonTextColor})}
              width={size === "md" ? 14 : size === "lg" ? 16 : 12}
              height={size === "md" ? 14 : size === "lg" ? 16 : 12}
            />
          ) : null}
          {icon && !loading ? (
            <div>
            <Svg
              icon={icon}
              iconColor={buttonTextColor}
              width={size === "md" ? 14 : size === "lg" ? 16 : 12}
              height={size === "md" ? 14 : size === "lg" ? 16 : 12}
            />
            </div>
          ) : null}
        </div>
      ) : (
        <>
          {loading && (
            <Loader
              size={size}
              mode={loadingMode as "dark" | "light" | undefined}
              color={loaderColor}
              isPressed={isPressed}
              textButton={textButton}
              ghost={ghost}
              centerBg={centerBgColor}
            />
          )}

          {leftIcon ? (
            <Svg
              icon={leftIcon}
              {...(
                textButton ?
                 { gradient: primaryGradientStyles } : {iconColor: buttonTextColor})}
              width={size === "md" ? 14 : size === "lg" ? 16 : 16}
              height={size === "md" ? 14 : size === "lg" ? 16 : 16}
            />
          ) : null}

          {children && !icon ? (
            <span
              className={` ${
                textButton &&
                color === "primary" &&
                "bg-gradient-to-r from-primary-500 to-blue-500 bg-clip-text text-transparent"
              } transition-all duration-400 whitespace-nowrap`}
            >
              {children}
            </span>
          ) : (
            <span className={`hidden`}>icon</span>
          )}
          {rightIcon ? (
            <Svg
              icon={rightIcon}
              {...(
                textButton ?
                color === "primary" && { gradient: primaryGradientStyles } : {iconColor: buttonTextColor})}

              width={size === "md" ? 14 : size === "lg" ? 16 : 16}
              height={size === "md" ? 14 : size === "lg" ? 16 : 16}
            />
          ) : null}
          {icon && !loading ? (
            <Svg
              icon={icon}
              iconColor={buttonTextColor}
              width={size === "md" ? 14 : size === "lg" ? 16 : 16}
              height={size === "md" ? 14 : size === "lg" ? 16 : 16}
            />
          ) : null}
        </>
      )}
    </button>
  );
};

export default Button;
