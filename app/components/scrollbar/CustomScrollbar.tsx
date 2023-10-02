"use client";
import React, { useEffect, useRef } from 'react';


type CustomScrollbarProps = {
};
const CustomScrollbar: React.FC<CustomScrollbarProps> = ({ }) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const scrollContainer = document.querySelector('.overflow-y-auto');

    const hideScrollbar = () => {
      scrollContainer?.classList.add('scrollbar-hidden');
    };
    timeoutRef.current = setTimeout(hideScrollbar, 1500);

    const handleScroll = () => {
      clearTimeout(timeoutRef.current!);

      timeoutRef.current = setTimeout(hideScrollbar, 1500);

      if (
        scrollContainer?.scrollTop === 0 &&
        scrollContainer.scrollHeight <= scrollContainer.clientHeight
      ) {
      } else {
        scrollContainer?.classList.remove('scrollbar-hidden');
      }
    };

    scrollContainer?.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timeoutRef.current!);
      scrollContainer?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null;
};

export default CustomScrollbar;
