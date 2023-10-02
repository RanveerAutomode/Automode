import React, { useEffect, useState, useRef } from "react";

type CarouselProps = {
  showDots?: boolean;
  dotsPrimary?: string;
  dotsSecondary?: string;
  transitionTime?: number;
  fullScreen?: boolean;
  children: React.ReactNode[];
};

const Carousel: React.FC<CarouselProps> = ({
  showDots = true,
  dotsPrimary = "bg-primary-50",
  dotsSecondary = "bg-secondary-50",
  transitionTime = 1000,
  fullScreen = false,
  children,
}) => {
  const slides = children;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        if (currentSlide < slides.length) {
          setCurrentSlide((prevSlide) => prevSlide + 1);
        } else {
          setCurrentSlide(0);
        }
      }
    }, 1000 + transitionTime);
    return () => clearInterval(slideInterval);
  }, [slides.length, isTransitioning, transitionTime, currentSlide]);

  useEffect(() => {
    if (currentSlide === slides.length) {
      const resetTransition = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(0);
      }, transitionTime);
      return () => clearTimeout(resetTransition);
    } else {
      const resetTransitioning = setTimeout(() => {
        setIsTransitioning(false);
      }, transitionTime);
      return () => clearTimeout(resetTransitioning);
    }
  }, [currentSlide, slides.length, transitionTime]);

  const slideShow = [...slides, slides[0]];

  return (
    <div
      className={`relative w-[100%] ${
        fullScreen && "h-screen flex flex-col items-center justify-center"
      }`}
    >
      <div className="overflow-hidden">
        <div
          className={`flex transition-${
            isTransitioning ? "transform duration-[1000ms] ease-in-out" : "none"
          }`}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slideShow.map((slide, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 flex justify-center"
            >
              {slide}
            </div>
          ))}
        </div>
      </div>
      {showDots && (
        <div className="flex justify-center mt-2 items-center">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-[10px] h-[10px] mx-1 rounded-full ease-in-out duration-[1000ms] ${
                currentSlide % slides.length === index
                  ? `${dotsPrimary}`
                  : `${dotsSecondary}`
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
