"use client";

import React, { useState, ReactNode } from "react";
import Svg from "../svg/Svg";

type Tab = {
  label: string;
  icon?: ReactNode;
  count?: number;
};

type TabsProps = {
  tabs: Tab[];
  children: ReactNode;
  type?: "pill" | "default";
};

const Tabs: React.FC<TabsProps> = ({ tabs, children, type = "default" }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isHover, setIsHover] = useState<number | null>(null);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="bg-white overflow-hidden">
      <div
        className={`flex justify-around gap-4 w-full ${
          type === "default" && "border-b border-neutral-300"
        }`}
      >
        {tabs.map((tab, index) => (
          <div>
            <div
              key={index}
              className={`cursor-pointer px-4 flex gap-2 items-center ${
                type === "pill" &&
                activeTab === index &&
                "bg-gradient-primary-50"
              } ${
                type === "pill"
                  ? "hover:!bg-secondary-50 p-[10px] rounded-[6px] max-h-10"
                  : "pb-[10px]"
              }`}
              onClick={() => handleTabClick(index)}
              onMouseEnter={() => setIsHover(index)}
              onMouseLeave={() => setIsHover(null)}
            >
              {tab.icon && <div className="tab-icon"><Svg width={16} height={17} icon={tab.icon} color={activeTab === index ? "text-primary-500" : isHover === index ? "text-secondary-700" : "text-secondary-500"}   /></div>}
              <span
                className={`text-neutral-500  text-b1 font-medium ${
                  isHover === index && "text-neutral-600"
                } ${activeTab === index && "text-gradient-primary-500"}`}
              >
                {tab.label}
              </span>
              {tab.count !== undefined && (
                <span
                  className={`rounded-full bg-secondary-50 w-[18px] h-[18px] flex items-center justify-center text-caption text-secondary-600 font-medium ${
                    activeTab === index &&
                    type === "default" &&
                    "bg-gradient-primary-50"
                  } ${
                    type === "pill" && isHover === index && "!bg-secondary-500"
                  }
                  ${activeTab === index && type === "pill" && "bg-gradient-primary-500"}
                  `}
                >
                  <p
                    className={`${
                      activeTab === index &&
                      type === "default" &&
                      "text-gradient-primary-500"
                    } ${type === "pill" && isHover === index && "text-white"} ${activeTab === index && type === "pill" && "text-white"}`}
                  >
                    {tab.count}
                  </p>
                </span>
              )}
            </div>
            {type === "default" && (
              <div
                className={`h-0.5  ${isHover === index && "bg-neutral-400"} ${
                  activeTab === index && "bg-gradient-primary-500"
                } w-full`}
              ></div>
            )}
          </div>
        ))}
      </div>
      <div className="tabs-content">
        {React.Children.toArray(children)[activeTab]}
      </div>
    </div>
  );
};

export default Tabs;



// how to use 

// const tabs = [
//   { label: 'Tab 1', icon: Buildings, count: 9 },
//   { label: 'Tab 2', icon: Buildings, count: 5 },
//   { label: 'Tab 3', icon: Buildings },
// ];
// return <div>
//   <Tabs tabs={tabs} type="pill">
//   {/* Content for Tab 1 */}
//   <div>Tab 1 Content</div>

//   {/* Content for Tab 2 */}
//   <div>Tab 2 Content</div>

//   {/* Content for Tab 3 */}
//   <div>Tab 3 Content</div>
// </Tabs>
// </div>