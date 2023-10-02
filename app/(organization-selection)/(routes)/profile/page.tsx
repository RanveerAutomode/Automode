"use client";

import Image from "next/image";
import * as IconsaxIcons from "iconsax-react";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

import Input from "@/app/components/input/Input";
import Badge from "@/app/components/badges/Badge";
import Button from "@/app/components/buttons/Button";
import OtpModal from "@/app/components/otp-modal/OtpModal";
import Toast from "@/app/components/toast/Toast";
import Upload from "@/app/components/upload/Upload";

import EditIcon from "@/public/admin/profile/edit-2.svg";
import Calendar from "@/public/admin/profile/calendar.svg";
import Location from "@/public/admin/profile/location.svg";
import Avtar from "@/public/admin/profile/user_profile.jpeg";
import Edit from "@/public/admin/profile/edit.svg";
import { Popover } from "antd";
import Radio from "@/app/components/radio/Radio";
import CustomRangePicker from "@/app/components/range-picker/CustomRangePicker";
import ContentHeader from "@/app/components/content-header/ContentHeader";
import TextArea from "@/app/components/textarea/TextArea";

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const areaOptions = [
  { value: "area1", label: "Area 1" },
  { value: "area2", label: "Area 2" },
  { value: "area3", label: "Area 3" },
  { value: "area4", label: "Area 4" },
];

