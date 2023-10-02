"use client";

import React, { createRef, useEffect, useState } from "react";
import Image from "next/image";

import useStepsStore from "@/app/store/stepsStore";

import Check from "@/public/solid-icons/checkmark.svg";

interface RefObject {
  [key: number]: React.RefObject<HTMLDivElement>;
}

export const sidebarData = [
  {
    key: "0",
    title: "Profile",
    description: "Organization details",
  },
  {
    key: "1",
    title: "Locations",
    description: "Supporting Text",
  },
  {
    key: "2",
    title: "Applications",
    description: "Supporting Text",
  },
  {
    key: "3",
    title: "Roles & Hierarchies",
    description: "Supporting Text",
  },
  {
    key: "4",
    title: "Users",
    description: "Supporting Text",
  },
  {
    key: "5",
    title: "Taxes",
    description: "Supporting Text",
  },
  {
    key: "6",
    title: "Automation",
    description: "Supporting Text",
  },
];

const FormSidebar = () => {
  const { currentStep, completedSteps, setCurrentStep } = useStepsStore();

  const refs: RefObject = sidebarData.reduce((acc: RefObject, value, index) => {
    acc[index] = React.createRef();
    return acc;
  }, {});

  useEffect(() => {
    refs[currentStep].current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [currentStep]);

  return (
    <div className="flex flex-col border-t border-neutral-100 tablet:border-none bg-white max-tablet:flex-row justify-start p-6 max-largeTablet:px-8 max-tablet:px-8 max-tablet:py-4 shadow-xs-3 -m-2 min-w-[220px] max-tablet:min-w-screen w-[220px] max-tablet:w-screen max-tablet:overflow-auto scrollbar-hidden h-screen max-tablet:h-auto z-20">
      {sidebarData.map((item, index) => (
        <div
          ref={refs[index]}
          onClick={() => {
            if (completedSteps[index]) {
              setCurrentStep(index);
            }
          }}
          className={`flex flex-col mb-[34px] max-tablet:mb-0 max-tablet:justify-center relative ${
            completedSteps[index] ? "cursor-pointer" : ""
          }`}
        >
          <div className="flex gap-2 max-tablet:items-center mr-2">
            <div
              className={`w-8 h-8 min-w-[32px] rounded-full ${
                completedSteps[index]
                  ? "bg-green-100"
                  : currentStep === index
                  ? "bg-gradient-primary-100"
                  : "bg-secondary-300"
              } flex items-center justify-center`}
            >
              <div
                className={`w-[18px] h-[18px] ${
                  completedSteps[index]
                    ? "bg-green-500"
                    : currentStep === index
                    ? "bg-gradient-primary-50"
                    : "bg-secondary-50"
                } rounded-full flex items-center justify-center`}
              >
                <h1
                  className={`text-caption font-medium ${
                    currentStep === index
                      ? "text-gradient-primary-500"
                      : "text-secondary-600"
                  }`}
                >
                  {completedSteps[index] ? (
                    <Image src={Check} alt="check" />
                  ) : (
                    index + 1
                  )}
                </h1>
              </div>
            </div>
            <div className="flex flex-col max-tablet:flex-row min-w-max">
              <h1
                className={`text-b2 font-medium min-w-max ${
                  currentStep === index
                    ? "text-neutral-600"
                    : "text-neutral-500"
                }`}
              >
                {item.title}
              </h1>
              <p
                className={`text-caption max-tablet:hidden ${
                  currentStep === index
                    ? "text-neutral-400"
                    : "text-neutral-300"
                }`}
              >
                {item.description}
              </p>
            </div>
            <div
              style={{
                display: index === sidebarData.length - 1 ? "none" : "block",
              }}
              className={`sidebar-line tablet:!hidden ${
                completedSteps[index]
                  ? "border-t-[1px] border-green-300"
                  : "border-t-[1px] border-dashed border-neutral-400"
              } w-[30px]`}
            ></div>
          </div>
          <div
            style={{
              display: index === sidebarData.length - 1 ? "none" : "block",
            }}
            className={`sidebar-line max-tablet:!hidden absolute top-[52px] left-[1px] w-[30px] rotate-90 ${
              completedSteps[index]
                ? "border-t-[1px] border-green-300"
                : "border-t-[1px] border-dashed border-neutral-400"
            }`}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default FormSidebar;
