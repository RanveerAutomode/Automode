import Image, { StaticImageData } from "next/image";
import React from "react";
import Svg from "../svg/Svg";

type Props = {
  img?: any;
  text?: string;
  icon?: any;
  className?: string;
  status?: "online" | "offline" | "away";
  supportingHeading?: string;
  supportingTitle?: string;
  size: "xs" | "sm" | "md" | "lg";
  profile?: boolean;
  groupAvatars?: any;
  paymentIcon?: any;
};
const borderSize = {
  xs: "border",
  sm: "border-2",
  md: "border-2",
  lg: "border-4",
};

const imgSize = {
  xs: "h-6 w-6",
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
};

const textSize = {
  xs: "text-xs",
  sm: "text-xs",
  md: "text-sm",
  lg: "text-md",
};

const iconSize = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
};

const statusSize = {
  xs: "h-1 w-1 bottom-[0px] right-[1px] ",
  sm: "h-[5.33px] w-[5.33px] bottom-[1px] right-[1.5px]",
  md: "h-[6.67px] w-[6.67px] bottom-[1px] right-[2.5px]",
  lg: "h-2 w-2 bottom-[2px] right-[2px]",
};

const groupAvatarsSize = {
  xs: "h-6 w-6 border ml-[-8px]",
  sm: "h-8 w-8 border-2 ml-[-10px]",
  md: "h-10 w-10 border-2 ml-[-10px]",
  lg: "h-12 w-12 border-4 ml-[-12px]",
};

const Avatar: React.FC<Props> = ({
  img,
  size,
  status,
  text,
  icon,
  supportingHeading,
  supportingTitle,
  profile,
  groupAvatars,
  paymentIcon,
}) => {
  return (
    <div className={`${supportingHeading && "flex gap-x-3"}`}>
      {groupAvatars && (
        <div className="relative flex">
          {groupAvatars.slice(0, 5).map((avatar: any, index: number) => (
            <div
              key={avatar.id}
              className={`${groupAvatarsSize[size]} rounded-full border-white overflow-hidden `}
            >
              {avatar.img && (
                <Image
                  src={img}
                  alt="useImg"
                  className={`rounded-full w-[100%] h-[100%] `}
                />
              )}
              {avatar.text && (
                <div
                  className={`${textSize[size]} bg-primary-50 text-primary-500 w-[100%] h-[100%] font-medium rounded-full flex items-center justify-center`}
                >
                  {" "}
                  {avatar.text}{" "}
                </div>
              )}
            </div>
          ))}
          {groupAvatars.length > 5 && (
            <div
              className={`${groupAvatarsSize[size]} rounded-full border-white overflow-hidden `}
            >
              <div
                className={`${textSize[size]} bg-primary-50 text-primary-500 w-[100%] h-[100%] font-medium rounded-full flex items-center justify-center`}
              >
                +{groupAvatars.length - 5}
              </div>
            </div>
          )}
        </div>
      )}

      <div className={`rounded-full relative ${img && !profile && !groupAvatars && imgSize[size]} flex items-center gap-3 min-w-max`}>
        {img && !profile && !groupAvatars && (
          <Image
            src={img}
            alt="useImg"
            className={`${imgSize[size]} rounded-full`}
          />
        )}
        {status && !profile && !groupAvatars && (
          <div
            className={`${statusSize[size]} ${
              status === "online"
                ? "bg-green-500"
                : status === "offline"
                ? "bg-red-500"
                : "bg-yellow-500"
            } absolute rounded-full border border-white box-content`}
          />
        )}
        {text && !profile && !groupAvatars && (
          <div
            className={`${textSize[size]} ${imgSize[size]} bg-primary-50 text-primary-500 font-medium rounded-full flex items-center justify-center`}
          >
            {" "}
            {text}{" "}
          </div>
        )}

        {icon && (
          <div
            className={`${imgSize[size]} bg-primary-50 rounded-full flex items-center justify-center`}
          >
            <Svg
              icon={icon}
              color="text-primary-500"
              width={iconSize[size]}
              height={iconSize[size]}
            />
          </div>
        )}
        {paymentIcon && <Image 
              src={paymentIcon}
              alt="icon"
              width={size=== "xs" || size === "sm" ? 34 : 46}
              height={size=== "xs" || size === "sm" ? 24 : 32}
            />}
      </div>

      {supportingHeading && (
        <div
          className={`flex flex-col ${!supportingTitle && "justify-center"} `}
        >
          <h3
            className={`${
              size === "xs" ? "text-sm" : "text-md"
            } font-medium text-neutral-600`}
          >
            {supportingHeading}
          </h3>
          {supportingTitle && (
            <p
              className={`${
                size === "sm" ? "text-xs" : "text-sm"
              }  text-neutral-500`}
            >
              {supportingTitle}
            </p>
          )}
        </div>
      )}

      {profile && (
        <div className="relative">
          {text && (
            <div
              className={`${
                size === "md"
                  ? "border-2 w-[96px] h-[96px] text-h3"
                  : " w-[144px] h-[144px] border-[3px] text-h1"
              } box-content border border-white rounded-full flex items-center bg-primary-50 font-medium justify-center shadow-[0_4px_8px_-2px_rgba(16,24,40,0.1),0_2px_4px_-2px_rgba(16,24,40,0.06)]`}
            >
              <p className="text-gradient-primary-500">
              {text}
              </p>
            </div>
          )}

          {img && (
            <div
              className={`${
                size === "md"
                  ? "border-2 w-[96px] h-[96px] h3"
                  : " w-[144px] h-[144px] border-[3px] h1"
              } box-content border border-white rounded-full flex items-center justify-center shadow-[0_4px_8px_-2px_rgba(16,24,40,0.1),0_2px_4px_-2px_rgba(16,24,40,0.06)]`}
            >
              <Image
                src={img}
                alt="useImg"
                className={`w-full h-full rounded-full`}
              />
            </div>
          )}
          {status && (
            <div
              className={`${
                size === "lg"
                  ? "w-[21px] h-[21px] right-[15px] bottom-[9px] border-2"
                  : "w-[14px] h-[14px] right-[10px] bottom-[6px] border-2"
              } ${
                status === "online"
                  ? "bg-green-500"
                  : status === "offline"
                  ? "bg-red-500"
                  : "bg-yellow-500"
              } absolute rounded-full border-white box-content`}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Avatar;
