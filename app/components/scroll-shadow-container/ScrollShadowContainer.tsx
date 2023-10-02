import useScreenSize from "@/app/hooks/screenSize";
import { set } from "lodash";
import React, { useEffect, useState } from "react";

type ScrollShadowContainerProps = {
  children: React.ReactNode;
  maxHeight?: string;
  id: string;
  roundedTop?: boolean;
  roundedBottom?: boolean;
  shadowTop?: string;
  shadowBottom?: string;
  className?: string;
};
const ScrollShadowContainer: React.FC<ScrollShadowContainerProps> = ({
  children,
  maxHeight,
  id,
  roundedTop,
  roundedBottom,
  shadowTop,
  shadowBottom,
  className,
}) => {
  const [scrollState, setScrollState] = useState<string | null>("top");
  const [clientHeight, setClientHeight] = useState<number>(0);
  const screenSize = useScreenSize();

  setTimeout(() => {
    const divHeight = document.getElementById(id)?.clientHeight;
    divHeight && setClientHeight(divHeight);
  }
  , 100);

  useEffect(() => {
    const handleScroll = (e: any) => {
      const scrollHeight = e.target?.scrollHeight;
      const scrollTop = e.target?.scrollTop;
      const clientHeight = e.target?.clientHeight;

      if (scrollHeight === clientHeight) {
        setScrollState(null);
        return;
      }

      if (scrollTop === 0) {
        setScrollState("top");
      } else if (scrollTop === scrollHeight - clientHeight) {
        setScrollState("bottom");
      } else {
        setScrollState("middle");
      }
    };
    setTimeout(() => {
      handleScroll({ target: document.getElementById(id) });
    }, 100);

    const form = document.getElementById(id);
    form?.addEventListener("scroll", handleScroll);
    handleScroll({ target: form });

    return () => {
      form?.removeEventListener("scroll", handleScroll);
    };
  }, [screenSize, clientHeight]);

  
  return (
    <>
      <div
        className={`${className} w-full ${maxHeight}  overflow-auto`}
        id={id}>
        {children}
      </div>
      <div
        className={`${
          scrollState !== null && scrollState !== "top"
            ? "shadow-custom shadow--top"
            : "!h-0"
        }  ${roundedTop && "rounded-tr-[8px] rounded-tl-[8px]"}`}
        style={{ top: shadowTop ? shadowTop : "0px" }}></div>
      <div
        className={`${
          scrollState !== null && scrollState !== "bottom"
            ? "shadow-custom shadow--bottom"
            : "!h-0"
        } ${roundedBottom && "rounded-br-[8px] rounded-bl-[8px]"} `}
        style={{ bottom: shadowBottom ? shadowBottom : "0px" }}></div>
    </>
  );
};

export default ScrollShadowContainer;
