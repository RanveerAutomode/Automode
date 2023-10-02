"use client";

import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import Switch from "../switch/Switch";
import Input from "../input/Input";
import CustomSelect from "../select/CustomSelect";
import ContentHeader from "../content-header/ContentHeader";
import { ProfileFormValues } from "@/app/types/types";
import { useFormStore } from "@/app/store/formDataStore";

import Buildings from "@/public/outline-icons/buildings-2.svg";
import Category from "@/public/outline-icons/category-2.svg";
import Upload from "@/app/components/upload/Upload";
import LanguageCircle from "@/public/outline-icons/language-circle.svg";
import CalendarCirle from "@/public/outline-icons/calendar-circle.svg";
import Calendar from "@/public/outline-icons/calendar.svg";
import Clock from "@/public/outline-icons/clock.svg";
import DocumentText from "@/public/outline-icons/document-text.svg";
import TextArea from "../textarea/TextArea";
import ScrollShadowContainer from "../scroll-shadow-container/ScrollShadowContainer";

type ProfileProps = {
  onUpdate: (data: ProfileFormValues) => void;
};

export interface ProfileImperativeHandle {
  validate: () => any;
  getValues: () => ProfileFormValues;
}

const Profile = forwardRef<ProfileImperativeHandle, ProfileProps>(
  ({ onUpdate }, ref) => {
    const { formStoreData } = useFormStore();
    const [showInputs, setShowInputs] = useState(false);

    useImperativeHandle(ref, () => ({
      validate: async () => {
        console.log("validate function called");
        const errors = await formik.validateForm();
        console.log("errors after validation: ", errors);
        if (Object.keys(errors).length > 0) {
          console.log("setting errors in formik state");
          formik.setErrors(errors);
          // mark all form fields as touched
          const touched = Object.keys(errors).reduce(
            (acc, cur) => ({ ...acc, [cur]: true }),
            {}
          );
          formik.setTouched(touched);
        }
        return Object.keys(errors).length === 0;
      },
      getValues: () => formik.values,
    }));

    let validationSchema = () => {
      if (formik.values.isgst) {
        return Yup.object({
          gstin: Yup.string()
            .matches(
              /^[0-9]{2}[A-Z,a-z]{5}[0-9]{4}[A-Z,a-z]{1}[1-9A-Z,a-z]{1}[Z,z]{1}[0-9A-Z,,a-z]{1}$/,
              "Invalid GSTIN"
            )
            .required("Enter GSTIN"),
          dateFormat: Yup.string().required("Choose the date format"),
        });
      } else {
        return Yup.object({
          organizationName: Yup.string().required("Enter Organization Name"),
          industry: Yup.string().required("Select Industry Name"),
          dateFormat: Yup.string().required("Choose the date format"),
        });
      }
    };

    const formik = useFormik({
      initialValues: {
        organizationName: formStoreData.organizationName || "",
        industry: formStoreData.industry || "",
        dateFormat: formStoreData.dateFormat || "",
        gstin: formStoreData.gstin || "",
        isgst: formStoreData.isgst || false,
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        console.log(values);
      },
    });

    return (
      <div className="pl-2 pr-2 mobile:pl-8 mobile:pr-8 tablet:pr-12 tablet:pl-12 largeTablet:pl-[34px] largeTablet:pr-[34px] ml-0 tablet:ml-0 w-full">
        <ContentHeader
          title="Profile"
          className="!mt-[8px] !ml-[-16px] mobile:!ml-[-24px] tablet:!mt-[-8px] largeTablet:!ml-[-18px] !py-[16px] mobile:!pt-6 mobile:!pb-[20px]"
          viewMode="card"
        />
        <div className="relative max-w-[628px] bg-white mt-[-6px] mobile:mt-[4px] overflow-hidden tablet:mt-[4px] mobile:ml-[-6px] largeTablet:ml-0 rounded-lg shadow-xs-1 w-full !max-h-[calc(100vh-400px)] mobile:!max-h-[calc(100vh-322px)] tablet:!max-h-[calc(100vh-258px)] largeTablet:!max-h-[calc(100vh-168px)] flex flex-col items-center">
          {/* <div className={`px-6 py-2 bg-[#F1F4F9] flex flex-col w-full`}>
            <h1 className="text-neutral-700 text-subtitle font-medium">
              Organization Profile
            </h1>
            <p className="text-neutral-500 text-b2">
              Manage your Organization details
            </p>
          </div> */}
          <ScrollShadowContainer
            id="add-orgnazation-profile-container"
            roundedTop
            maxHeight="h-full"
          >
            <form
              onSubmit={formik.handleSubmit}
              className="px-6 "
              id="add-orgnazation-profile"
            >
              <div className="py-6 flex max-mobile:flex-col items-start gap-[56px] max-mobile:gap-3 justify-between">
                <div>
                  <h1 className="text-b2 font-medium text-neutral-700 max-mobile:hidden">
                    Basic details
                  </h1>
                  <p className="text-caption text-neutral-500">
                    Some basic details about your organization.
                  </p>
                </div>
                <div className="flex flex-col gap-5 min-w-[320px]">
                  <div className="flex flex-col">
                    <h1 className="text-b2 text-neutral-700 mb-2">
                      Do you have a GST No.?
                    </h1>
                    <Switch
                      defaultActive={formik.values.isgst}
                      onToggle={() => {
                        const newIsGst = !formik.values.isgst;
                        formik.setFieldValue("isgst", newIsGst);
                        formik.resetForm({
                          values: {
                            ...formik.values,
                            isgst: newIsGst,
                          },
                        });
                        setShowInputs(false);
                        console.log("form reset");
                      }}
                    />
                  </div>
                  {!formik.values.isgst ? (
                    <div>
                      <div className="mb-5">
                        <Input
                          name="organizationName"
                          value={formik.values.organizationName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          hasError={
                            formik.touched.organizationName &&
                            typeof formik.errors.organizationName === "string"
                              ? formik.errors.organizationName
                              : ""
                          }
                          labelTop="Organization Name"
                          type="alphaNumericSpc"
                          iconLeft={Buildings}
                          placeholderValue="Automode Consulting Pvt. Ltd."
                        />
                      </div>
                      <div>
                        <CustomSelect
                          value={formik.values.industry}
                          onChange={(selectedOption: any) => {
                            if (Array.isArray(selectedOption)) {
                              const newValue = selectedOption.map(
                                (option: { value: string }) => option.value
                              );
                              formik.setFieldValue("industry", newValue);
                            } else {
                              formik.setFieldValue(
                                "industry",
                                selectedOption.value
                              );
                            }
                          }}
                          onBlur={() => {
                            formik.setFieldTouched("industry", true);
                            formik.validateField("industry");
                          }}
                          hasError={
                            formik.touched.industry &&
                            typeof formik.errors.industry === "string"
                              ? formik.errors.industry
                              : false
                          }
                          labelTop="Industry"
                          iconLeft={Category}
                          options={[
                            { label: "IT", value: "it" },
                            { label: "Finance", value: "finance" },
                          ]}
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div>
                        <Input
                          className={`${showInputs ? "mb-5" : ""}`}
                          name="gstin"
                          onBlur={formik.handleBlur}
                          labelTop="GSTIN"
                          type="gstin"
                          iconLeft={DocumentText}
                          placeholderValue="27AAAAA0000A1Z2"
                          onChange={(e) => {
                            formik.handleChange(e);
                            if (e.target.value.length === 15) {
                              setShowInputs(true);
                            } else {
                              setShowInputs(false);
                            }
                          }}
                          value={formik.values.gstin}
                          hasError={
                            formik.touched.gstin &&
                            typeof formik.errors.gstin === "string"
                              ? formik.errors.gstin
                              : ""
                          }
                        />
                        {showInputs && (
                          <div className="flex flex-col gap-5">
                            <Input
                              iconLeft={Buildings}
                              labelTop="Organization Name"
                              type="text"
                              value="AutomodeAI Consulting Pvt. Ltd."
                              disabled
                            />
                            <CustomSelect
                              labelTop="Industry"
                              iconLeft={Category}
                              options={[
                                {
                                  label: "Automation Industry",
                                  value: "automation-industry",
                                },
                              ]}
                              value={{
                                label: "Automation Industry",
                                value: "automation-industry",
                              }}
                              disabled
                            />
                            <TextArea
                              placeholderValue="Registered Address"
                              labelTop="Registered Address"
                              value="506, Trinity Orion, Vesu main road, Vesu, Surat
                          Gujarat, India - 395007"
                              disabled
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <hr className="text-neutral-200 w-full" />
              <div className="py-6 flex max-mobile:flex-col items-start gap-[56px] max-mobile:gap-3 justify-between">
                <div>
                  <h1 className="text-b2 font-medium text-neutral-700 max-mobile:hidden">
                    Company logo
                  </h1>
                  <p className="text-caption text-neutral-500">
                    Upload your logo, it will be displayed on all of your
                    Transactions.
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center gap-5 min-w-[320px]">
                  <Upload isDragAndDrop />
                </div>
              </div>
              <hr className="text-neutral-200 w-full" />
              <div className="py-6 flex max-mobile:flex-col items-start gap-[56px] max-mobile:gap-3 justify-between ">
                <div>
                  <h1 className="text-b2 font-medium text-neutral-700 max-mobile:hidden">
                    Other details
                  </h1>
                  <p className="text-caption text-neutral-500">
                    Some basic details about your organization.
                  </p>
                </div>
                <div className="flex flex-col gap-5 min-w-[320px]">
                  <div>
                    <CustomSelect
                      labelTop="Language"
                      iconLeft={LanguageCircle}
                      disabled
                      value={{ label: "English", value: "english" }}
                      options={[{ label: "English", value: "english" }]}
                    />
                  </div>
                  <div>
                    <CustomSelect
                      labelTop="Fiscal Year"
                      disabled
                      iconLeft={CalendarCirle}
                      value={{ label: "April - March", value: "april - march" }}
                      options={[
                        { label: "April - March", value: "april-march" },
                      ]}
                    />
                  </div>
                  <div>
                    <CustomSelect
                      value={formik.values.dateFormat}
                      onChange={(selectedOption: any) =>
                        formik.setFieldValue("dateFormat", selectedOption.value)
                      }
                      onBlur={() => formik.setFieldTouched("dateFormat", true)}
                      hasError={
                        formik.touched.dateFormat &&
                        typeof formik.errors.dateFormat === "string"
                          ? formik.errors.dateFormat
                          : ""
                      }
                      labelTop="Date Format"
                      iconLeft={Calendar}
                      options={[{ label: "dd/mm/yyyy", value: "dd/mm/yyyy" }]}
                    />
                  </div>
                  <div>
                    <CustomSelect
                      labelTop="Time Zone"
                      disabled
                      iconLeft={Clock}
                      value={{
                        label: "UTC+05:30 (IST) Asia/Calcutta",
                        value: "UTC+05:30 (IST) Asia/Calcutta",
                      }}
                      options={[
                        {
                          label: "UTC+05:30 (IST) Asia/Calcutta",
                          value: "UTC+05:30 (IST) Asia/Calcutta",
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </form>
          </ScrollShadowContainer>

          {/* <div
            className={`${
              scrollState !== "top" && scrollState !== null
                ? "shadow-custom shadow--top"
                : "!h-0"
            } top-[0px] rounded-tl-[8px] rounded-tr-[8px]`}
          ></div>
          <div
            className={`${
              scrollState !== "bottom" && scrollState !== null
                ? "shadow-custom shadow--bottom"
                : "!h-0"
            } bottom-0 `}
          ></div> */}
        </div>
      </div>
    );
  }
);

export default Profile;
