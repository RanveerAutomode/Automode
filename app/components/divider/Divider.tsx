import Image from "next/image";
import Button from "../buttons/Button";

type DividerProps = {
  size?: "sm" | "md";
  centerText?: string;
  leftText?: string;
  rightText?: string;
  centerIcon?: string;
  centerBtn?: string;
  leftBtn?: string;
  rightBtn?: string;
  btnConfig?: any;
  className?: string;
};

const Divider: React.FC<DividerProps> = ({
  size = "sm",
  centerText,
  leftText,
  rightText,
  centerBtn,
  leftBtn,
  rightBtn,
  btnConfig,
  centerIcon,
  className,
}) => {
  const dividerSize = {
    sm: "border-y-[0.5px]",
    md: "border-y",
  };

  return (
    <div className="w-full flex flex-col items-center ">
      <hr
        className={`${dividerSize[size]} w-full border-neutral-200 mt-[13px] `}
      />

      {centerIcon && (
        <div
          className={` ${
            size === "md" ? "mt-[-17px]" : "mt-[-16px]"
          } flex items-center justify-center bg-white  w-8 h-8`}
        >
          <Image src={centerIcon} width={12} height={12} alt="icon" />
        </div>
      )}

      {centerText && (
        <p
          className={`text-b1 ${className} text-neutral-400 bg-white px-3 mt-[-13px]`}
        >
          {centerText}
        </p>
      )}
      {centerBtn && (
        <div className={`px-3 ${size === "md" ? "mt-[-18px]" : "mt-[-17px]"}`}>
          <Button
            ghost
            color="secondary"
            leftIcon={btnConfig?.leftIcon}
            rightIcon={btnConfig?.rightIcon}
          >
            {btnConfig?.text ? btnConfig.text : centerBtn}
          </Button>
        </div>
      )}

      <div
        className={`flex ${
          !leftBtn && !leftText ? "justify-end" : "justify-between"
        } w-full `}
      >
        {leftBtn && (
          <div
            className={`pr-3 ${size === "md" ? "mt-[-18px]" : "mt-[-17px]"}`}
          >
            <Button
              ghost
              color="secondary"
              leftIcon={btnConfig?.leftIcon}
              rightIcon={btnConfig?.rightIcon}
            >
              {btnConfig?.text ? btnConfig.text : leftBtn}
            </Button>
          </div>
        )}
        {leftText && (
          <p className="text-b1 text-neutral-400 bg-white pr-3 mt-[-13px] ">
            {leftText}
          </p>
        )}

        {rightBtn && (
          <div
            className={`pl-3 ${size === "md" ? "mt-[-18px]" : "mt-[-17px]"}`}
          >
            <Button
              ghost
              color="secondary"
              leftIcon={btnConfig?.leftIcon}
              rightIcon={btnConfig?.rightIcon}
            >
              {btnConfig?.text}
            </Button>
          </div>
        )}
        {rightText && (
          <p className="text-b1 text-neutral-400 bg-white pl-3 mt-[-13px] ">
            {rightText}
          </p>
        )}
      </div>
    </div>
  );
};

export default Divider;
