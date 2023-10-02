"use client";

import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import * as Yup from "yup";
import { useFormik } from "formik";

import ContentHeader from "../content-header/ContentHeader";
import Badge from "../badges/Badge";
import Button from "../buttons/Button";
import Modal from "../modal/Modal";
import CustomSelect from "../select/CustomSelect";
import Input from "../input/Input";
import { useFormStore } from "@/app/store/formDataStore";
import { useAddressStore } from "@/app/store/formDataStore";

import Add from "@/public/gradient-icons/add-circle.svg";
import Trash from "@/public/outline-icons/trash.svg";
import Edit from "@/public/outline-icons/edit.svg";
import ScrollShadowContainer from "../scroll-shadow-container/ScrollShadowContainer";
import WarningModal from "../warning-modal/WarningModal";

type LocationFormValues = {
  location_name: string;
  location_type: string;
  gstin: string;
  street_address: string;
  pincode: string;
};

type LocationProps = {
  onUpdate: (data: LocationFormValues) => void;
};

const locationData = [
  {
    key: "1",
    location_name: "Default",
    location_type: "Head Office",
    gstin: "24GXHFG1314R9Z6",
    street_address:
      "Automode Enclave, Beside Rajhans Montessa, Dumas Rd, near Airport",
    pincode: "395007",
    city: "Surat",
    state_country: "Gujarat, India",
  },
  {
    key: "2",
    location_name: "Automode - Operations",
    location_type: "Store",
    gstin: "24GGGGG2658E9Z6",
    street_address:
      "506, Trinity orion, near vijya laxmi hall, vesu main road, Vesu",
    pincode: "395007",
    city: "Surat",
    state_country: "Gujarat, India",
  },
  {
    key: "3",
    location_name: "Automode - Development",
    location_type: "Warehouse",
    gstin: "24GXHFG1314R9Z6",
    street_address:
      "506, Trinity orion, near vijya laxmi hall, vesu main road, Vesu",
    pincode: "395007",
    city: "Surat",
    state_country: "Gujarat, India",
  },
];

