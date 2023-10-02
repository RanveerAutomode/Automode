"use client";

import Button from "../buttons/Button";
import Image from "next/image";
import { useEffect, useState } from "react";
import Breadcrumb from "../breadcrumb/Breadcrumb";

import Grid from "@/public/outline-icons/grid.svg";
import List from "@/public/outline-icons/list.svg";
import Icon2 from "@/public/table-search-filter/columns.svg";
import AddIcon from "@/public/outline-icons/add-square.svg";

type Props = {
  title: string;
  notificationCount?: number;
  handleActionClick?: () => void;
  actionButtonText?: string;
  viewMode?: "grid" | "table" | "card";
  onViewChange?: (viewMode: "grid" | "table") => void;
  breadcrumbItems?: { title: string; href: string; iconLeft?: any }[];
  className?: string;
};

const ContentHeader: React.FC<Props> = ({
  title,
  notificationCount,
  handleActionClick,
  actionButtonText,
  viewMode,
  onViewChange,
  breadcrumbItems,
  className,
}) => {
  const [activeViewMode, setActiveViewMode] = useState<"grid" | "table">(
    "table"
  );

  const [currentNumber, setCurrentNumber] = useState(0);
  const stepSize = notificationCount && notificationCount / 500;

  useEffect(() => {
    if (stepSize === undefined || notificationCount === undefined) return;
    const startTime = Date.now();

    const animationInterval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const nextNumber = Math.round(stepSize * elapsedTime);

      if (nextNumber <= notificationCount) {
        setCurrentNumber(nextNumber);
      } else {
        setCurrentNumber(notificationCount);
        clearInterval(animationInterval);
      }
    }, 16);

    return () => {
      clearInterval(animationInterval);
    };
  }, [notificationCount]);

  return (
    <div
      className={`flex justify-between items-center max-mobile:mb-2 ${className} ${
        viewMode === "card" || viewMode === "grid" || viewMode === "table"
          ? "py-6 mt-[-16px] mobile:mt-[-32px] largeTablet:mt-[-24px] px-4 mx-[-16px] mobile:-mr-[14px] tablet:-mr-3 largeTablet:-mr-4 largeTablet:mx-[-16px] z-10 sticky bg-neutral-100 top-0 "
          : "mb-6"
      }`}
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-subtitle mobile:text-title text-neutral-700 font-medium">
          {title}{" "}
          {notificationCount !== undefined && notificationCount > 0 ? (
            <span className="text-neutral-400">({currentNumber})</span>
          ) : null}
        </h1>
        {breadcrumbItems && (
          <div className="hidden mobile:block">
            <Breadcrumb items={breadcrumbItems} iconLeft />
          </div>
        )}
      </div>
      <div className="flex items-center gap-3">
        {(viewMode === "grid" || viewMode === "table") && (
          <>
            <div className="flex  w-max bg-neutral-200 p-1 rounded-md relative cursor-pointer">
              <div
                className={`absolute ${
                  activeViewMode === "grid" ? "ml-0" : "ml-8"
                } transition-all duration-300 w-8 h-8 rounded-md z-[1] bg-white shadow-xs-1`}
              ></div>
              <div
                className="p-1.5 z-[2]"
                onClick={() => {
                  setActiveViewMode("grid");
                  if (onViewChange) onViewChange("grid");
                }}
              >
                <Image src={Grid} alt="icon" />
              </div>
              <div
                className="p-1.5 z-[2]"
                onClick={() => {
                  setActiveViewMode("table");
                  if (onViewChange) {
                    onViewChange("table");
                  }
                }}
              >
                <Image src={List} alt="icon" />
              </div>
            </div>
            <div className="h-7 border-r "></div>
          </>
        )}

        {actionButtonText && (
          <div>
            <Button
              size="md"
              ghost
              onClick={handleActionClick}
              leftIcon={AddIcon}
              ghostBg="bg-neutral-100"
            >
              <span>
                Add{" "}
                <span className="hidden mobile:inline">{actionButtonText}</span>
              </span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
export default ContentHeader;
