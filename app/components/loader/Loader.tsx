import React from 'react';

type LoaderProps = {
  size?: 'sm' | 'md' | 'lg';
  color?: 'red' | 'blue' | 'green' | 'yellow' | 'secondary' | 'white' | 'primary';
  circleBackground?: 'red' | 'blue' | 'green' | 'yellow' | 'secondary' | 'white' | 'primary';
  mode?: 'light' | 'dark';
  centerBg?: 'red' | 'blue' | 'green' | 'yellow' | 'secondary' | 'white' | 'primary';
  ghost?: boolean;
  textButton?: boolean;
  isPressed?: boolean;
};

const Loader: React.FC<LoaderProps> = ({ color = 'primary', size = 'sm', mode = 'dark', centerBg = "primary", ghost, textButton, isPressed}) => {
  
  
    const colorClass = `loader-${color}`;

  const circleColorClass = {
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    green: 'bg-green-600',
    yellow: 'bg-yellow-600',
    secondary: 'bg-secondary-500',
    white: 'bg-white',
    primary: 'bg-primary-500',
  }

  const sizeClass = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  }

  const SizeClass2 = {
    sm: 'w-2 h-2',
    md: 'w-[9.34px] h-[9.34px]',
    lg: 'w-[10.66px] h-[10.66px]',
    }

const SizeClass3 = {
    sm: 'w-0.5 h-0.5 top-[10px]',
    md: 'w-[2.33px] h-[2.33px] top-[11.66px]',
    lg: 'w-[2.67px] h-[2.67px] top-[13.33px] ',
    }


const centerBgClass = {
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    green: 'bg-green-600',
    yellow: 'bg-yellow-600',
    secondary: ghost || textButton ? "bg-white" : 'bg-secondary-50',
    white: 'bg-white',
    primary: 'bg-primary-500',
}

const isPressedColorClass = {
    red: textButton ? '!bg-red-100' : '!bg-red-800',
    blue: textButton ? '!bg-blue-100' : '!bg-blue-800',
    green: textButton ? '!bg-green-100' : '!bg-green-800',
    yellow: textButton ? '!bg-yellow-100' : '!bg-yellow-800',
    secondary: textButton || ghost ? '!bg-secondary-100' : '!bg-secondary-600',
    white: 'bg-white',
    primary: textButton ? '!bg-primary-100' : '!bg-primary-800',
}


  return (
    <div className={`loader-animation relative ${sizeClass[size]} rounded-full flex items-center justify-center ${centerBg === "primary" && !ghost && "loader-primary" } ${centerBg === "secondary" && isPressed && !ghost && !textButton && "loader-white"} ${mode === "light" && centerBg !== "secondary" ? "loader-white" : colorClass}`}>
      <div className={`absolute ${mode === "light" ?  "bg-white" : circleColorClass[color]} ${SizeClass3[size]} circle-animation rounded-full top-10px right-5px `}></div>
    </div>
  );
};

export default Loader;