const Location: React.FC<LocationProps> = ({ onUpdate }) => {
  const { formStoreData, setFormStoreData } = useFormStore();
  const { addAddress, addresses } = useAddressStore();

  const [locationFormData, setLocationFormData] = useState(locationData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrollState, setScrollState] = useState<string | null>("top");
  const [modalScrollState, setModalScrollState] = useState<string>("top");
  const [editModal, setEditModal] = useState(false);
  const [locationAddress, setLocationAddress] = useState(addresses)
  const [warningModal, setWarningModal] = useState(false);
  const [selectedLocationForDeletion, setSelectedLocationForDeletion] = useState<LocationFormValues | null>(null);

  const handleRemoveButtonClick = (location: LocationFormValues) => {
    setSelectedLocationForDeletion(location);
    setWarningModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedLocationForDeletion) {
      const updatedLocations = locationAddress.filter((location) => location !== selectedLocationForDeletion);
      setLocationAddress(updatedLocations);
      setWarningModal(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditModal(false);
    formik.resetForm();
  };

  useEffect(() => {
    if (addresses.length === 0) {
      locationData.forEach((address) => addAddress(address));
    }
    setLocationAddress(addresses)
  }, [addresses, addAddress]);

  const validationSchema = Yup.object({
    location_name: Yup.string().required("Enter Location Name"),
    location_type: Yup.string().required("Select Location Type"),
    gstin: Yup.string()
      .matches(
        /^[0-9]{2}[A-Z,a-z]{5}[0-9]{4}[A-Z,a-z]{1}[1-9A-Z,a-z]{1}[Z,z]{1}[0-9A-Z,,a-z]{1}$/,
        "Invalid GSTIN"
      )
      .required("Enter GSTIN"),
    street_address: Yup.string().required("Enter Your Street Address"),
    pincode: Yup.string()
      .matches(/^[0-9]{6}$/, "Invalid Pincode")
      .required("Enter Pincode"),
  });

  const formik = useFormik({
    initialValues: {
      location_name: "",
      location_type: "",
      gstin: "",
      street_address: "",
      pincode: "",
      city: "Surat",
      state_country: "Gujarat, India",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLocationFormData((prevData) => [
        ...prevData,
        {
          ...values,
          key: "4",
          city: "Surat",
          state_country: "Gujarat, India",
        },
      ]);
      setFormStoreData(values);
      addAddress(values);
      onUpdate(values);
      console.log(values, "Address Values");
      handleModalClose();
    },
  });


  return (
    <div className="pl-2 pr-2 mobile:pl-8 mobile:pr-8 tablet:pr-12 tablet:pl-12 largeTablet:pl-[34px] largeTablet:pr-[34px] ml-0 tablet:ml-0 w-full">
      <ContentHeader
        title="Locations"
        className="!mt-[8px] !ml-[-16px] mobile:!ml-[-24px] tablet:!mt-[-8px] largeTablet:!ml-[-18px] !py-[16px] mobile:!pt-6 mobile:!pb-[20px]"
        viewMode="card"
      />
      <div className="relative max-w-[700px] bg-white mt-[-6px] mobile:mt-[4px] overflow-hidden tablet:mt-[4px] mobile:ml-[-6px] largeTablet:ml-0 rounded-lg shadow-xs-1 w-full !max-h-[calc(100vh-400px)] mobile:!max-h-[calc(100vh-322px)] tablet:!max-h-[calc(100vh-258px)] largeTablet:!max-h-[calc(100vh-168px)] flex flex-col items-center">
        <div className={`px-6 border-b border-b-neutral-200 w-full`}>
                <div className="py-4 flex items-center justify-start">
                  <h1
                    onClick={() => setIsModalOpen(true)}
                    className="text-b2 cursor-pointer font-medium text-gradient-primary-500 flex items-center"
                  >
                    <span className="mr-1">
                      <Image src={Add} alt="add icon" />
                    </span>
                    Add new location
                  </h1>
                </div>
              </div>
          <ScrollShadowContainer id="add-orgnazation-location-container" shadowTop="54px">
          <div className="flex max-mobile:flex-col items-start gap-[56px] max-mobile:gap-3 justify-between">
            <div className="w-full">
              <div>
                {locationAddress.map((item, index) => (
                  <div className="flex items-center" key={index}>
                    <div
                      className={`py-5 px-6 ${
                        index === addresses.length - 1
                          ? ""
                          : "border-b border-b-neutral-200"
                      } w-full`}
                      key={index}
                    >
                      <h1 className="text-b2 font-semibold text-neutral-700 mb-2">
                        {item.location_name}
                      </h1>
                      <div className="flex flex-col mobile:flex-row mobile:justify-between gap-3 mobile:gap-10 items-baseline">
                        <div>
                          <p className="text-b2 text-neutral-500 mb-2">
                            {item.street_address}
                          </p>
                          <p className="text-b2 text-neutral-500 mb-2">
                            {item.city}, {item.state_country} - {item.pincode}
                          </p>
                          <p className="text-b2 font-semibold text-neutral-500 mb-2">
                            GSTIN: {item.gstin}
                          </p>
                          <Badge color={item.location_type === "Head Office" ? "primary" : "blue"}>{item.location_type}</Badge>
                        </div>
                        {item.location_name !== "Default" && <div className="flex items-center gap-2">
                          <Button color="secondary" ghost leftIcon={Edit} onClick={()=> {setEditModal(true);}}>
                            Edit
                          </Button>
                          <Button color="secondary" ghost leftIcon={Trash}  onClick={() => {handleRemoveButtonClick(item);}}>
                            Remove
                          </Button>
                        </div>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </ScrollShadowContainer>
        
      </div>
      <WarningModal isOpen={warningModal} onConfirm={handleConfirmDelete} onCancel={()=> setWarningModal(false)} setIsOpen={()=>{}} title="Delete Location" supportingText="Do you want to Delete this Location?" />
      <Modal top={0} closeModal={handleModalClose} isOpen={isModalOpen||editModal} heading={editModal ? "Edit Location" : "Add New Location"} supportingText={editModal ? "do changes to edit location." : "Fill details to add new location."}>
        <form onSubmit={formik.handleSubmit} className="-mx-4 tablet:-mx-6">
          <div className="flex flex-col relative">
              <ScrollShadowContainer id="add-orgnazation-location-modal-container" className="p-4  tablet:px-6 pb-0 flex flex-col gap-5 min-w-[343px] tablet:min-w-[492px] max-h-[calc(100vh-200px)]" shadowTop="0px" shadowBottom="64px">
              <div className="flex flex-col mobile:flex-row justify-between items-baseline gap-5">
                <Input
                  name="location_name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={editModal ? "Automode - Development" : formik.values.location_name}
                  hasError={
                    formik.touched.location_name && formik.errors.location_name
                      ? formik.errors.location_name
                      : ""
                  }
                  labelTop="Location Name"
                  type="text"
                  placeholderValue="Automode Office"
                />
                <CustomSelect
                  onBlur={() => formik.setFieldTouched("location_type", true)}
                  value={editModal ?[{ label: "Warehouse", value: "warehouse" }]: null}
                  onChange={(selectedOption: any) =>
                    formik.setFieldValue("location_type", selectedOption.value)
                  }
                  hasError={
                    formik.touched.location_type && formik.errors.location_type
                      ? formik.errors.location_type
                      : ""
                  }
                  labelTop="Location Type"
                  options={[{ label: "Store", value: "store" },{label: "Warehouse", value: "warehouse"}]}
                />
              </div>
              <div className="flex flex-col mobile:flex-row justify-between items-baseline gap-5">
                <Input
                  name="gstin"
                  onBlur={formik.handleBlur}
                  // onChange={formik.handleChange}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  value={editModal ? "24GXHFG1314R9Z6" : formik.values.gstin}
                  hasError={
                    formik.touched.gstin && formik.errors.gstin
                      ? formik.errors.gstin
                      : ""
                  }
                  labelTop="GSTIN"
                  type="gstin"
                  placeholderValue="24GXHFG1314R9Z6"
                />
                <Input
                  name="pincode"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={editModal ? "395007" : formik.values.pincode}
                  hasError={
                    formik.touched.pincode && formik.errors.pincode
                      ? formik.errors.pincode
                      : ""
                  }
                  labelTop="Pincode"
                  type="num"
                  maxLength={6}
                  // type="number"
                  placeholderValue="395007"
                />
              </div>
              <Input
                name="street_address"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={editModal ? "506, Trinity Orion, Near Vijya laxmi hall" : formik.values.street_address}
                hasError={
                  formik.touched.street_address && formik.errors.street_address
                    ? formik.errors.street_address
                    : ""
                }
                labelTop="Street address"
                type="any"
                placeholderValue="506, Trinity Orion"
              />
              <div className="flex flex-col mobile:flex-row justify-between items-center gap-5">
                <CustomSelect
                  labelTop="City"
                  options={[{ label: "Surat", value: "surat" }]}
                  value={[{ label: "Surat", value: "surat" }]}
                  disabled
                />
                <CustomSelect
                  disabled
                  labelTop="State/Country"
                  options={[{ label: "India", value: "india" }]}
                  value={[{ label: "Gujrat, India", value: "gujrat_india" }]}
                />
              </div>
              </ScrollShadowContainer>

            <div className="flex gap-3 self-end p-6 pb-0">
              <Button
                onClick={handleModalClose}
                size="md"
                ghost
                color="secondary"
                type="button"
              >
                Cancel
              </Button>
              <Button type="submit" size="md" onClick={()=>{editModal && formik.setErrors({}); setEditModal(false)}}>
                Save Changes
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Location;
