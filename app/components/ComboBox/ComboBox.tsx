import React, { useState, useRef } from "react";
import "./ComboBox.css";
import { Select } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { useRouter } from "next/navigation";
import Image from "next/image";

import NoData from "../../../public/images/dashboard/no-data.png";
import NormalSearch from "../../../public/navbar/search-normal.svg";
import ArrowRight from "../../../public/navbar/arrow-right.svg";
import Note2 from "../../../public/navbar/note-2.svg";
import ProfileAdd from "../../../public/navbar/profile-add.svg";
import TruckFast from "../../../public/navbar/truck-fast.svg";
import Receipt2 from "../../../public/navbar/receipt-2.svg";
import ThreeDCube from "../../../public/navbar/3dcube.svg";
import DocumentText from "../../../public/navbar/document-text.svg";
import refreshCircle from "../../../public/navbar/refresh-circle.svg";
import Support from "../../../public/navbar/support.svg";

type ComboBoxProps = {
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
};

const { Option, OptGroup } = Select;

const isOptionInResultsGroup = (option: DefaultOptionType | undefined) => {
  return option?.group === "Results";
};

const options = [
  {
    value: "Create new chart of account",
    path: "/chart-of-account",
    icon: <Image src={Note2} alt="option icon" />,
    iconRight: <Image src={ArrowRight} alt="common icon" />,
  },
  {
    value: "Create new contact",
    path: "/contact",
    icon: <Image src={ProfileAdd} alt="option icon" />,
    iconRight: <Image src={ArrowRight} alt="common icon" />,
  },
  {
    value: "Create new customer",
    path: "/customer",
    icon: <Image src={ProfileAdd} alt="option icon" />,
    iconRight: <Image src={ArrowRight} alt="common icon" />,
  },
  {
    value: "Create new eway bill",
    path: "/eway-bill",
    icon: <Image src={TruckFast} alt="option icon" />,
    iconRight: <Image src={ArrowRight} alt="common icon" />,
  },
  {
    value: "Create new invoice",
    path: "/invoice",
    icon: <Image src={Receipt2} alt="option icon" />,
    iconRight: <Image src={ArrowRight} alt="common icon" />,
  },
  {
    value: "Create new item",
    path: "/item",
    icon: <Image src={ThreeDCube} alt="option icon" />,
    iconRight: <Image src={ArrowRight} alt="common icon" />,
  },
  {
    value: "Create new journal entry",
    path: "/journal-entry",
    icon: <Image src={Note2} alt="option icon" />,
    iconRight: <Image src={ArrowRight} alt="common icon" />,
  },
];

const recommendations = [
  {
    value: "Documentation",
    path: "/docs",
    icon: <Image src={DocumentText} alt="option icon" />,
  },
  {
    value: "Recent Updates",
    path: "/recent-updates",
    icon: <Image src={refreshCircle} alt="option icon" />,
  },
  {
    value: "Support",
    path: "/support",
    icon: <Image src={Support} alt="option icon" />,
  },
];

