import React from "react";

const Footer = () => {
  return (
    <div
      className={`inline-flex max-tablet:flex-col items-center w-full justify-between gap-2.5 px-6 py-3 text-neutral-500`}
    >
      <div className="relative flex-grow text-left max-mobile:text-center">
        <p className="inline text-caption">{"Copyright © 2023 "}</p>
        <p className="inline text-caption font-semibold">
          {"Automode AI Consulting Pvt. Ltd. "}
        </p>
        <p className="inline text-caption">All rights reserved</p>
      </div>
      <p className="text-right max-mobile:text-center text-caption">
        {"Terms & Conditions "}
        <span className="text-neutral-500">{" | "}</span>
        {" Privacy & Policy"}
      </p>
    </div>
  );
};

export default Footer;