const Profile: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string[]>([
    "09 August 1988",
  ]);
  const [tempSelectedDate, setTempSelectedDate] = useState<string[]>([""]);
  const [otpModal, setOtpModal] = useState<boolean>(false);
  const [profileToast, setProfileToast] = useState<boolean | null>(null);
  const [emailToast, setEmailToast] = useState<boolean | null>(null);
  const [updatedImage, setUpdatedImage] = useState<string>("");
  const [profileImage, setProfileImage] = useState<boolean>(false);
  const [emialVerified, setEmailVerified] = useState<boolean>(false);
  const [popoverState, setPopoverState] = useState({
    dobPopover: false,
    genderPopover: false,
    addressPopover: false,
    editBtnPopover: false,
  });

  return (
    <div className="w-full flex flex-col ">
      <ContentHeader
        title="Profile"
        viewMode="card"
        className="pb-4 mobile:pb-6"
      />

      {/* profile info */}

      <div className="bg-white shadow-xs-1 rounded-lg p-6 flex items-center justify-between mb-6">
        <div className="flex gap-3 items-center">
          <div
            className="min-w-[68px] w-[68px] h-[68px] border border-white shadow-md rounded-full overflow-hidden cursor-pointer"
            onClick={() => setProfileImage(!profileImage)}
          >
            {profileImage && <Image src={Avtar} alt="profile" className="" />}
            {!profileImage && (
              <div className="w-full h-full rounded-full flex items-center justify-center bg-gradient-primary-50">
                <p className="text-h4 text-gradient-primary-500 font-medium">
                  PG
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-subtitle text-neutral-800 font-medium">
              Parthbharti Goswami
            </h1>
            <h3 className="text-b2 text-neutral-500 font-medium">
              UI/UX Designer
            </h3>
            <h5 className="text-caption text-neutral-500">Surat, Gujarat</h5>
          </div>
        </div>
        <Popover
          content={
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 mobile:items-center">
                <div className="border border-white rounded-full bg-white w-[86px] mobile:w-[88px] mobile:h-[88px] h-[86px] shadow-md min-w-[86px] overflow-hidden">
                  {updatedImage ? (
                    <Image
                      width={100}
                      height={100}
                      src={updatedImage}
                      alt="updateImg"
                    />
                  ) : (
                    profileImage && (
                      <Image src={Avtar} alt="profile" className="" />
                    )
                  )}

                  {profileImage && (
                    <Image src={Avtar} alt="profile" className="" />
                  )}
                  {!profileImage && (
                    <div className="w-full h-full rounded-full flex items-center justify-center bg-gradient-primary-50">
                      <p className="text-h3 text-gradient-primary-500 font-medium">
                        PG
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-2">
                    <Upload onImageSave={setUpdatedImage} />
                    {updatedImage && (
                      <Button
                        className=""
                        textButton
                        color="red"
                        onClick={() => setUpdatedImage("")}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                  <p className="text-caption text-neutral-400">
                    Allowed JPG, PNG or SVG. Max size of 800k
                  </p>
                </div>
              </div>
              <Input type="text" labelTop="First Name" value="Parthbharti" />
              <Input type="text" labelTop="Last Name" value="Goswami" />
              <div className="flex gap-2 w-max self-end mt-2">
                <Button
                  size="md"
                  color="secondary"
                  ghost
                  onClick={() =>
                    setPopoverState(() => ({
                      ...popoverState,
                      editBtnPopover: false,
                    }))
                  }
                >
                  Cancel
                </Button>
                <Button
                  size="md"
                  onClick={() =>
                    setPopoverState(() => ({
                      ...popoverState,
                      editBtnPopover: false,
                    }))
                  }
                >
                  Save
                </Button>
              </div>
            </div>
          }
          arrow={false}
          placement="bottomRight"
          trigger="click"
          open={popoverState.editBtnPopover}
          onOpenChange={() =>
            setPopoverState(() => ({
              ...popoverState,
              editBtnPopover: !popoverState.editBtnPopover,
            }))
          }
        >
          <Button
            leftIcon={EditIcon}
            className="!w-[80px]"
            size="md"
            // onClick={() => setEditModal(true)}
          >
            Edit
          </Button>
        </Popover>
      </div>

      {/* personal info */}

      <div className="bg-white p-6 rounded-lg shadow-xs-1">
        <h2 className="text-neutral-800  font-medium">Personal Information</h2>

        <div className="mt-6 grid grid-cols gap-5 mobile:grid-cols-2 overflow-hidden">
          <div className="flex gap-2 mobile:col-start-1 mobile:row-start-1">
            <div className="bg-secondary-50 h-[30px] min-w-[30px] rounded-full p-2">
              <IconsaxIcons.SmsTracking size={14} color="#64748B" />
            </div>
            <div className="overflow-hidden">
              <p className="text-caption font-medium text-secondary-400">
                Email Address
              </p>
              <div className="flex flex-col gap-2 largeTablet:flex-row">
                <div className="text-b2 text-neutral-600">
                  Parthbhartigoswami@automode.ai
                </div>
                {emialVerified ? <Badge color="green" size="sm">
                  Verified
                </Badge> : <Badge color="red" size="sm">
                  Not Verified
                </Badge>}
              </div>
              {!emialVerified && <p className="text-gradient-primary-500 text-b2 font-medium cursor-pointer mt-1" onClick={() => setOtpModal(true)}>Verify Now</p>}
            </div>
          </div>

          <div className="flex gap-2 mobile:col-start-1 mobile:row-start-2">
            <div className="bg-secondary-50 h-[30px] min-w-[30px] rounded-full p-2">
              <IconsaxIcons.Calendar size={14} color="#64748B" />
            </div>
            <div>
              <p className="text-caption font-medium text-secondary-400">
                Date of birth
              </p>

              <div className="flex items-center mb-2 gap-2">
                <p className="text-b2 text-neutral-600">{selectedDate[0]}</p>
                <Popover
                  content={
                    <div className="flex flex-col">
                      <p className="text-b2 font-medium text-neutral-700 mb-1">
                        Date of Birth
                      </p>
                      <CustomRangePicker
                        className="w-[268px] h-[38px] mb-6"
                        setSelectedDate={setTempSelectedDate}
                      />
                      <div className="flex gap-2 w-max self-end">
                        <Button
                          size="md"
                          ghost
                          color="secondary"
                          onClick={() =>
                            setPopoverState((prevState) => ({
                              ...prevState,
                              dobPopover: false,
                            }))
                          }
                        >
                          Cancel
                        </Button>
                        <Button
                          size="md"
                          onClick={() => {
                            setSelectedDate(tempSelectedDate);
                            setPopoverState((prevState) => ({
                              ...prevState,
                              dobPopover: false,
                            }));
                          }}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  }
                  arrow={false}
                  placement="top"
                  trigger="click"
                  open={popoverState.dobPopover}
                  onOpenChange={() =>
                    setPopoverState(() => ({
                      ...popoverState,
                      dobPopover: !popoverState.dobPopover,
                    }))
                  }
                >
                  <Image src={Edit} alt="edit" className="cursor-pointer" />
                </Popover>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mobile:col-start-2 mobile:row-start-1">
            <div className="bg-secondary-50 h-[30px] min-w-[30px] rounded-full p-2">
              <IconsaxIcons.CallCalling size={14} color="#64748B" />
            </div>
            <div>
              <p className="text-caption font-medium text-secondary-400">
                Mobile No.
              </p>
              <div className="flex flex-col gap-2 largeTablet:flex-row">
                <p className="text-b2 text-neutral-600">+91 85112 50588</p>
                <Badge color="green" size="sm">
                  Verified
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mobile:col-start-2 mobile:row-start-2">
            <div className="bg-secondary-50 h-[30px] min-w-[30px] rounded-full p-2">
              <IconsaxIcons.Man size={14} color="#64748B" />
            </div>
            <div>
              <p className="text-caption font-medium text-secondary-400">
                Gender
              </p>
              <div className="flex items-center mb-2 gap-2">
                <p className="text-b2 text-neutral-600">Male</p>
                <Popover
                  content={
                    <div className="flex flex-col gap-3">
                      <div className="">
                        <p className="text-b2 font-medium text-neutral-700 mb-1">
                          Gender
                        </p>
                        <div className="flex gap-3">
                          <Radio
                            defaultCheck="male"
                            options={[
                              {
                                supportingText: "Male",
                                id: "male",
                                name: "gender",
                                value: "male",
                              },
                              {
                                supportingText: "Female",
                                id: "female",
                                name: "gender",
                                value: "female",
                              },
                              {
                                supportingText: "Others",
                                id: "others",
                                name: "gender",
                                value: "others",
                              },
                            ]}
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 w-max self-end mt-3">
                        <Button
                          ghost
                          size="md"
                          color="secondary"
                          onClick={() => {
                            setPopoverState((prevState) => ({
                              ...prevState,
                              genderPopover: false,
                            }));
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="md"
                          onClick={() => {
                            setPopoverState((prevState) => ({
                              ...prevState,
                              genderPopover: false,
                            }));
                          }}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  }
                  arrow={false}
                  placement="top"
                  trigger="click"
                  open={popoverState.genderPopover}
                  onOpenChange={() =>
                    setPopoverState((prevState) => ({
                      ...prevState,
                      genderPopover: !popoverState.genderPopover,
                    }))
                  }
                >
                  <Image src={Edit} alt="edit" className="cursor-pointer" />
                </Popover>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-neutral-200 my-6" />

        {/* adddress */}

        <div className="grid grid-cols gap-5 largeTablet:grid-cols-2">
          <div className="flex gap-2">
            <div className="bg-secondary-50 h-[30px] min-w-[30px] rounded-full p-2">
              <IconsaxIcons.Location size={14} color="#64748B" />
            </div>
            <div>
              <p className="text-caption font-medium text-secondary-400">
                Address
              </p>
              <div className="flex items-center mb-2 gap-2">
                <p className="text-b2 text-neutral-600">
                  A-401, SNS Atria, Opposite Jolly Party Plot, Vesu, Surat,
                  395007
                </p>
                <Popover
                  content={
                    <div className="flex flex-col gap-3">
                      <TextArea placeholderValue="pp" resize={false} value="506 Trinity Orion" labelTop="Street address" />
                      {/* <Input
                        type="any"
                        labelTop="Street address"
                        className="col-span-2 min-[380px]:col-span-1 !w-[268px]"
                        iconLeft={Location}
                        value="506 Trinity Orion"
                      /> */}
                      {/* <Input
                        type="any"
                        labelTop="Street 2"
                        iconLeft={Location}
                        className="col-span-2 min-[380px]:col-span-1 !w-[268px]"
                        value="Vesu, Surat,"
                      /> */}
                      <Input
                        type="any"
                        labelTop="Pincode"
                        className="col-span-2 min-[380px]:col-span-1 !w-[268px]"
                        value="395007"
                        iconLeft={Location}
                      />
                      <div className="flex gap-2 w-max self-end mt-3">
                        <Button
                          ghost
                          size="md"
                          color="secondary"
                          onClick={() =>
                            setPopoverState((prevState) => ({
                              ...prevState,
                              addressPopover: false,
                            }))
                          }
                        >
                          Cancel
                        </Button>
                        <Button
                          size="md"
                          onClick={() => {
                            setPopoverState(() => ({
                              ...popoverState,
                              addressPopover: false,
                            }));
                          }}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  }
                  arrow={false}
                  placement="top"
                  trigger="click"
                  open={popoverState.addressPopover}
                  onOpenChange={() =>
                    setPopoverState(() => ({
                      ...popoverState,
                      addressPopover: !popoverState.addressPopover,
                    }))
                  }
                >
                  <Image src={Edit} alt="edit" className="cursor-pointer" />
                </Popover>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="bg-secondary-50 h-[30px] min-w-[30px] rounded-full p-2">
              <IconsaxIcons.Location size={14} color="#64748B" />
            </div>
            <div>
              <p className="text-caption font-medium text-secondary-400">
                State/Country
              </p>
              <p className="text-b2 text-neutral-600 mb-2">Gujarat, India</p>
            </div>
          </div>
        </div>
      </div>

      {/* otp modal  */}

      <OtpModal
        isModalOpen={otpModal}
        sample
        identifier="ranvsingh7@gmail.com"
        closeModal={(confirmed) => {
          setOtpModal(false);
          if (confirmed) {
            setEmailToast(!emailToast);
            setEmailVerified(true);
          }
        }}
      />
      <Toast
        message="Your email successfully verified"
        type="green"
        toastVisible={emailToast}
      />
      <Toast
        message="Your profile successfully update"
        type="green"
        toastVisible={profileToast}
      />
    </div>
  );
};

export default Profile;

{
  /* <Modal
isOpen={editModal}
top={0}
rounded={"lg"}
closeModal={() => setEditModal(false)}
className="slideInDown"
>
<div className="max-w-[380px] mobile:max-w-[589px] h-[100dvh] mobile:h-auto overflow-y-scroll mobile:overflow-hidden pb-[40px] mobile:pb-0">
  <div className="flex flex-col">
    <h1 className="text-title font-semibold text-neutral-700">
      Edit Profile
    </h1>
    <p className="text-caption">
      Change the profile pic and edit your profile details.
    </p>
    <Image
      src={X}
      alt="close"
      className="absolute top-4 right-4 cursor-pointer"
      onClick={() => setEditModal(false)}
    />
  </div>

  <hr className="border-neutral-300 my-4" />


  <div className="flex gap-3 mobile:items-center">
    <div className="border border-white rounded-full bg-white w-[86px] mobile:w-[100px] mobile:h-[100px] h-[86px] shadow-md min-w-[86px] overflow-hidden">
      {updatedImage ? (
        <Image
          width={100}
          height={100}
          src={updatedImage}
          alt="updateImg"
        />
      ) : (
        profileImage && <Image src={Avtar} alt="profile" className="" />
      )}

      {profileImage && <Image src={Avtar} alt="profile" className="" />}
      {!profileImage && (
        <div className="w-full h-full rounded-full flex items-center justify-center bg-gradient-primary-50">
          <p className="text-h3 text-gradient-primary-500 font-medium">
            PG
          </p>
        </div>
      )}
    </div>
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Upload onImageSave={setUpdatedImage} />
        {updatedImage && (
          <Button
            className=""
            ghost
            color="red"
            onClick={() => setUpdatedImage("")}
          >
            Remove
          </Button>
        )}
      </div>
      <p className="text-caption text-neutral-400">
        Allowed JPG, PNG or SVG. Max size of 800k
      </p>
    </div>
  </div>



  <div className="grid grid-rows-4 grid-cols-2 gap-4 mt-6 mx-1 mobile:min-w-[533px]">
    <Input
      type="text"
      labelTop="First Name"
      className="col-span-2 mobile:col-span-1"
      iconLeft={ProfileIcon}
    />
    <Input
      type="text"
      labelTop="Last Name"
      className="col-span-2 mobile:col-span-1"
    />
    <Input
      type="email"
      labelTop="Email"
      className="col-span-2 mobile:col-span-1"
      iconLeft={Sms}
    />
    <Input
      type="mobile"
      labelTop="Mobile No."
      className="col-span-2 mobile:col-span-1"
      iconLeft={Call}
    />
    <Input
      type="any"
      labelTop="Date of Birth"
      className="col-span-2 min-[380px]:col-span-1"
      iconLeft={Calendar}
    />
    <div className="col-span-2 min-[380px]:col-span-1">
      <CustomSelect
        options={genderOptions}
        labelTop="Gender"
        iconLeft={Man}
      />
    </div>
    <Input
      type="any"
      labelTop="Address"
      className="col-span-2"
      iconLeft={Location}
    />
    <Input
      type="num"
      labelTop="Pincode"
      maxLength={6}
      className="col-span-2 min-[380px]:col-span-1"
      iconLeft={Location}
    />
    <div className="col-span-2 min-[380px]:col-span-1">
      <Input type="text" labelTop="City/State" />
    </div>
  </div>
  <div className="flex gap-4 mt-6 mobile:max-w-[218px] mb-4">
    <Button
      size="md"
      onClick={() => {
        setEditModal(false);
        setProfileToast(!profileToast);
      }}
    >
      <span className="flex">
        Save&nbsp;<span>Changes</span>
      </span>
    </Button>
    <Button
      size="md"
      color="secondary"
      onClick={() => setEditModal(false)}
    >
      Cancel
    </Button>
  </div>
</div>
</Modal> */
}
