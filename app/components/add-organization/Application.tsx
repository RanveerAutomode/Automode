"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import ContentHeader from "../content-header/ContentHeader";
import { useApplicationSelectionStore } from "@/app/store/applicationSelectionStore";

import Switch from "../switch/Switch";
import ScrollShadowContainer from "../scroll-shadow-container/ScrollShadowContainer";

const Application = () => {
  const { showError, setShowError, setApplicationData, applicationData } = useApplicationSelectionStore();

  const handleApplicationSelection = (id: number) => {
    const updatedApplications = applicationData.map((app) =>
      app.id === id ? { ...app, selected: !app.selected } : app
    );

    setApplicationData(updatedApplications);

    const isAnyApplicationSelected = updatedApplications.some(
      (app) => app.selected
    );

    setShowError(!isAnyApplicationSelected);
  };

  return (
    <div className="pl-2 pr-2 mobile:pl-8 mobile:pr-5 tablet:pr-5 tablet:pl-12 largeTablet:pl-[34px] largeTablet:pr-[16px] ml-0 tablet:ml-0 w-full">
      <ContentHeader
        title="Applications"
        className="!mt-[8px] !ml-[-16px] mobile:!ml-[-24px] tablet:!mt-[-8px] largeTablet:!ml-[-18px] !py-[16px] mobile:!pt-6 mobile:!pb-[20px]"
        viewMode="card"
      />
      <div className="relative mobile:ml-[-6px] largeTablet:ml-0 w-full !max-h-[calc(100vh-400px)] mobile:!max-h-[calc(100vh-322px)] tablet:!max-h-[calc(100vh-258px)] largeTablet:!max-h-[calc(100vh-168px)] flex flex-col">
        <ScrollShadowContainer id="applicatio" className="px-6 h-full overflow-auto w-full shadow-xs-1 rounded-lg bg-white max-w-max" roundedTop roundedBottom >
          {showError && (
            <p className="mt-4 -mb-2 ml-[8px] text-caption font-medium text-red-500 ">
              Please select at least one application.
            </p>
          )}
          <div className="pb-6 flex max-mobile:flex-col items-start gap-[56px] max-mobile:gap-3 justify-between">
            {/* <div className="pt-6 flex gap-6 flex-wrap"> */}
            <div
              className={`pt-6 grid grid-cols-1 tablet:grid-cols-2 min-[1200px]:grid-cols-3 ${
                applicationData.length > 3 && "min-[1920px]:grid-cols-4"
              }  gap-6`}
            >
              {applicationData.map((item) => (
                <div className="max rounded-xl p-6 border flex-grow hover-scale-bg overflow-hidden max-w-[400px]">
                  <div className="flex items-center justify-between h-14 relative">
                    <div className="bg-layer  ml-[20px] w-4 h-4 z-10"></div>
                    <Image
                      src={item.icon}
                      alt="icon"
                      width={56}
                      className="absolute"
                    />
                    <div className="z-50">
                      <Switch
                        defaultActive={item.selected}
                        onToggle={() => handleApplicationSelection(item.id)}
                      />
                    </div>
                  </div>
                  <div className="z-20">
                    <h1 className="font-semibold text-neutral-600 mt-4 mb-1 z-10">
                      {item.title}
                    </h1>
                    <p className="text-b2 text-neutral-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollShadowContainer>
      </div>
    </div>
  );
};

export default Application;
