"use client";

import Checkbox from "@/app/components/checkbox/Checkbox";
import FilterCheckbox from "@/app/components/filter-checkbox/FilterCheckbox";
import Radio from "@/app/components/radio/Radio";
import CustomSelect from "@/app/components/select/CustomSelect";
import TagInput from "@/app/components/tag-input/TagInput";
import React, { useState } from "react";

const TestPage = () => {
  const options = [
    {
      label: "All",
      value: "All",
    },
    {
      label: "Option 2",
      value: "Option 2",
    },
    {
      label: "Option 3",
      value: "Option 3",
    },
    {
      label: "Option 4",
      value: "Option 4",
    },
    {
      label: "Option 5",
      value: "Option 5",
    },
    {
      label: "Option 6",
      value: "Option 6",
    },
    {
      label: "Option 7",
      value: "Option 7",
    },
    {
      label: "Option 8",
      value: "Option 8",
    },
    {
      label: "Option 9",
      value: "Option 9",
    },
    {
      label: "Option 10",
      value: "Option 10",
    },
  ];

  return (
    <div>
      {/* <CustomSelect selectMode="multiple" options={options} /> */}
      {/* <FilterCheckbox label="Text" /> */}
      <TagInput />
      
    </div>
  );
};

export default TestPage;
