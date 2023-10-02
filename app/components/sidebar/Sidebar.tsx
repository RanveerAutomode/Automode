"use client";

import Image from "next/image";
import * as IconsaxIcons from "iconsax-react";
import React, { useEffect, useRef, useState } from "react";

import logo from "@/public/sidebar-icons/Logo-white.svg";
import handle from "@/public/sidebar-icons/handle.svg";
import data from "./data.json";
import selectedOrganizationData from "./selected-organization-data.json";
import { usePathname, useRouter } from "next/navigation";

import { AnimatePresence, motion } from "framer-motion";
import PopOver from "../pop-over/PopOver";
import Link from "next/link";

import Profile from "../../../public/images/profile-image.webp";
import User from "../../../public/navbar/profile.svg";
import Dots from "@/public/solid-icons/more-vertical.svg";
import Gear from "../../../public/navbar/gear.svg";
import Support from "../../../public/navbar/support.svg";
import Logout from "../../../public/navbar/logout.svg";
import { useSidebar } from "@/app/contexts/sidebarContexts";

type SidebarProps = {
  isVisible?: boolean;
  toggleSidebar?: () => void;
  isCollapsed?: (collapsed: boolean) => void;
  selectedOrganization?: boolean;
};

type SidebarItem = {
  title: string;
  id: string;
  type: string;
  icon?: string;
  path?: string;
  childrens?: SidebarItem[];
};
interface SelectedOrg {
  id: number;
  name: string;
}

