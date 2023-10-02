"use client";

import { Inter } from "next/font/google";
import Sidebar from "../components/sidebar/Sidebar";
import TopBar from "../components/topbar/TopBar";
import CustomHead from "../head/_head";
import { ConfigProvider } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import CustomScrollbar from "../components/scrollbar/CustomScrollbar";
import { Footer } from "antd/es/layout/layout";
import { usePathname } from "next/navigation";

const HelpArticleLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const childrenKey = useMemo(
    () => Math.random().toString(36).substr(2, 9),
    []
  );

  const pathname = usePathname();

  const loginPath = pathname === "/login" || pathname === "/signup";
  return (
    <>
      <CustomHead />
      <html lang="en">
        <head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/favicon.ico" sizes="any" />
        </head>
        <body className="overflow-hidden flex flex-col h-screen">
          {!loginPath ? (
            <div className="flex h-full">
              <div className="flex flex-col w-full bg-[#F1F4F9]">
                <TopBar toggleSidebar={toggleSidebar} />
                <div className="flex-grow flex flex-col justify-between overflow-auto h-full">
                  <div className="h-full">
                    <CustomScrollbar key={childrenKey} />
                    {children}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-grow overflow-auto">
              <CustomScrollbar key={childrenKey} />
              {children}
            </div>
          )}
        </body>
      </html>
    </>
  );
};

export default HelpArticleLayout;