const ComboBox = ({ setIsSearching, getPopupContainer }: ComboBoxProps) => {
  const selectRef = useRef<any>(null);
  const router = useRouter();
  // const [recentSelections, setRecentSelections] = useState<string[]>([]);
  const [isDropDownOpen, setIsDropDownOpen] = useState(true);
  const [searchValue, setSearchValue] = useState<string | undefined>("");

  const handleClickOutside = () => {
    setIsDropDownOpen(false);
    setTimeout(() => {
      setIsSearching(false);
    }, 300);
  };

  const onSelect = (value: string, group?: string) => {
    console.log(`selected ${value}`);

    // setRecentSelections((prev) => {
    //   const newRecentSelections = [...prev, value].filter(
    //     (v, i, a) => a.lastIndexOf(v) === i
    //   );
    //   return newRecentSelections.slice(-3);
    // });

    const option = [...options, ...recommendations].find(
      (option) => option.value === value
    );
    if (option) {
      setSearchValue(""); // clear the value before navigating
      router.push(option.path);
    }
  };

  const onSearch = (value: string) => {
    setSearchValue(value);
    console.log("search:", value);
  };

  const clearSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (searchValue) {
      setSearchValue("");
      setIsDropDownOpen(true);
    }
  };

  const noContentFound = (
    <div className="flex flex-col items-center justify-center text-center py-6 px-5">
      <Image
        className="mb-3"
        height={65}
        width={125}
        src={NoData}
        alt="No Content Found"
      />
      <h1 className="text-b2 font-medium text-neutral-700">No results found</h1>
      <p className="text-caption text-neutral-500 mb-3">
        {`"${
          searchValue || "Your search"
        }" did not match any Results. Please try again.`}
      </p>
      <button
        onClick={clearSearch}
        className="border border-neutral-300 rounded-md h-[28px] text-secondary-700 text-caption flex py-[5px] px-[14px] items-center justify-center shadow-xs"
      >
        Clear Search
      </button>
    </div>
  );

  const highlightSearch = (value: string, searchValue: string) => {
    const regex = new RegExp(`(${searchValue})`, "gi");
    const highlighted = value.replace(
      regex,
      `<span class="text-neutral-600 font-medium">$&</span>`
    );
    return (
      <span
        className="text-neutral-400"
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />
    );
  };

  return (
    <>
      <div className="w-full flex items-center justify-center overflow-hidden bg-white !rounded-t-lg px-5 relative">
        <Image width={20} height={20} src={NormalSearch} alt="Normal Search" />
        <Select
          id="search"
          ref={selectRef}
          getPopupContainer={getPopupContainer}
          suffixIcon={<></>}
          animation="none"
          searchValue={searchValue}
          className="w-full h-[60px] py-[16px]"
          dropdownRender={(menu) => {
            // Check if there are any options matching the search value
            const hasMatchingOption = options.some((option) =>
              option.value
                .toLowerCase()
                .includes((searchValue || "").toLowerCase())
            );
            return (
              <div>
                {menu}
                <div
                  className={`dropdown-section ${
                    searchValue &&
                    searchValue.length >= 3 &&
                    "mt-3 border-t border-t-neutral-300 py-2"
                  }`}
                >
                  <div className="font-medium text-neutral-700 text-b2 py-2 px-5 poi">
                    Recommendations
                  </div>
                  {recommendations.map((option) => (
                    <div
                      key={`Recommendations-${option.value}`}
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        onSelect(option.value, "Recommendations");
                      }}
                      className="flex items-center gap-1 capitalize py-2 px-5 cursor-pointer hover:bg-secondary-50 transition-all duration-200 ease-in"
                    >
                      <div className="w-[20px] h-[20px]">{option.icon}</div>
                      {option.value}
                    </div>
                  ))}
                </div>
              </div>
            );
          }}
          popupClassName={`combo-box !w-full !left-0 !top-[60px] !px-0
            ${searchValue && searchValue.length >= 3 && "!pt-2"}
           !border !shadow-xl !border-t !border-t-neutral-300 !text-neutral-600 !rounded-t-none !rounded-b-lg`}
          value={searchValue}
          onChange={setSearchValue}
          notFoundContent={
            searchValue && searchValue.length >= 3 ? noContentFound : <div />
          }
          listHeight={380}
          autoFocus
          // labelInValue
          onBlur={handleClickOutside}
          onClick={() => setIsDropDownOpen(true)}
          open={isDropDownOpen}
          showSearch
          placeholder="Select a task"
          optionFilterProp="children"
          onSelect={(value, option) => onSelect(value, option.group)}
          onSearch={onSearch}
          filterOption={(input, option) =>
            input.length < 3 || // ignore filter when input length is less than 3
            (isOptionInResultsGroup(option) &&
              (option?.value ?? "")
                .toString()
                .toLowerCase()
                .includes(input.toLowerCase()))
          }
        >
          {/* {recentSelections.length > 0 && (
            <OptGroup label="Recents">
              {recentSelections.map((value, index) => (
                <Option key={`Recents-${value}`} value={value} group="Recents">
                  <div className="capitalize">{value}</div>
                </Option>
              ))}
            </OptGroup>
          )} */}
          {searchValue && searchValue.length >= 3 && (
            <OptGroup label="Results">
              {options.map((option) => (
                <Option
                  key={`Results-${option.value}`}
                  value={option.value}
                  group="Results"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div className="w-[20px] h-[20px]">{option.icon}</div>
                      {searchValue
                        ? highlightSearch(option.value, searchValue)
                        : option.value}
                    </div>
                    {option.iconRight}
                  </div>
                </Option>
              ))}
            </OptGroup>
          )}
        </Select>
        <button className="border border-neutral-300 rounded-md w-[48px] h-[28px] text-secondary-500 text-caption flex py-[5px] px-[14px] items-center justify-center shadow-xs">
          Esc
        </button>
      </div>
    </>
  );
};

export default ComboBox;
