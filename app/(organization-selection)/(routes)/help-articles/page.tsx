"use client";

import { NextPage } from "next";
import React, { useEffect } from "react";
import Image, { StaticImageData } from "next/image";

import Input from "../../../components/input/Input";
import Button from "../../../components/buttons/Button";
import Carousel from "../../../components/carousel/Carousel";

import Bubble from "@/public/help-articles/bubble.svg";
import SearchNormal from "@/public/custom-select/search-normal.svg";
import ArrowRight from "@/public/help-articles/arrow-right.svg";
import PhoneRing from "@/public/help-articles/phone-ring.svg";
import Sms from "@/public/help-articles/sms-outline.svg";
import Building from "@/public/help-articles/buildings-2.svg";
import Cash from "@/public/help-articles/cash.svg";
import UserAdd from "@/public/help-articles/user-add.svg";
import Note from "@/public/help-articles/note-2.svg";
import Chart from "@/public/help-articles/chart.svg";

interface Slide {
  id: number;
  image: StaticImageData;
  label?: string;
  supportingText?: string;
}

const CarouselSlides: Slide[] = [
  {
    id: 1,
    image: Bubble,
    label: "Getting Started",
    supportingText:
      "Lorem ipsum dolor sit amet consectetur. Facilisi purus dolor.",
  },
  {
    id: 2,
    image: Building,
    label: "Setup an Organization",
    supportingText:
      "Lorem ipsum dolor sit amet consectetur. Facilisi purus dolor.",
  },
  {
    id: 3,
    image: Cash,
    label: "Payments",
    supportingText:
      "Lorem ipsum dolor sit amet consectetur. Facilisi purus dolor.",
  },
  {
    id: 4,
    image: UserAdd,
    label: "Add Customer & Vendor",
    supportingText:
      "Lorem ipsum dolor sit amet consectetur. Facilisi purus dolor.",
  },
  {
    id: 5,
    image: Note,
    label: "Manage Orders",
    supportingText:
      "Lorem ipsum dolor sit amet consectetur. Facilisi purus dolor.",
  },
  {
    id: 6,
    image: Chart,
    label: "Manage Reports",
    supportingText:
      "Lorem ipsum dolor sit amet consectetur. Facilisi purus dolor.",
  },
];

const HelpArticles: NextPage = () => {
  const [screen, setScreen] = React.useState("desktop");

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 641) {
        setScreen("mobile");
      } else {
        setScreen("desktop");
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div>
      <div className="relative overflow-hidden bg-cover bg-no-repeat h-[320px] bg-[url('../public/images/help-articles/Background.jpg')]">
        <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden">
          <div className="flex w-full h-full items-center justify-center">
            <div className="px-4 text-center w-full flex flex-col items-center">
              <h1 className="mb-4 text-title text-neutral-600 font-semibold">
                Hello, how can we help?
              </h1>
              <Input
                className="w-full mb-4 max-w-[400px]"
                size="large"
                type="text"
                placeholderValue="What are you looking for?"
                iconLeft={SearchNormal}
              />
              <p className="text-neutral-500 text-b2">
                or choose a category to find your need
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <Button size="md" textButton rightIcon={ArrowRight}>
        Read more
      </Button> */}
      <div className="bg-white mobile:rounded-b-lg">
        <div className="text-center py-8 px-4 mobile:py-12 mobile:px-8 largeTablet:px-20 w-full max-w-[968px] m-auto">
          <h1 className="text-subtitle font-semibold mb-4 mobile:mb-8 mobile:text-title text-neutral-700">
            Popular Articles
          </h1>
          {screen === "mobile" && (
            <div>
              <Carousel
                dotsPrimary="bg-secondary-400 !w-[19px]"
                dotsSecondary="bg-secondary-100"
              >
                {CarouselSlides.map((slide) => (
                  <div className="rounded-lg border border-secondary-100 mb-4">
                    <div
                      key={slide.id}
                      className="w-full flex-shrink-0 flex justify-center"
                    >
                      <div className="flex flex-col items-center justify-center p-5">
                        <Image
                          className="mb-3"
                          width={32}
                          height={32}
                          src={slide.image}
                          alt="Help Article 1"
                        />
                        <div className="mb-3">
                          <h1 className="text-b1 text-neutral-600 font-medium mb-1">
                            {slide.label}
                          </h1>
                          <p className="text-b2 text-neutral-500">
                            {slide.supportingText}
                          </p>
                        </div>
                        <Button
                          className="max-w-max"
                          size="md"
                          textButton
                          rightIcon={ArrowRight}
                        >
                          Read more
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          )}
          <div className="hidden mobile:grid grid-cols-2 tablet:grid-cols-3 justify-items-center gap-x-6 gap-y-3">
            {CarouselSlides.map((slide) => (
              <div className="rounded-lg border border-secondary-100 mb-4 max-w-[280px]">
                <div
                  key={slide.id}
                  className="w-full flex-shrink-0 flex justify-center"
                >
                  <div className="flex flex-col items-center justify-center p-5">
                    <Image
                      className="mb-3"
                      width={32}
                      height={32}
                      src={slide.image}
                      alt="Help Article 1"
                    />
                    <div className="mb-3">
                      <h1 className="text-b1 text-neutral-600 font-medium mb-1">
                        {slide.label}
                      </h1>
                      <p className="text-b2 text-neutral-500">
                        {slide.supportingText}
                      </p>
                    </div>
                    <Button
                      className="max-w-max"
                      size="md"
                      textButton
                      rightIcon={ArrowRight}
                    >
                      Read more
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="px-4 py-12">
        <div className=" flex flex-col gap-4 items-center justify-center text-center">
          <div className="bg-gradient-primary-50 px-2 rounded-md">
            <h1 className="uppercase text-gradient-primary-500 text-caption font-medium">
              Question
            </h1>
          </div>
          <h1 className="text-neutral-600 text-subtitle font-semibold">
            You still need help?
          </h1>
          <p className="text-neutral-500 text-b2 ">
            If you cannot find a topic in our Articles, you can always contact
            us. We will answer to you shortly!
          </p>
          <div className="w-full flex flex-col mobile:flex-row gap-3">
            <div className="bg-white w-full rounded-lg py-6 flex flex-col gap-3 items-center justify-center">
              <div className="p-2 bg-gradient-primary-500 rounded-lg w-10 h-10">
                <Image src={PhoneRing} alt="phone icon" />
              </div>
              <h1 className="text-b1 mobile:text-subtitle font-semibold text-neutral-600">
                +91 85112 50588
              </h1>
              <p className="text-b2 text-neutral-500">
                We are always happy to help!
              </p>
            </div>
            <div className="bg-white w-full rounded-lg py-6 flex flex-col gap-3 items-center justify-center">
              <div className="p-2 bg-gradient-primary-500 rounded-lg w-10 h-10">
                <Image src={Sms} alt="phone icon" />
              </div>
              <h1 className="text-b1 mobile:text-subtitle font-semibold text-neutral-600">
                support@automode.ai
              </h1>
              <p className="text-b2 text-neutral-500">
                Best way to get answer faster!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpArticles;
