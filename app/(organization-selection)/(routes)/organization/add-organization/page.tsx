"use client";

import React, { useEffect, useState, useRef } from "react";

import ContentHeader from "@/app/components/content-header/ContentHeader";
import Button from "@/app/components/buttons/Button";
import Profile from "@/app/components/add-organization/Profile";
import useStepsStore from "@/app/store/stepsStore";
import { sidebarData } from "@/app/components/form-sidebar/FormSidebar";

import ArrowLeft from "@/public/outline-icons/arrow-left-2.svg";
import ArrowRight from "@/public/outline-icons/arrow-right-2.svg";
import Locations from "@/app/components/add-organization/Locations";
import { useSidebar } from "@/app/contexts/sidebarContexts";
import Application from "@/app/components/add-organization/Application";
import { ProfileImperativeHandle } from "@/app/components/add-organization/Profile";
import Users from "@/app/components/add-organization/Users";
import { useFormStore } from "@/app/store/formDataStore";
import { useApplicationSelectionStore } from "@/app/store/applicationSelectionStore";
import Taxes from "@/app/components/add-organization/Taxes";
import { set } from "lodash";

const AddOrganization = () => {
  const { formStoreData, setFormStoreData } = useFormStore();
  const { setShowError, applicationData } = useApplicationSelectionStore();

  const profileRef = useRef<ProfileImperativeHandle | null>(null);

  const setCurrentStep = useStepsStore((state) => state.setCurrentStep);
  const currentStep = useStepsStore((state) => state.currentStep);
  const { collapsed, setCollapsed } = useSidebar();
  const { isSidebarHovered, setIsSidebarHovered } = useSidebar();

  const [formData, setFormData] = useState({});

  const updateFormData = (stepData: { [key: string]: any }) => {
    setFormData((prevData) => ({
      ...prevData,
      ...stepData,
    }));
  };

  const handleNextClick = async () => {
    console.log("handleNextClick function called");
    if (currentStep === 0 && profileRef.current) {
      console.log("currentStep is 0 and profileRef.current is not null");
      const isValid = await profileRef.current.validate();
      console.log("isValid after validation: ", isValid);
      if (!isValid) {
        console.log("form is not valid, returning");
        return;
      }
      console.log(
        "form is valid, saving the date of formData and moving on to next step"
      );
      const values = profileRef.current.getValues(); //get form values
      setFormData(values); //save form values
      setFormStoreData(values);
    }

    if (currentStep === 2) {
      const isAnyApplicationSelected = applicationData.some(
        (app) => app.selected
      );

      if (!isAnyApplicationSelected) {
        setShowError(true);
        return;
      }
    }

    setCurrentStep((prevStep) => {
      if (prevStep < sidebarData.length - 1) {
        return prevStep + 1;
      }
      return prevStep;
    });
  };

  console.log(formStoreData, "data in store");

  const handlePreviousClick = () => {
    setCurrentStep((prevStep) => {
      if (prevStep > 0) {
        return prevStep - 1;
      }
      return prevStep;
    });
  };

  useEffect(() => {
    setCollapsed(true);

    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth > 900) {
        setCollapsed(true);
      } else {
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  console.log(isSidebarHovered);

  // const getCurrentStepKey = () => {
  //   switch (currentStep) {
  //     case 0:
  //       return "profile";
  //     case 1:
  //       return "locations";
  //     default:
  //       return "profile";
  //   }
  // };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <Profile ref={profileRef} onUpdate={updateFormData} />;
      case 1:
        return <Locations onUpdate={updateFormData} />;
      case 2:
        return <Application />;
      case 4:
        return <Users />;
      case 5:
        return <Taxes />;
      default:
        return;
    }
  };

  console.log(formData, "data in page");

  return (
    <div className="relative">
      {renderStep()}
      <div
        className={`navigation-footer bg-white z-10 border-t border-l  fixed bottom-0 p-4 mobile:px-8 largeTablet:px-6 mobile:py-4 flex items-center justify-between ml-[-8px] tablet:ml-2 w-screen tablet:w-[calc(100vw-220px)] animation-all duration-500 ${
          isSidebarHovered || !collapsed
            ? "largeTablet:w-[calc(100vw-484px)]"
            : "largeTablet:w-[calc(100vw-316px)]"
        } `}
      >
        <Button
          leftIcon={ArrowLeft}
          className="max-w-max"
          size="md"
          ghost
          color="secondary"
          disabled={currentStep === 0}
          onClick={handlePreviousClick}
        >
          Previous
        </Button>
        <Button
          rightIcon={ArrowRight}
          className="max-w-max"
          size="md"
          color="primary"
          disabled={currentStep === sidebarData.length - 1}
          onClick={handleNextClick}
        >
          Save & Next
        </Button>
      </div>
    </div>
  );
};

export default AddOrganization;
