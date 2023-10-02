import { useEffect, useState } from "react";

import TickCircle from "@/public/toast-icon/tick-circle.svg";
import Image from "next/image";
import X from "@/public/toast-icon/x.svg";
import Svg from "../svg/Svg";
import Eye from "@/public/toast-icon/eye.svg";
import Button from "../buttons/Button";

type ToastProps = {
  message: string;
  description?: string;
  button?: boolean;
  type?:
    | "green"
    | "red"
    | "yellow"
    | "primary"
    | "secondary"
    | "blue"
    | "primary-gradient";
  duration?: number;
  toastVisible?: boolean | null;
};

const Toast: React.FC<ToastProps> = ({
  message,
  description,
  button,
  type = "info",
  duration = 3000,
  toastVisible = false,
}) => {
  const [visible, setVisible] = useState(false);
  const [enable, setEnable] = useState(false);

  useEffect(() => {
    if (toastVisible === null) return;
    if(toastVisible === false) return;
    setVisible(true);
    setTimeout(() => {
      setEnable(true);
    }, 100);

    setTimeout(() => {
      setEnable(false);
    }, duration);

    const timer = setTimeout(() => {
      setVisible(false);
    }, duration + 1000);

    return () => clearTimeout(timer);
  }, [toastVisible, duration]);

  if (!visible) return null;

  const bgColor = () => {
    switch (type) {
      case "green":
        return "bg-green-50 text-green-600";
      case "red":
        return "bg-red-50 text-red-500";
      case "yellow":
        return "bg-yellow-50 text-yellow-600";
      case "primary":
        return "bg-primary-50 text-primary-500";
      case "secondary":
        return "bg-secondary-50 text-secondary-500";
      case "blue":
        return "bg-blue-50 text-blue-500";
      case "primary-gradient":
        return "bg-primary-50 text-primary-500";
      default:
        return "bg-primary-50 text-primary-500";
    }
  };

  const descColor = () => {
    switch (type) {
      case "green":
        return "text-green-700";
      case "red":
        return "text-red-700";
      case "yellow":
        return "text-yellow-700";
      case "primary":
        return "text-primary-700";
      case "secondary":
        return "text-secondary-600";
      case "blue":
        return "text-blue-700";
      case "primary-gradient":
        return "text-primary-700";
      default:
        return "text-primary-700";
    }
  };

  const buttonColor = () => {
    switch (type) {
      case "green":
        return "green";
      case "red":
        return "red";
      case "yellow":
        return "yellow";
      case "primary":
        return "primary";
      case "secondary":
        return "secondary";
      case "blue":
        return "blue";
      case "primary-gradient":
        return "primary";
      default:
        return "primary";
    }
  };

  const leftIconColors = () => {
    switch (type) {
      case "green":
        return "border-green-700 bg-green-400";
      case "red":
        return "border-red-700 bg-red-400";
      case "yellow":
        return "border-yellow-700 bg-yellow-400";
      case "primary":
        return "border-primary-700 bg-primary-400";
      case "secondary":
        return "border-secondary-700 bg-secondary-400";
      case "blue":
        return "border-blue-700 bg-blue-400";
      case "primary-gradient":
        return "border-primary-700 bg-primary-400";
      default:
        return "border-primary-700 bg-primary-400";
    }
  };

  const closeIconColor = () => {
    switch (type) {
      case "green":
        return "text-green-500";
      case "red":
        return "text-red-500";
      case "yellow":
        return "text-yellow-500";
      case "primary":
        return "text-primary-500";
      case "secondary":
        return "text-secondary-500";
      case "blue":
        return "text-blue-500";
      case "primary-gradient":
        return "text-primary-500";
      default:
        return "text-primary-500";
    }
  };

  return (
    <div
      className={`fixed flex items-center max-w-[680px] top-[14px] gap-2 transition-all duration-[1000ms] ${
        enable ? "right-4" : "right-[-800px]"
      } p-4 font-medium rounded-lg ${bgColor()}`}
    >
      <div className="w-full flex flex-col">
        <div
          className={`w-full flex items-center justify-between gap-2 ${
            description && "mb-3"
          }`}
        >
          <div className="w-full flex gap-2">
            <div className={`border-2 rounded-full ${leftIconColors()} p-1`}>
              <Image src={TickCircle} alt="tick-circle" />
            </div>
            {message}
          </div>
          <Svg
            icon={X}
            width={16}
            height={16}
            alt="close"
            color={closeIconColor()}
            className="cursor-pointer"
            onClick={() => setEnable(false)}
          />
        </div>
        {description && (
          <div
            className={`text-b2 ${button && "mb-3"} font-normal ${descColor()}`}
          >
            {description}
          </div>
        )}
        {button && (
          <Button
            color={buttonColor()}
            size="md"
            leftIcon={Eye}
            className="h-8 w-max"
          >
            View status
          </Button>
        )}
      </div>
    </div>
  );
};

export default Toast;

// how to use it

//create a state in parent component and pass it to toast component as a prop by default it is null and when you want to show toast set it to true and when you want to hide it set it to false

// const [toastVisible, setToastVisible] = useState<boolean | null>(null);

// <Toast message="This is a success toast" type="success" toastVisible={toastVisible} />

// <button onClick={() => setToastVisible(!toastVisible)}>Show Toast</button>
