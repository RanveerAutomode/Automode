type Props = {
  text?: string;
  color?: "primary" | "secondary" | "green" | "red" | "yellow" | "blue" | "primaryGradient";
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
  onClick?: () => void;
  leftDot?: boolean;
  className?: string;
};

const Badge: React.FC<Props> = ({
  text = "Badge",
  color = "primary",
  size = "sm",
  children,
  onClick,
  leftDot,
  className,
}) => {
  const bgColors: { [key: string]: string } = {
    primary: "bg-primary-50",
    secondary: "bg-secondary-50",
    green: "bg-green-50",
    red: "bg-red-50",
    yellow: "bg-yellow-50",
    blue: "bg-blue-50",
    primaryGradient: "bg-gradient-primary-50",
  };

  const textColors: { [key: string]: string } = {
    primary: "text-primary-500",
    secondary: "text-secondary-500",
    green: "text-green-600",
    red: "text-red-500",
    yellow: "text-yellow-600",
    blue: "text-blue-500",
    primaryGradient: "text-gradient-primary-500",
  };

  const dotColors: { [key: string]: string } = {
    primary: "bg-primary-500",
    secondary: "bg-secondary-500",
    green: "bg-green-600",
    red: "bg-red-500",
    yellow: "bg-yellow-600",
    blue: "bg-blue-500",
    primaryGradient: "bg-gradient-primary-500",
  };


  const padding: { [key: string]: string } = {
    sm: "py-[3px] px-2",
    md: "py-[5px] px-2",
    lg: "p-2",
  };

  const textSize: { [key: string]: string } = {
    sm: "text-caption",
    md: "text-b2",
    lg: "text-subtitle",
  };

  return (
    <div
      className={`${padding[size]} ${className} flex h-max items-center w-max rounded-[6px] text-caption font-medium ${bgColors[color]} ${onClick ? "cursor-pointer" : "cursor-default"}`} onClick={onClick}
    >
      {leftDot && <div className={`w-[6px] h-[6px] rounded-full mr-[6px] ${dotColors[color]}`}></div>}
      <p className={`${textSize[size]} font-medium ${textColors[color]} whitespace-nowrap`}>
        {children}
      </p>
    </div>
  );
};

export default Badge;
