"use client";

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

type Size = "sm" | "md" | "lg" | "xl";

const ProgressBar: React.FC<{
  color?: string;
  showPercentage?: string;
  progress: number;
  showPercent?: boolean;
  isCircular?: boolean;
  size?: Size;
}> = ({
  color = "blue",
  showPercentage = "end",
  progress = 0,
  showPercent = false,
  isCircular = false,
  size = "md",
}) => {
  const radius = 26.5;
  const circumference = radius * 2 * Math.PI;

  const [animatedWidth, setAnimatedWidth] = useState(0);
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const [animatedStrokeDashoffset, setAnimatedStrokeDashoffset] =
    useState(circumference);

  useEffect(() => {
    let counter = 0;
    const strokeDecrement = circumference / 100;
    const interval = setInterval(() => {
      if (counter <= progress) {
        setAnimatedWidth(counter);
        setAnimatedStrokeDashoffset(circumference - strokeDecrement * counter);
        setAnimatedPercentage(counter);
        counter++;
      } else {
        clearInterval(interval);
      }
    }, 5); // Change this to control the speed of the animation

    // Cleanup function
    return () => clearInterval(interval);
  }, [progress, circumference]);

  const colorValue =
    color === "gradient"
      ? `bg-gradient-to-r from-primary-500 to-blue-500`
      : `bg-${color}-500`;

  const percentageText = `${progress}%`;

  const barWidth = showPercentage === "end" ? `${100 - 2}%` : "100%"; // 2% space for percentage text

  const strokeDashoffset = circumference - (progress / 100) * circumference;

  //   const sizeMap: { [key in Size]: string } = {
  //     sm: "64px",
  //     md: "78px",
  //     lg: "84px",
  //     xl: "96px",
  //   };

  return (
    <div className="w-full flex items-center justify-center">
      {isCircular ? (
        <div
          className={`inline-flex items-center justify-center overflow-hidden rounded-full ${
            size === "sm"
              ? "w-[64px] h-[64px]"
              : size === "md"
              ? "w-[78px] h-[78px]"
              : size === "lg"
              ? "w-[84px] h-[84px]"
              : "w-[96px] h-[96px]"
          }`}
        >
          <svg preserveAspectRatio="xMidYMid meet" viewBox="7 7 66 66">
            <defs>
              <linearGradient id="gradient" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#5F27CD" />
                <stop offset="100%" stopColor="#3366FF" />
              </linearGradient>
            </defs>
            <circle
              className="text-gray-300 "
              strokeWidth="5.5"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="40"
              cy="40"
              transform="rotate(-90 40 40) "
            />
            <circle
              strokeWidth="5.5"
              strokeDasharray={circumference}
              strokeDashoffset={animatedStrokeDashoffset}
              strokeLinecap="round"
              stroke="url(#gradient)"
              fill="transparent"
              r={radius}
              cx="40"
              cy="40"
              transform="rotate(-90 40 40) "
            />
          </svg>

          {showPercent && (
            <span
              className={`absolute ${
                size === "lg"
                  ? "text-b1"
                  : size === "xl"
                  ? "text-subtitle"
                  : "text-b2"
              } text-neutral-700`}
            >
              {animatedPercentage}%
            </span>
          )}
        </div>
      ) : (
        <>
          <div className="w-full">
            {showPercent && showPercentage === "top-end" && (
              <div className="flex justify-end mb-1">
                <span
                  className={`text-sm self-end font-medium text-neutral-600`}
                >
                  {animatedPercentage}%
                </span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <div
                className={`${colorValue} h-2 rounded-full`}
                style={{ width: `${animatedWidth}%` }}
              >
                <div
                  className={`${colorValue} h-2 rounded-full`}
                  style={{ width: percentageText }}
                ></div>
              </div>
              {showPercent && showPercentage === "end" && (
                <div className="pl-2">
                  <span
                    className={`text-sm self-end font-medium text-neutral-600`}
                  >
                    {animatedPercentage}%
                  </span>
                </div>
              )}
            </div>
            {showPercent && showPercentage === "bot-end" && (
              <div className="flex justify-end mt-1">
                <span
                  className={`text-sm self-end font-medium text-neutral-600`}
                >
                  {animatedPercentage}%
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

ProgressBar.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "green",
    "blue",
    "yellow",
    "red",
    "gradient",
  ]),
  showPercentage: PropTypes.oneOf(["none", "end", "top-end", "bot-end"]),
  progress: PropTypes.number.isRequired,
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
};

export default ProgressBar;

// Uses

// import ProgressBar from "../components/progress-bar/ProgressBar";

//   return (
//     <div className="w-full h-20 bg-white rounded-lg flex items-center justify-center px-5">
//       <ProgressBar
//         color="green"
//         showPercentage="top-end"
//         progress={100}
//         showPercent
//         // isCircular
//         size="md"
//       />
//     </div>
//   );
