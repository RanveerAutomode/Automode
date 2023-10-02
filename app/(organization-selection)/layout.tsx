"use client";

import "@/app/globals.css";
import { Inter } from "next/font/google";
import { ConfigProvider } from "antd";
import CustomHead from "../head/_head";
import CustomScrollbar from "../components/scrollbar/CustomScrollbar";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import Sidebar from "../components/sidebar/Sidebar";
import TopBar from "../components/topbar/TopBar";
import Footer from "../components/footer/Footer";
import { SidebarProvider } from "../contexts/sidebarContexts";

type RootLayoutProps = {
  children: React.ReactNode;
  showLayoutComponents?: boolean;
};

export default function RootLayout({
  children,
  showLayoutComponents = true,
}: RootLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
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
  const addOrganizationPath = pathname === "/organization/add-organization";

  return (
    <>
      <CustomHead />
      <html lang="en">
        <head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/favicon.ico" sizes="any" />
        </head>
        <body className="overflow-hidden flex flex-col h-screen">
          <SidebarProvider>
            {!loginPath ? (
              <div className="flex h-full">
                <Sidebar
                  isVisible={isSidebarOpen}
                  toggleSidebar={toggleSidebar}
                  ref={sidebarRef}
                  isCollapsed={(collapsed) => {
                    setCollapsed(collapsed);
                  }}
                />
                <div className="flex flex-col w-full bg-[#F1F4F9]">
                  <TopBar toggleSidebar={toggleSidebar} />
                  <div
                    className={`flex-grow max-w-full ${
                      !collapsed
                        ? "largeTablet:max-w-[calc(100vw-264px)]"
                        : "largeTablet:max-w-[calc(100vw-96px)]"
                    } transition-all duration-500 flex flex-col justify-between overflow-hidden `}
                    id="content"
                  >
                    <div className="p-4 mobile:p-8 largeTablet:p-6">
                      <CustomScrollbar key={childrenKey} />
                      {children}
                    </div>
                    {!addOrganizationPath && <Footer />}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-grow overflow-auto">
                <CustomScrollbar key={childrenKey} />
                {children}
              </div>
            )}
          </SidebarProvider>
        </body>
      </html>
    </>
  );
}