const Sidebar: React.ForwardRefRenderFunction<HTMLDivElement, SidebarProps> = (
  { isVisible, toggleSidebar, isCollapsed, selectedOrganization },
  ref
) => {
  const avatarRef = useRef<HTMLDivElement | null>(null);

  const path = usePathname();
  const router = useRouter();

  const [popoverOpen, setPopoverOpen] = useState(false);
  const {collapsed, setCollapsed}= useSidebar();
  const [buttonHoveredId, setButtonHoveredId] = useState<string | null>(null);
  const [childButtonHoveredId, setChildButtonHoveredId] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [openDropdownId, setOpenDropdownId] = useState<string>("");
  const [active, setActive] = useState<boolean>(false);
  const { isSidebarHovered, setIsSidebarHovered } = useSidebar();
  const renderData: SidebarItem[] = selectedOrganization ? selectedOrganizationData : data;
  const iconComponents: { [key: string]: React.ComponentType<any> } = {
    Buildings2: IconsaxIcons.Buildings2,
    profile: IconsaxIcons.Profile,
    Messages: IconsaxIcons.Messages,
    Task: IconsaxIcons.Task,
    SecuritySafe: IconsaxIcons.SecuritySafe,
    PresentionChart: IconsaxIcons.PresentionChart,
    Setting2: IconsaxIcons.Setting2,
    Messages1: IconsaxIcons.Messages1,
    MessageQuestion: IconsaxIcons.MessageQuestion,
    ArrowRight2: IconsaxIcons.ArrowRight2,
    Element4: IconsaxIcons.Element4,
    Lifebuoy: IconsaxIcons.Lifebuoy,
    I3Dcube: IconsaxIcons.I3Dcube,
    Bank: IconsaxIcons.Bank,
    UserOctagon: IconsaxIcons.UserOctagon,
    BookSquare: IconsaxIcons.BookSquare,
    ShoppingCart: IconsaxIcons.ShoppingCart,
    Bag: IconsaxIcons.Bag,
    Diagram: IconsaxIcons.Diagram,
    Hex: IconsaxIcons.Hex,
    Okb: IconsaxIcons.Okb,
    PercentageCircle: IconsaxIcons.PercentageCircle,
    Data: IconsaxIcons.Data,
    MoneyTime: IconsaxIcons.MoneyTime,
  };

  const isLoginPage = path === "/login";
  const isSignupPage = path === "/signup";
  const showSidebar = !(isLoginPage || isSignupPage);
  let selectedOrg: SelectedOrg | null;

try {
  const storedValue = localStorage.getItem("selected_org") || "{}";
  selectedOrg = JSON.parse(storedValue);
} catch (error) {
  console.error("Error parsing selected_org from localStorage:", error);
  selectedOrg = null;
}

  const handleDropdownClick = (id: string) => {
    if (id === openDropdownId) {
      setDropdownOpen(!dropdownOpen);
    } else {
      setDropdownOpen(true);
    }
    setOpenDropdownId(id);
  };

  const handleSidebarMouseLeave = () => {
    setIsSidebarHovered(false);

    if (collapsed) {
      setDropdownOpen(false);
      setOpenDropdownId("");
    }
  };

  const handleCollapsed = () => {
    if (window.innerWidth < 1025) {
      toggleSidebar ? toggleSidebar() : null;
      return;
    }
    setIsSidebarHovered(false);
    setCollapsed(!collapsed);

    if (!collapsed) {
      setDropdownOpen(false);
      setOpenDropdownId("");
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 1025) {
        setCollapsed(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isCollapsed !== undefined) {
      if (collapsed && !isSidebarHovered) {
        isCollapsed(true);
      } else {
        isCollapsed(false);
      }
    }
  }, [collapsed, isSidebarHovered]);

  useEffect(() => {
    if (collapsed && !isSidebarHovered) {
      setPopoverOpen(false);
    }
  }, [isSidebarHovered]);

  return showSidebar ? (
    <div
      ref={ref}
      className={`flex flex-col ${
        isVisible && "!left-[0px]"
      } border-none absolute left-[-300px] largeTablet:relative largeTablet:left-[0px]  transition-all duration-1000 h-[100vh] z-[1000] ${
        !collapsed && "!min-w-[264px]"
      } bg-dark-700  max-w-[264px] min-w-[96px] border-r border-r-neutral-100 ${
        collapsed && !isSidebarHovered && "!max-w-[96px] "
      } transition-all duration-500 overflow-hidden ${
        collapsed && isSidebarHovered && "!min-w-[264px]"
      } `}
      onMouseEnter={() => setIsSidebarHovered(true)}
      onMouseLeave={handleSidebarMouseLeave}
    >
      <header
        className={`flex justify-between items-center py-6 ${
          collapsed && !isSidebarHovered
            ? "pl-[36px] pr-[17px]"
            : "px-6"
        } overflow-hidden transition-all duration-300  min-h-[72px] ${
          collapsed && !isSidebarHovered && "min-w-[264px]"
        }`}
      >
        <div className="flex justify-between items-center min-w-[202px] w-full">
          <div
            className={`overflow-hidden w-[150px] ${
              collapsed &&
              !isSidebarHovered &&
              "!w-7 transition-all duration-[600ms]"
            }`}
          >
            <Image
              src={logo}
              alt="logo"
              width={113}
              className="min-w-[113px]"
            />
          </div>
          {
            <div
              className={`h-[22px] w-[22px] bg-gradient-primary-700 p-[3px] ${
                collapsed && "rotate-180"
              } transition-all duration-300 rounded-full border-[2px] border-neutral-100 cursor-pointer`}
              onClick={handleCollapsed}
            >
              <Image src={handle} alt="handle" width={40} />
            </div>
          }
        </div>
      </header>
      {/* buttons */}
      <div
        className={` w-full h-max flex flex-col  h-[calc(100vh-200px)] overflow-auto scrollbar-hidden ${
          collapsed && !isSidebarHovered ? "px-[22px]" : "px-5"
        } transition-all duration-300 flex-grow`}
      >
        <div className="h-max gap-0.5 flex flex-col">
        {renderData.map((item) => (
          <React.Fragment key={item.id}>
            {item.type === "btn" && (
              <div
                className={`py-[9px] px-3 h-10 rounded-md cursor-pointer hover:bg-dark-500 flex items-center text-b2 font-small hover:font-medium text-neutral-400 hover:text-white gap-2 transition-all duration-300 ${
                  collapsed &&
                  !isSidebarHovered &&
                  "gap-5 transition-all !duration-500 px-4"
                } ${
                  path.includes(item.path ? item.path : "") &&
                  "bg-gradient-primary-700 font-medium text-white"
                }  overflow-hidden`}
                onMouseEnter={() => setButtonHoveredId(item.id)}
                onMouseLeave={() => setButtonHoveredId(null)}
                // onClick={() => router.push(item.path || "/")}
                onClick={() => {selectedOrganization ? router.push(`${selectedOrg?.name}${item.path}?org-id=${selectedOrg?.id}` || "/") : router.push(item.path || "/"); setDropdownOpen(false)}}
              >
                {item.icon && iconComponents[item.icon] && (
                  <span className="transition-colors duration-300">
                    {React.createElement(iconComponents[item.icon], {
                      size: 20,
                      color:
                        item.id === buttonHoveredId &&
                        !path.includes(item.path ? item.path : "")
                          ? "#fff"
                          : path.includes(item.path ? item.path : "")
                          ? "#fff"
                          : "#64748B",
                      variant:
                        item.id === buttonHoveredId ||
                        path.includes(item.path ? item.path : "")
                          ? "Bold"
                          : "Linear",
                    })}
                  </span>
                )}
                <p className="min-w-[150px] text-left text-b2">{item.title}</p>
              </div>
            )}

            {item.type === "dropdown_btn" && (
              <div className="overflow-hidden rounded-md">
                <div
                  className={`py-[9px] px-3 h-10 cursor-pointer rounded-md hover:bg-dark-500 transition-all !duration-500  w-full ${
                    collapsed &&
                    !isSidebarHovered &&
                    "gap-5 transition-all !duration-500 px-4"
                  } ${
                    path.includes(item.path ? item.path : "") &&
                    "text-white font-medium"
                  } ${
                    active && "text-primary-500"
                  } flex items-center text-b2 font-small hover:font-medium text-neutral-400 hover:text-white transition-all duration-100 overflow-hidden justify-between`}
                  style={{background: (path && item.path && path.includes(item.path)) ? "linear-gradient(180deg, rgba(40, 16, 86, 0.86) 0%, rgba(21, 43, 107, 0.00) 100%)" : "none"}}
                  onMouseEnter={() => setButtonHoveredId(item.id)}
                  onMouseLeave={() => setButtonHoveredId(null)}
                  onClick={() => handleDropdownClick(item.id)}
                >
                  <div
                    className={`flex items-center gap-2 transition-all duration-300 ${
                      collapsed &&
                      !isSidebarHovered &&
                      "gap-5 transition-all !duration-500"
                    }`}
                  >
                    {item.icon && iconComponents[item.icon] && (
                      <span className="transition-colors duration-300">
                        {React.createElement(iconComponents[item.icon], {
                          size: 20,
                          color:
                            item.id === buttonHoveredId &&
                            !path.includes(item.path ? item.path : "")
                              ? "#fff"
                              : path.includes(item.path ? item.path : "")
                              ? "#fff"
                              : "#64748B",
                          variant:
                            item.id === buttonHoveredId ||
                            path.includes(item.path ? item.path : "")
                              ? "Bold"
                              : "Linear",
                        })}
                      </span>
                    )}
                    <p className="min-w-[150px] text-left">{item.title}</p>
                  </div>

                  <span
                    className={`${
                      openDropdownId === item.id && dropdownOpen && "rotate-90"
                    } transition-all duration-300 align-right`}
                  >
                    <IconsaxIcons.ArrowRight2
                      variant="Bold"
                      size={16}
                      color={
                        item.id === buttonHoveredId &&
                            !path.includes(item.path ? item.path : "")
                              ? "#fff"
                              : path.includes(item.path ? item.path : "")
                              ? "#fff"
                              : "#64748B"
                      }
                    />
                  </span>
                </div>

                <div
                  className={`overflow-hidden max-h-0 transition-all duration-300 ${
                    openDropdownId === item.id &&
                    dropdownOpen &&
                    "max-h-[1000px] py-1"
                  }`}
                >
                  {item.childrens?.map((btn, index, row) => {
                    return (
                      <div
                        key={btn.id}
                        className={`py-[9px] px-4 h-10 rounded-md cursor-pointer hover:bg-dark-500 w-full flex items-center text-b2 ${
                          path?.includes(btn.path ? btn.path : "") && "text-white bg-gradient-primary-700 font-medium"
                        } font-small text-neutral-400 hover:text-white gap-2 transition-all duration-300 ${
                          collapsed && !isSidebarHovered && "gap-4"
                        } overflow-hidden`}
                        onMouseEnter={() => {
                          setButtonHoveredId(btn.id);
                          setChildButtonHoveredId(btn.id);
                        }}
                        onMouseLeave={() => {
                          setButtonHoveredId(null);
                          setChildButtonHoveredId(null);
                        }}
                        onClick={() => router.push(`${selectedOrg?.name}${btn.path}?org-id=${selectedOrg?.id}` || "/")}
                      >
                        <div className="h-5 w-5 flex items-center justify-center">
                          <div
                            className={`w-1.5 h-1.5 bg-neutral-400 ${
                              btn.id === childButtonHoveredId && "!bg-white"
                            } ${
                              path?.includes(btn.path ? btn.path : "") &&
                              "bg-white"
                            } ${
                              btn.id === buttonHoveredId && "bg-neutral-400"
                            } rounded-full`}
                          ></div>
                        </div>
                        <p className="min-w-[150px] text-left">{btn.title}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {item.type === "group" && (
              <div className="h-6 my-2 text-caption font-medium text-neutral-300 px-4 flex items-center relative">
                {
                  <span
                    className={`absolute top-[11px] left-[-22px] h-[1px] w-7 bg-gradient-to-r from-white to-transparent transition-all duration-[400ms] ${
                      collapsed &&
                      !isSidebarHovered &&
                      "!left-[12px] !from-transparent !via-white !to-transparent"
                    } `}
                  ></span>
                }
                <span
                  className={`${
                    collapsed && !isSidebarHovered
                      ? "w-5 h-[1px]  overflow-hidden text-caption text-medium text-neutral-100 transition-all duration-300"
                      : ""
                  }`}
                >
                  {item.title}
                </span>
              </div>
            )}
          </React.Fragment>
        ))}
        </div>
      </div>
      {/* User */}
      <div
        ref={avatarRef}
        className={`p-5 w-full h-max bg-dark-800 largeTablet:flex items-center justify-between hidden ${
          collapsed && !isSidebarHovered ? "px-[22px]" : "px-5"
        } transition-all duration-300`}
      >
        <div className={`flex items-center justify-center gap-3`}>
          <div
            className={`min-w-[40px] transition-all duration-500 ${
              collapsed && !isSidebarHovered && "mr-10"
            }`}
          >
            <Image
              width={40}
              className={`transition-all duration-500 ${
                collapsed && !isSidebarHovered && "ml-[6px]"
              }`}
              src={Profile}
              alt="Profile image"
            />
          </div>
          <div>
            <p className="text-b2 font-medium text-neutral-200">
              Parth Goswami
            </p>
            <small className="text-neutral-400 text-caption">
              parth@automode.ai
            </small>
          </div>
        </div>
        <div
          onMouseDown={(e) => {
            if (e.button === 0) setPopoverOpen(!popoverOpen);
          }}
          className={`cursor-pointer`}
        >
          <Image width={24} src={Dots} alt="Dots" />
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
                  className="-right-[14px] -top-[325px] min-w-[252px]"
                >
                  {/* popover content goes here */}
                  <div className="">
                    <div className="mb-4 mt-4 px-3 flex items-center gap-3">
                      <div className="min-w-[40px] min-h-[40px]">
                        <Image
                          width={40}
                          height={40}
                          src={Profile}
                          alt="Profile image"
                        />
                      </div>
                      <div>
                        <h1 className="text-b2 font-medium text-neutral-700 cursor-default">
                          Parthbharti Goswami
                        </h1>
                        <h1 className="text-caption text-neutral-500 cursor-default">
                          parth.goswami@automode.ai
                        </h1>
                      </div>
                    </div>
                    <hr className="mb-2 text-neutral-200" />
                    <div className="mb-2 flex flex-col gap-1 px-3">
                      <Link
                        href="/admin/profile"
                        className="flex items-center gap-3 cursor-pointer hover:bg-secondary-50 transition-all duration-200 ease-in py-2 px-2 rounded-md"
                        onClick={() => setPopoverOpen(false)}
                      >
                        <Image src={User} alt="user" />
                        <h1 className="text-b2 text-neutral-600">My profile</h1>
                      </Link>
                      <Link
                        href="#"
                        className="flex items-center gap-3 cursor-pointer hover:bg-secondary-50 transition-all duration-200 ease-in py-2 px-2 rounded-md"
                        onClick={() => setPopoverOpen(false)}
                      >
                        <Image src={Gear} alt="settings" />
                        <h1 className="text-b2 text-neutral-600">Settings</h1>
                      </Link>
                      <Link
                        href="#"
                        className="flex items-center gap-3 cursor-pointer hover:bg-secondary-50 transition-all duration-200 ease-in py-2 px-2 rounded-md"
                        onClick={() => setPopoverOpen(false)}
                      >
                        <Image src={Support} alt="support" />
                        <h1 className="text-b2 text-neutral-600">Support</h1>
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
                        <h1 className="text-b2 text-neutral-600">Logout</h1>
                      </Link>
                    </div>
                  </div>
                </PopOver>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  ) : null;
};

export default React.forwardRef(Sidebar);
