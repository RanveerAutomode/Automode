"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useAnimate } from "framer-motion";

import Image from "next/image";
import NormalSearch from "../../../public/navbar/search-normal.svg";
import HumBurger from "../../../public/navbar/menu.svg";
import Avatar from "../avatar/Avatar";
import AvatarImg from "@/public/images/profile-image.webp";
import Profile from "../../../public/navbar/profile.svg";
import Gear from "../../../public/navbar/gear.svg";
import Support from "../../../public/navbar/support.svg";
import Logout from "../../../public/navbar/logout.svg";
import Maximise from "../../../public/navbar/maximise.svg";
import Command from "../../../public/navbar/command.svg";
import Windows from "../../../public/navbar/windows.svg";
import Wave from "@/public/outline-icons/wave.svg"

import PopOver from "../pop-over/PopOver";
import Link from "next/link";
import ComboBox from "../ComboBox/ComboBox";
import Svg from "../svg/Svg";
import Modal from "../modal/Modal";

type TopBarProps = {
  toggleSidebar?: () => void;
};

const TopBar: React.FC<TopBarProps> = ({ toggleSidebar }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const avatarRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  // const inputRef = useRef<HTMLDivElement | null>(null);
  // const textRef = useRef<HTMLDivElement | null>(null);

  const [animate, scope] = useAnimate();

  const [popoverOpen, setPopoverOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024 // Default to 1024 if window is not defined
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMacOS, setIsMacOS] = useState<boolean | null>(null);
  const [isSlidingText, setIsSlidingText] = useState(false);

  const checkPlatform = () => {
    if (typeof window !== "undefined") {
      const userAgent = navigator.userAgent || navigator.platform || "unknown";
      const isMac = /Macintosh|MacIntel|MacPPC|Mac68K/.test(userAgent);
      setIsMacOS(isMac);
      // console.log(
      //   isMac
      //     ? "Operating System: MacOS"
      //     : "Operating System: Windows or others"
      // );
    }
  };

  const openModalOrDropdown = useCallback(() => {
    if (windowWidth > 1024) {
      setIsModalOpen(true);
    } else {
      setIsSearching(true);
    }
  }, [windowWidth]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 1024) {
        setIsModalOpen(false); // Close the modal when resizing to a large screen
      } else {
        setIsSearching(false); // Close the search dropdown when resizing to a small screen
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (window.navigator.platform.match("Mac")
          ? e.metaKey
          : e.getModifierState("OS")) &&
        e.key === "f"
      ) {
        e.preventDefault();
        openModalOrDropdown();
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [openModalOrDropdown]);

  useEffect(() => {
    checkPlatform();
  }, []);

  useEffect(() => {
    setIsSlidingText(true);

    const timer = setTimeout(() => {
      setIsSlidingText(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  const welcomeName = "Parthbharti Goswami";

  let doc: any;

  if (typeof window === "object") {
    doc = document;
  }

  function handleFullScreen() {
    if (
      !doc.fullscreenElement &&
      !doc.mozFullScreenElement &&
      !doc.webkitFullscreenElement &&
      !doc.msFullscreenElement
    ) {
      if (doc.documentElement.requestFullscreen) {
        doc.documentElement.requestFullscreen();
      } else if (doc.documentElement.msRequestFullscreen) {
        doc.documentElement.msRequestFullscreen();
      } else if (doc.documentElement.mozRequestFullScreen) {
        doc.documentElement.mozRequestFullScreen();
      } else if (doc.documentElement.webkitRequestFullscreen) {
        doc.documentElement.webkitRequestFullscreen(
          (Element as any).ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (doc.exitFullscreen) {
        doc.exitFullscreen();
      } else if (doc.msExitFullscreen) {
        doc.msExitFullscreen();
      } else if (doc.mozCancelFullScreen) {
        doc.mozCancelFullScreen();
      } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
      }
    }
  }

  return (
    <>
      <div className="tablet:shadow-xs-3 z-50 flex items-center justify-center w-full m-auto bg-white largeTablet:hidden">
        {/* <div
          // ref={textRef}
          className={`w-full max-w-max overflow-hidden transition-all duration-1000`}
        >
          <div
            className={`w-0 overflow-hidden ${
              isSlidingText ? "w-max" : ""
            } transition-all duration-1000`}
          >
            <h1 className="text-b1 font-medium text-neutral-700 w-full min-w-max pl-4 hidden largeTablet:flex">
              Welcome Back, Parthbharti Goswami 👋{" "}
            </h1>
          </div>
        </div> */}

        {
          !isSearching ? (
            <div
              className={`flex items-center justify-between w-full py-[12px] px-4 mobile:px-8 largeTablet:px-6 ${
                isSlidingText && "gap-8"
              }`}
            >
              <div
                className={`flex justify-between items-center ${
                  isSlidingText && "gap-2"
                } w-[80%]`}
              >
                <div
                  className={`${
                    isSlidingText
                      ? ` ${
                          welcomeName.length < 10
                            ? "min-w-[200px]"
                            : welcomeName.length < 15
                            ? "min-w-[200px]"
                            : welcomeName.length < 25
                            ? "min-w-[350px]"
                            : "min-w-[350px]"
                        }  max-w-[300px]`
                      : "min-w-[0px] max-w-[0px]"
                  } whitespace-nowrap overflow-hidden text-ellipsis transition-all duration-1000 hidden largeTablet:flex items-center `}
                >
                  Welcome Back, {welcomeName} &nbsp; <span><Image src={Wave} alt="Wave" /></span>
                </div>
                <div className="flex items-center gap-3 w-full">
                  <Image
                    className="largeTablet:hidden cursor-pointer"
                    width={20}
                    height={20}
                    src={HumBurger}
                    alt="Hum Burger"
                    onClick={toggleSidebar}
                  />
                  <Image
                    className="largeTablet:hidden"
                    width={20}
                    height={20}
                    src={NormalSearch}
                    alt="Normal Search"
                    onClick={openModalOrDropdown}
                  />
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={openModalOrDropdown}
                    className="bg-neutral-100 h-10 w-full max-w-[564px] rounded-lg hidden largeTablet:flex items-center justify-between cursor-pointer gap-0"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Svg
                        className="ml-4 cursor-pointer"
                        color="text-neutral-500"
                        width={16}
                        height={16}
                        icon={NormalSearch}
                        alt="Normal Search"
                      />
                      <h1 className="flex text-b2 text-neutral-400 whitespace-nowrap overflow-hidden text-elipsis">
                        Search or type a command
                      </h1>
                    </div>
                    <button className="bg-white mr-2 font-medium rounded-md h-[28px] w-[48px] text-secondary-500 text-caption flex py-[5px] px-[12px] items-center justify-center shadow-xs">
                      <span className="mr-1 flex">
                        {isMacOS !== null && (
                          <Svg
                            color="text-secondary-500"
                            width={12}
                            height={12}
                            icon={isMacOS ? Command : Windows}
                            alt={isMacOS ? "command" : "control"}
                          />
                        )}
                      </span>
                      F
                    </button>
                  </motion.div>
                </div>
              </div>
              <div ref={avatarRef} className="relative">
                <div className="flex items-center gap-[22px]">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Image
                      className="hidden cursor-pointer largeTablet:flex"
                      height={20}
                      width={20}
                      src={Maximise}
                      alt="maximise"
                      onClick={handleFullScreen}
                    />
                  </motion.div>
                  <motion.div
                    onMouseDown={(e) => {
                      if (e.button === 0) setPopoverOpen(!popoverOpen);
                    }} // open popover on left click
                    className="cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Avatar img={AvatarImg} status="online" size="sm" />
                  </motion.div>
                </div>
                <AnimatePresence>
                  {popoverOpen && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ y: 5, scale: 1 }}
                      exit={{ scale: 0, transition: { duration: 0.15 } }}
                    >
                      <PopOver
                        shouldCloseOnOverlayClick
                        anchorElement={avatarRef.current}
                        closePopover={() => setPopoverOpen(false)}
                        isOpen={popoverOpen}
                        className="-right-2 min-w-[261px]"
                      >
                        {/* popover content goes here */}
                        <div className="">
                          <div className="mb-4 mt-4 px-5">
                            <h1 className="font-medium text-neutral-700 cursor-default">
                              Parthbharti Goswami
                            </h1>
                            <h1 className="text-b2 text-neutral-500 cursor-default">
                              parth.goswami@automode.ai
                            </h1>
                          </div>
                          <hr className="mb-2 text-neutral-200" />
                          <div className="mb-2 flex flex-col gap-1 px-3">
                            <Link
                              href="/admin/profile"
                              className="flex items-center gap-3 cursor-pointer hover:bg-secondary-50 transition-all duration-200 ease-in py-2 px-2 rounded-md"
                              onClick={() => setPopoverOpen(false)}
                            >
                              <Image src={Profile} alt="profile" />
                              <h1 className="text-b2 text-neutral-600">
                                My profile
                              </h1>
                            </Link>
                            <Link
                              href="#"
                              className="flex items-center gap-3 cursor-pointer hover:bg-secondary-50 transition-all duration-200 ease-in py-2 px-2 rounded-md"
                              onClick={() => setPopoverOpen(false)}
                            >
                              <Image src={Gear} alt="settings" />
                              <h1 className="text-b2 text-neutral-600">
                                Settings
                              </h1>
                            </Link>
                            <Link
                              href="#"
                              className="flex items-center gap-3 cursor-pointer hover:bg-secondary-50 transition-all duration-200 ease-in py-2 px-2 rounded-md"
                              onClick={() => setPopoverOpen(false)}
                            >
                              <Image src={Support} alt="support" />
                              <h1 className="text-b2 text-neutral-600">
                                Support
                              </h1>
                            </Link>
                          </div>
                          <hr className="mb-2 text-neutral-200" />
                          <div className="mb-2 px-3">
                            <Link
                              href="/login"
                              className="flex items-center gap-3 cursor-pointer hover:bg-secondary-50 transition-all duration-200 ease-in py-2 px-2 rounded-md"
                              onClick={() => setPopoverOpen(false)}
                            >
                              <Image src={Logout} alt="logout" />
                              <h1 className="text-b2 text-neutral-600">
                                Logout
                              </h1>
                            </Link>
                          </div>
                        </div>
                      </PopOver>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ) : windowWidth <= 1024 ? (
            <ComboBox setIsSearching={setIsSearching} />
          ) : null

          // (
          //   <>
          //     <div className={`w-full`}>
          //       <ComboBox setIsSearching={setIsSearching} />
          //     </div>
          //     {/* <div
          //       onClick={() => {
          //         inputRef.current?.focus();
          //       }}
          //       className="flex items-center justify-between w-full cursor-text py-[16px] px-5 mobile:px-10"
          //     >
          //       <div className="flex items-center w-full gap-2">
          //         <Image
          //           width={20}
          //           height={20}
          //           src={NormalSearch}
          //           alt="Normal Search"
          //         />
          //         <input
          //           autoFocus
          //           className="w-full outline-none mr-2"
          //           type="text"
          //         />
          //       </div>
          //       <button className="border border-neutral-300 rounded-md w-[48px] h-[28px] text-secondary-500 text-caption flex py-[5px] px-[14px] items-center justify-center shadow-xs">
          //         Esc
          //       </button>
          //     </div> */}
          //   </>
          // )
        }
      </div>
      <Modal
        id="search-modal"
        ref={modalRef}
        className="w-[600px] !p-0 !rounded-b-none animated zoomIn animated zoomIn"
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      >
        <ComboBox
          getPopupContainer={() => modalRef.current || document.body}
          setIsSearching={setIsModalOpen}
        />
      </Modal>
    </>
  );
};

export default TopBar;
