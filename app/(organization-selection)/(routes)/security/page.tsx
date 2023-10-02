"use client";

import Image from "next/image";
import Button from "../../../components/buttons/Button";
import Switch from "../../../components/switch/Switch";
import Badge from "../../../components/badges/Badge";
import { use, useEffect, useState } from "react";
import Input from "../../../components/input/Input";
import Modal from "../../../components/modal/Modal";
import Toast from "../../../components/toast/Toast";

import Chrome from "@/public/security-icons/chrome.svg";
import Safari from "@/public/security-icons/safari.svg";
import Key from "@/public/security-icons/key.svg";
import KeyIcon from "@/public/security-icons/KeyIcon.svg";
import Location from "@/public/security-icons/location.svg";
import Mac from "@/public/security-icons/mac.png";
import Windows from "@/public/security-icons/windows.png";
import Logout from "@/public/security-icons/logout.svg";
import X from "@/public/modal/x.svg";
import InfoCircle from "@/public/security-icons/info-circle.svg";
import ContentHeader from "@/app/components/content-header/ContentHeader";

const Security: React.FC = () => {
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [sessionModal, setSessionModal] = useState(false);
  const [terminateModal, setTerminateModal] = useState(false);
  const [toastVisible, setToastVisible] = useState<boolean | null>(null);
  const [twoFactorAuth, setTwoFactorAuth] = useState<boolean | null>(null);

  const handleToggle = () => {
    setTwoFactorAuth(!twoFactorAuth);
  };

  return (
    <div className="w-full">
      <ContentHeader
        title="Security"
        viewMode="card"
        className="pb-4 mobile:pb-6"
      />

      <div className=" shadow-xs-1 rounded-lg p-6 bg-white flex flex-col gap-4 mobile:gap-0 mobile:flex-row mobile:items-center mobile:justify-between">
        <div>
          <p className="text-subtitle font-medium mb-2 text-neutral-800">Password</p>
          <p className="text-b2 text-neutral-500 mb-1">
            Last changed 18 days ago
          </p>
          <span className="flex items-center gap-1">
            <Image src={Location} alt="location" />
            <p className="text-caption text-neutral-500">Surat, Gujarat</p>
          </span>
        </div>
        <Button
          className="!w-[176px]"
          size="md"
          leftIcon={Key}
          onClick={() => setChangePasswordModal(true)}
        >
          Change Password
        </Button>
      </div>

      <div className=" flex gap-5  items-center justify-between mt-6 shadow-xs-1 rounded-lg p-6 bg-white">
        <div>
          <p className="text-subtitle text-neutral-800 font-medium mb-2">
            Two Factor Authentication
          </p>
          <p className="text-b2 text-neutral-500">
            2FA enhances online security with dual identification for login,
            adding an extra layer beyond username and password.
          </p>
        </div>
        <div>
          <Switch defaultActive={twoFactorAuth} onToggle={handleToggle} />
        </div>
      </div>

      <div className=" mt-6 shadow-xs-1 rounded-lg p-6 bg-white">
        <div className="flex flex-col gap-5 mobile:flex-row mobile:items-center mobile:justify-between">
          <div>
            <p className="font-medium text-neutral-700 mb-1">Active Sessions</p>
            <p className="text-b2 text-neutral-500">
              Manage all of your active sessions.
            </p>
          </div>
          <Button
            className="!w-[186px]"
            size="md"
            color="red"
            ghost
            leftIcon={Logout}
            onClick={() => setTerminateModal(true)}
          >
            Logout all Sessions
          </Button>
        </div>

        <hr className="my-6 border-neutral-300" />

        <div className="flex flex-col gap-6">
          <div
            className="flex items-center justify-between p-4 hover:bg-[#F1F4F9] transition-all ease-in rounded-lg cursor-pointer"
            onClick={() => setSessionModal(true)}
          >
            <div className="flex items-center">
              <Image src={Mac} alt="mac" width={78} />
              <div className="ml-2 w-[86px]">
                <p className="text-b2 text-neutral-600">MacBook</p>
                <p className="text-caption text-neutral-500 whitespace-nowrap mobile:whitespace-wrap">
                  10 minutes ago
                </p>
              </div>
              <div className="ml-[64px] mr-6 items-center hidden mobile:flex">
                <Image src={Safari} alt="windows" width={20} />
                <p className="text-caption text-neutral-600 ml-1 font-medium">
                  Safari
                </p>
              </div>
              <p className="text-caption text-neutral-600 hidden mobile:block">
                Surat, Gujarat, India
              </p>
            </div>
            <div className="w-[6px] h-[6px] bg-green-500 rounded-full mobile:hidden  "></div>
            <Badge color="green" leftDot className="hidden mobile:flex">
              Current Session
            </Badge>
          </div>

          <div
            className="group flex items-center justify-between p-4 hover:bg-[#F1F4F9] transition-all ease-in rounded-lg cursor-pointer"
            onClick={() => setSessionModal(true)}
          >
            <div className="flex items-center">
              <Image src={Windows} alt="windows" width={78} />
              <div className="ml-2 w-[86px]">
                <p className="text-b2 text-neutral-600">Windows PC</p>
                <p className="text-caption text-neutral-500 whitespace-nowrap mobile:whitespace-wrap">
                  18 days ago
                </p>
              </div>
              <div className="ml-[64px] mr-6 items-center hidden mobile:flex">
                <Image src={Chrome} alt="windows" width={20} />
                <p className="text-caption text-neutral-600 ml-1 font-medium">
                  Chrome
                </p>
              </div>
              <p className="text-caption text-neutral-600 hidden mobile:block">
                Surat, Gujarat, India
              </p>
            </div>
            {/* <div className="w-[6px] h-[6px] bg-green-500 rounded-full mobile:hidden  "></div> */}
            <Button
              size="md"
              textButton
              color="red"
              className="w-max hidden group-hover:flex"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                setTerminateModal(true);
                e.stopPropagation();
              }}
            >
              Terminate
            </Button>
          </div>
        </div>
      </div>

      {/* change password modal  */}

      <Modal isOpen={changePasswordModal} className="zoomIn">
        <div className="max-w-[400px] text-center">
          <Image
            src={X}
            alt="close"
            className="absolute top-6 right-6 cursor-pointer"
            onClick={() => setChangePasswordModal(false)}
          />
          <div className="flex justify-center">
            <Image src={KeyIcon} alt="key" />
          </div>

          <p className="subtitle font-semibold text-neutral-700 mt-5 mb-2">
            Set a new password
          </p>
          <p className="text-b2 text-neutral-500 max-w-[350px] mb-6">
            Your new password must be different to previously used password.
          </p>

          <div className="flex flex-col gap-6">
            <Input type="password" labelTop="Current Password" />
            <Input type="password" labelTop="New Password" />
            <Input type="password" labelTop="Confirm Password" />
            <p className="text-primary-500 font-medium cursor-pointer text-b2">
              Forget Current Password?
            </p>
            <Button size="md">Change Password</Button>
          </div>
        </div>
      </Modal>
      <Toast
        toastVisible={twoFactorAuth}
        message="Two-factor authentication enabled!"
      />

      {/* sessions modal */}

      <Modal
        top={0}
        className="overflow-hidden w-[693px] flex flex-col max-w-[693px] max-largeTablet:max-w-[450px] max-mobile:max-w-[320px]"
        isOpen={sessionModal}
      >
        <div className="text-center w-[693px] max-mobile:w-[330px] flex items-center justify-center p-6 -mt-[16px] bg-[#f1f4f9]">
          <Image
            src={X}
            alt="close"
            className="absolute top-6 right-6 cursor-pointer"
            onClick={() => setSessionModal(false)}
          />
          <div className="flex items-center w-full justify-start max-largeTablet:max-w-[400px]">
            <Image src={Mac} alt="mac" width={78} />
            <div className="ml-2 w-[86px] text-left mr-6">
              <p className="text-b2 text-neutral-600">MacBook</p>
              <p className="text-caption text-neutral-500 whitespace-nowrap mobile:whitespace-wrap">
                10 minutes ago
              </p>
            </div>

            <div className="w-[6px] h-[6px] bg-green-500 rounded-full mobile:hidden  "></div>
            <Badge color="green" leftDot className="hidden mobile:flex">
              Current Session
            </Badge>
          </div>
        </div>

        <div className="flex flex-col mobile:flex-row flex-wrap justify-between mt-6 gap-5 pr-6">
          <div>
            <p className="text-caption text-neutral-500">Started Time</p>
            <p className="text-b2 text-neutral-600">30 July 2023</p>
          </div>
          <div>
            <p className="text-caption text-neutral-500">Browser</p>
            <p className="text-caption font-medium text-neutral-600 flex items-center gap-1">
              <span>
                <Image src={Safari} alt="windows" width={20} />
              </span>
              Safari
            </p>
          </div>
          <div>
            <p className="text-caption text-neutral-500">IP address</p>
            <p className="text-b2 text-neutral-600">192.168.1.1</p>
          </div>
          <div>
            <p className="text-caption text-neutral-500">Location</p>
            <p className="text-b2 text-neutral-600">
              605, Trinity Orion, near agam arcade, Vesu main road, Vesu Surat -
              395007
            </p>
          </div>
        </div>

        <hr className="my-6 w-full border-neutral-300" />

        <div className="flex w-full justify-end gap-2">
          <Button
            className="max-w-max"
            color="secondary"
            size="md"
            onClick={() => setSessionModal(false)}
          >
            Cancel
          </Button>
          <Button className="max-w-max" color="red" size="md">
            Terminate
          </Button>
        </div>
      </Modal>

      {/* terminate modal */}

      <Modal isOpen={terminateModal}>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center bg-red-100 border-8 border-red-50 w-12 h-12 rounded-full">
            <Image src={InfoCircle} alt="info" />
          </div>
          <p className="subtitle font-semibold text-neutral-700 mt-5 mb-2">
            Session Termination
          </p>
          <p className="text-b2 text-neutral-400 max-w-[350px] mb-6">
            Do you want to Terminate the Session?
          </p>
          <div className="flex gap-2 w-[250px] mobile:w-[352px]">
            <Button
              color="secondary"
              ghost
              size="md"
              onClick={() => setTerminateModal(false)}
            >
              Cancel
            </Button>
            <Button
              color="red"
              size="md"
              onClick={() => setTerminateModal(false)}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Security;
