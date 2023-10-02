"use client";

import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import type { TableProps } from "antd/es/table";
import { SorterResult } from "antd/es/table/interface";

import Table from "@/app/components/table/Table";
import ContentHeader from "@/app/components/content-header/ContentHeader";
import TableSearchFilter from "@/app/components/table-search-filter/TableSearchFilter";
import CustomSelect from "@/app/components/select/CustomSelect";
import Radio from "@/app/components/radio/Radio";
import Button from "@/app/components/buttons/Button";
import Image from "next/image";
import Badge from "@/app/components/badges/Badge";
import { useRouter } from "next/navigation";

import ArrowDown from "@/public/outline-icons/arrow-down.svg";
import Dots from "@/public/outline-icons/vertical-dots.svg";

import TableData1 from "@/app/(organization-selection)/(routes)/organization/tableData";

import Logo from "@/public/logos/ellipse-8.svg";
import More from "@/public/outline-icons/more.svg";
import Modal from "@/app/components/modal/Modal";
import FilterCheckbox from "@/app/components/filter-checkbox/FilterCheckbox";
import TagInput from "@/app/components/tag-input/TagInput";
import useScreenSize from "@/app/hooks/screenSize";
import Link from "next/link";

export interface DataType {
  key: string;
  organization_name: {
    image: string;
    name: string;
    subtext: string;
  };
  user_role: string;
  primary_contact: string;
  status: string;
  subscription_status: {
    plan: string;
    expires_on: string;
    days_left: number;
  };
  action: string;
}

const initialFilters = [
  { key: "Organization Category", value: null },
  { key: "User Role", value: null },
  { key: "Primary Contact", value: null },
  { key: "Status", value: null },
  { key: "Subscription Status", value: null },
];

const filterData = [
  {
    Organization_category: [
      { label: "Art & Design", key: "1", value: "art_&_design" },
      { label: "Automotive", key: "2", value: "automotive" },
      { label: "Consulting", key: "3", value: "consulting" },
      { label: "Manufacturing", key: "4", value: "manufacturing" },
      { label: "Technology", key: "5", value: "technology" },
    ],
  },
  {
    User_role: [
      { label: "Admin", key: "1", value: "admin" },
      { label: "Accountant", key: "2", value: "accountant" },
      { label: "Sales", key: "3", value: "sales" },
      { label: "Purchase", key: "4", value: "purchase" },
      { label: "Production", key: "5", value: "production" },
      { label: "Inventory", key: "6", value: "inventory" },
      { label: "Auditor", key: "7", value: "auditor" },
      { label: "HR", key: "8", value: "hr" },
      { label: "Payroll", key: "9", value: "payroll" },
      { label: "External", key: "10", value: "external" },
    ],
  },
  {
    Subscription_plan: [
      { label: "Premium", key: "1", value: "premium" },
      { label: "Advanced", key: "2", value: "advanced" },
      { label: "Basic", key: "3", value: "basic" },
    ],
  },
  {
    Subscription_expiry: [
      { label: "Expired", key: "1", value: "expired" },
      { label: "0-1 month", key: "2", value: "0-1 month" },
      { label: "1-3 months", key: "3", value: "1-3 months" },
      { label: "3-6 months", key: "4", value: "3-6 months" },
      { label: "6-12 months", key: "5", value: "6-12 months" },
    ],
  },
  {
    Status: [
      { label: "Active", key: "1", value: "active" },
      { label: "Inactive", key: "2", value: "inactive" },
    ],
  },
];

const Organization: NextPage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");
  const [searchText, setSearchText] = useState<string>("");
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [tableNameShort, setTableNameShort] = useState<boolean>(false);
  const [TableData, setTableData] = useState<DataType[]>(TableData1);
  const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});
  const [filterList, setFilterList] = useState<any>([
    { key: "art_&_design", value: false },
    { key: "automotive", value: false },
    { key: "consulting", value: false },
    { key: "manufacturing", value: false },
    { key: "technology", value: false },
    { key: "admin", value: false },
    { key: "accountant", value: false },
    { key: "sales", value: false },
    { key: "purchase", value: false },
    { key: "production", value: false },
    { key: "inventory", value: false },
    { key: "auditor", value: false },
    { key: "hr", value: false },
    { key: "payroll", value: false },
    { key: "external", value: false },
    { key: "premium", value: false },
    { key: "advanced", value: false },
    { key: "basic", value: false },
    { key: "expired", value: false },
    { key: "0-1 month", value: false },
    { key: "1-3 months", value: false },
    { key: "3-6 months", value: false },
    { key: "6-12 months", value: false },
    { key: "active", value: false },
    { key: "inactive", value: false },
  ]);
  const [appliedFilters, setAppliedFilters] = useState<any>([
    { key: "Organization Category", value: null },
    { key: "User Role", value: null },
    { key: "Primary Contact", value: null },
    { key: "Status", value: null },
    { key: "Subscription Status", value: null },
  ]);
  const [isFixed, setIsFixed] = useState<string | boolean>("left");
  const Router = useRouter();
  const screenSize = useScreenSize();

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 800) {
        setIsFixed(false);
      } else {
        setIsFixed("left");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // console.log(TableData)

  const option = {
    Organization_category: [
      { label: "IT Company", value: "IT Company" },
      { label: "Textile Industry", value: "Textile Industry" },
    ],
    User_Role: [
      { label: "Service Manager", value: "Service Manager" },
      { label: "Accountant", value: "Accountant" },
    ],
    Primary_Contact: [
      { label: "Ashish Jaria", value: "Ashish Jaria" },
      { label: "Parth Goswami", value: "Parth Goswami" },
    ],
    Status: [
      { label: "Active", value: "Active" },
      { label: "Inactive", value: "Inactive" },
    ],
    Subscription_Status: [
      { label: "Premium", value: "Premium" },
      { label: "Basic", value: "Basic" },
    ],
  };

  const applyFilters = () => {
    let filteredData = [...TableData].filter((item) =>
      item.organization_name.name
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );

    // console.log(appliedFilters);

    let filterData = [...filteredData].filter((item) => {
      // i want to compare the appliedFilter value with the filteredData value and if it matches then i want to return the filteredData
      // but i am not able to do that
      // i have tried this but it is not working
      appliedFilters.map((filter: any) => {
        // console.log(item);
        // console.log(filter);
      });
    });

    // console.log(filterData);

    return filteredData;
  };
  const [appliedSavedFilters, setAppliedSavedFilters] = useState<any>([]);
  const handleViewChange = (viewMode: "grid" | "table") => {
    setViewMode(viewMode);
  };

  const handleShort = () => {
    setTableNameShort(!tableNameShort);
    console.log(filteredData);
    const sortedData = [...TableData].sort((a, b) => {
      if (tableNameShort) {
        return a.organization_name.name.localeCompare(b.organization_name.name);
      } else {
        return b.organization_name.name.localeCompare(a.organization_name.name);
      }
    });
  };

  useEffect(() => {
    // console.log(appliedFilters);
  }, [appliedFilters]);
  const columns = [
    {
      title: (
        <div className="flex items-center justify-start gap-3">
          <div className="flex gap-[2px] items-center">
            Organization Name
            {/* <Image
              className="ml-[2px]"
              width={16}
              height={16}
              src={ArrowDown}
              alt="arrow down"
              onClick={handleShort}
            /> */}
          </div>
        </div>
      ),
      dataIndex: "organization_name",
      key: "organization_name",
      columnName: "Organization Name",
      width: 300,
      fixed: isFixed ? ("left" as const) : undefined,
      sorter: (a: any, b: any) => {
        return a.organization_name.name.localeCompare(b.organization_name.name);
      },
      render: (text: any, record: any) => (
        <Link href={`/${text.name}/dashboard?org-id=${record.org_id}`} onClick={()=>{localStorage.setItem("selected_org", JSON.stringify({id:record.org_id, name: text.name}))}}>
        <div className="flex items-center gap-3">
          <div className="min-w-[40px]">
            <img className="" src={text.image} alt="Organization" />
          </div>
          <div>
            <p className="text-b2 font-medium text-neutral-600">{text.name}</p>
            <small className="text-neutral-500 text-caption">
              {text.subtext}
            </small>
          </div>
        </div>
        </Link>
      ),
    },
    {
      title: (
        <div className="flex items-center justify-start gap-3">User Role</div>
      ),
      dataIndex: "user_role",
      key: "user_role",
      columnName: "User Role",
      width: 200,
      sorter: (a: any, b: any) => {
        return a.user_role.localeCompare(b.user_role);
      },
      render: (text: any, record: any) => (
        <div>
          <p className="text-neutral-500 text-b2">{text}</p>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center justify-start gap-3">
          Primary Contact
        </div>
      ),
      dataIndex: "primary_contact",
      key: "primary_contact",
      columnName: "Primary Contact",
      width: 200,
      sorter: (a: any, b: any) => {
        return a.primary_contact.localeCompare(b.primary_contact);
      },
      render: (text: any, record: any) => (
        <div>
          <p className="text-neutral-500 text-b2">{text}</p>
        </div>
      ),
    },
    {
      title: <div className="flex items-center justify-center">Status</div>,
      key: "status",
      columnName: "Status",
      width: 150,
      dataIndex: "status",
      align: "center" as const,
      render: (text: any, record: any) => (
        <div className="flex justify-center">
          <Badge color={text === "Active" ? "green" : "red"} leftDot>
            {text}
          </Badge>
        </div>
      ),
    },
    {
      title: (
        <div className="flex items-center justify-center">
          Subscription Status
        </div>
      ),
      key: "subscription_status",
      columnName: "Subscription Status",
      width: 300,
      dataIndex: "subscription_status",
      align: "center" as const,

      render: (text: any, record: any) => (
        <div className="flex flex-col items-center">
          <p className="text-b2 font-medium text-neutral-600 mb-1">
            {text.plan}
          </p>
          <div className="flex text-caption text-neutral-500">
            <p className="font-medium">{text.expires_on}</p>
            <p className="mx-1">-</p>
            <p
              className={`text-center ${
                text.days_left >= 10 ? "text-neutral-500" : "text-red-700"
              }`}
            >
              {text.days_left >= 0
                ? text.days_left === 0
                  ? "Expiring Today"
                  : `${text.days_left} day${
                      text.days_left !== 1 ? "s" : ""
                    } left`
                : `Expired ${Math.abs(text.days_left)} day${
                    Math.abs(text.days_left) !== 1 ? "s" : ""
                  } ago`}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Actions",
      key: "action",
      notManageable: true,
      columnName: "Actions",
      width: 150,
      align: "center" as const,
      render: (text: any, record: any) => (
        <div className="flex items-center justify-center">
          <Button className="max-w-max" color="secondary" ghost size="sm">
            {text.action}
          </Button>
        </div>
      ),
    },
    {
      title: "",
      key: "more",
      notManageable: true,
      columnName: "More",
      dataIndex: "more",
      width: 50,
      align: "center" as const,
      fixed: isFixed ? ("right" as const) : undefined,
      render: (text: any, record: any) => (
        <div className="flex items-center justify-center min-w-max">
          <Image
            className="cursor-pointer"
            width={24}
            height={24}
            src={Dots}
            alt="Dots"
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    setColumnsData(columns);
  }, [isFixed]);

  const [columnsData, setColumnsData] = useState(columns);
  const filteredData = applyFilters();
  const gridChildren = (
    <div className="grid grid-cols-1 tablet:grid-cols-2 min-[1439px]:grid-cols-3 min-[1920px]:grid-cols-4  gap-6 flex-wrap">
      {filteredData.map((item) => (
        <div
          className="border p-6 rounded-lg bg-white shadow-xs-3"
          key={item.key}
        >
          <Badge color={item.status === "Active" ? "green" : "red"} leftDot>
            {item.status}
          </Badge>
          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-3 items-center">
              <div className="h-10 w-10 min-w-10 min-h-10 rounded-full">
                <Image src={Logo} alt="logo" width={150} height={150} />
              </div>
              <div>
                <p className="text-b2 text-neutral-600 font-medium">
                  {item.organization_name.name}
                </p>
                <p className="text-caption text-neutral-500">
                  {item.organization_name.subtext}
                </p>
              </div>
            </div>
            <div className="cursor-pointer">
              <Image src={More} alt="more" />
            </div>
          </div>
          <div className="my-4 flex justify-between">
            <div>
              <p className="text-caption text-neutral-500">User Role</p>
              <p className="text-b2 font-medium text-neutral-600">
                {item.user_role}
              </p>
            </div>
            <div>
              <p className="text-caption text-neutral-500">Primary Contact</p>
              <p className="text-b2 font-medium text-neutral-600">
                {item.primary_contact}
              </p>
            </div>
          </div>
          <hr className="border-neutral-300" />
          <div>
            <p className="text-caption text-neutral-500 mb-3 mt-4">
              Subscription Status
            </p>
            <div className="flex items-center justify-between">
              {/* <Badge color="primaryGradient">{item.subscription.plan}</Badge> */}
              <p className="text-b2 font-medium text-neutral-600">
                {item.subscription_status.plan}
              </p>
              <p className="text-b2 text-center font-medium text-neutral-600">
                {item.subscription_status.expires_on}
              </p>
              <p
                className={`text-caption text-center ${
                  item.subscription_status.days_left >= 10
                    ? "text-neutral-500"
                    : "text-red-700"
                }`}
              >
                {item.subscription_status.days_left >= 0
                  ? item.subscription_status.days_left === 0
                    ? "Expiring Today"
                    : `${item.subscription_status.days_left} day${
                        item.subscription_status.days_left !== 1 ? "s" : ""
                      } left`
                  : `Expired ${Math.abs(
                      item.subscription_status.days_left
                    )} day${
                      Math.abs(item.subscription_status.days_left) !== 1
                        ? "s"
                        : ""
                    } ago`}
              </p>
            </div>
          </div>
          <hr className="border-neutral-300 my-4" />
          <Button ghost size="md" color="secondary">
            Upgrade now
          </Button>
        </div>
      ))}
      </div>
  );

  const handleChange: TableProps<DataType>["onChange"] = (
    _pagination,
    sorter
  ) => {
    setSortedInfo(sorter as SorterResult<DataType>);
  };

  const clearFilters = () => {
    setAppliedFilters(initialFilters);
    setAppliedSavedFilters([]);
  };

  useEffect(() => {
    applyFilters();
  }, [searchText]);

  // const setOrganizationSort = () => {
  //   const sortedData = [...TableData].sort((a, b) => {
  //     if (tableNameShort) {
  //       return a.organization_name.name.localeCompare(b.organization_name.name);
  //     } else {
  //       return b.organization_name.name.localeCompare(a.organization_name.name);
  //     }
  //   });
  //   setTableData(sortedData);
  // };

  return (
    <>
      <div>
        <ContentHeader
          title="Organization"
          viewMode={viewMode}
          onViewChange={handleViewChange}
          notificationCount={filteredData.length}
          actionButtonText="Organization"
          handleActionClick={() => Router.push("/organization/add-organization")}
          className="pb-4 mobile:pb-6"
          breadcrumbItems={[
            { title: "Home", href: "/dashboard" },
              { title: "Organizations", href: "/organization" },
          ]}
        />

        <div
          className={`${
            viewMode === "table" && "bg-white p-3 rounded-lg shadow-xs-1"
          } animation-all duration-500`}
        >
          <TableSearchFilter
            viewMode={viewMode}
            appliedFiltersData={appliedSavedFilters}
            onSearchChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchText(e.target.value)
            }
            columnsData={columnsData}
            handleClear={() => {
              clearFilters();
              clearFilters();
            }}
            handleApplyFilter={() => {
              setAppliedSavedFilters(appliedFilters);
            }}
            setColumnsData={setColumnsData}
            onSelectChange={(value: any) => {
              setSelectedColumns(value);
            }}
            filterContent={
              <>
                <CustomSelect
                  options={option.Organization_category}
                  labelTop="Organization Category"
                  value={appliedFilters[0].value}
                  onChange={(selectedValue) => {
                    setAppliedFilters((prevFilters: any) => {
                      const updatedFilters = prevFilters.map((filter: any) =>
                        filter.key === "Organization Category"
                          ? {
                              ...filter,
                              value: filter.value.concat(
                                Array.isArray(selectedValue)
                                  ? selectedValue.map((item) => item.value)
                                  : selectedValue.value
                              ),
                            }
                          : filter
                      );
                      return updatedFilters;
                    });
                  }}
                />
                <CustomSelect
                  options={option.User_Role}
                  labelTop="User Role"
                  value={appliedFilters[1].value}
                  onChange={(selectedValue) => {
                    setAppliedFilters((prevFilters: any) => {
                      const updatedFilters = prevFilters.map((filter: any) =>
                        filter.key === "User Role"
                          ? {
                              ...filter,
                              value:
                                selectedValue instanceof Array
                                  ? selectedValue.map((item) => item.value)
                                  : selectedValue.value,
                            }
                          : filter
                      );
                      return updatedFilters;
                    });
                  }}
                />
                <CustomSelect
                  options={option.Primary_Contact}
                  labelTop="Primary Contact"
                  value={appliedFilters[2].value}
                  onChange={(selectedValues) => {
                    setAppliedFilters((prevFilters: any) => {
                      const updatedFilters = prevFilters.map((filter: any) =>
                        filter.key === "Primary Contact"
                          ? {
                              ...filter,
                              value:
                                selectedValues instanceof Array
                                  ? selectedValues.map((item) => item.value)
                                  : selectedValues.value,
                            }
                          : filter
                      );
                      return updatedFilters;
                    });
                  }}
                />

                <div>
                  <p className="text-neutral-700 mb-1 text-b2 font-medium">Status</p>
                  <div className="flex gap-2">
                    <Radio
                      size="md"
                      value={appliedFilters[3].value}
                      onChange={(value) => {
                        setAppliedFilters((prevFilters: any) => {
                          const updatedFilters = prevFilters.map(
                            (filter: any) =>
                              filter.key === "Status"
                                ? {
                                    ...filter,
                                    value: value,
                                  }
                                : filter
                          );
                          return updatedFilters;
                        });
                      }}
                      options={[
                        {
                          supportingText: "Active",
                          id: "active",
                          name: "status",
                          value: "Active",
                        },
                        {
                          supportingText: "Inactive",
                          id: "inactive",
                          name: "status",
                          value: "Inactive",
                        },
                      ]}
                    />
                  </div>
                </div>
                <CustomSelect
                  options={option.Subscription_Status}
                  labelTop="Subscription Status"
                  value={appliedFilters[4].value}
                  onChange={(selectedValue) => {
                    setAppliedFilters((prevFilters: any) => {
                      const updatedFilters = prevFilters.map((filter: any) =>
                        filter.key === "Subscription Status"
                          ? {
                              ...filter,
                              value:
                                selectedValue instanceof Array
                                  ? selectedValue.map((item) => item.value)
                                  : selectedValue.value,
                            }
                          : filter
                      );
                      return updatedFilters;
                    });
                  }}
                />
              </>
            }
            filterModalContent={
              <div className="">
                <div className="flex flex-col gap-4">
                  {filterData.map((item: any) => {
                    return Object.keys(item).map((key, index) => {
                      return (
                        <div
                          className="border-b border-neutral-200 pb-4"
                          key={key + "1"}
                        >
                          <p
                            className={`text-b2 font-semibold text-neutral-600`}
                          >
                            {key
                              .split("_")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(" ")}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-3" key={key}>
                            {key === "Status" ? (
                              <Radio
                                size="md"
                                options={[
                                  {
                                    supportingText: "Active",
                                    id: "active",
                                    name: "status",
                                    value: "active",
                                  },
                                  {
                                    supportingText: "Inactive",
                                    id: "inActive",
                                    name: "status",
                                    value: "inActive",
                                  },
                                ]}
                              />
                            ) : (
                              item[key].map((filter: any) => {
                                return (
                                  <div
                                    className="flex gap-2 items-center"
                                    key={filter.label}
                                  >
                                    <FilterCheckbox
                                      label={filter.label}
                                      value={filter.value}
                                      isChecked={
                                        filterList.find(
                                          (item: any) =>
                                            item.key === filter.value
                                        )?.value
                                      }
                                      onChange={(value) => {
                                        const Key = key
                                          .split("_")
                                          .map(
                                            (word: any) =>
                                              word.charAt(0).toUpperCase() +
                                              word.slice(1)
                                          )
                                          .join(" ");

                                        setFilterList((prevFilters: any) => {
                                          return prevFilters.map(
                                            (filter: any) => {
                                              if (filter.key === value.value) {
                                                return {
                                                  ...filter,
                                                  value: value.checked,
                                                };
                                              }
                                              return filter;
                                            }
                                          );
                                        });
                                        setAppliedFilters(
                                          (prevFilters: any) => {
                                            return prevFilters.map(
                                              (appliedfilter: any) => {
                                                if (appliedfilter.key === Key) {
                                                  if (value.checked) {
                                                    const updatedValue =
                                                      Array.isArray(
                                                        appliedfilter.value
                                                      )
                                                        ? [
                                                            ...appliedfilter.value,
                                                            value.value,
                                                          ]
                                                        : [value.value];

                                                    return {
                                                      ...appliedfilter,
                                                      value: updatedValue,
                                                    };
                                                  } else if (!value.checked) {
                                                    const updatedValue =
                                                      Array.isArray(
                                                        appliedfilter.value
                                                      )
                                                        ? appliedfilter.value.filter(
                                                            (item: any) =>
                                                              item !==
                                                              value.value
                                                          )
                                                        : null;
                                                    return {
                                                      ...appliedfilter,
                                                      value: updatedValue,
                                                    };
                                                  }
                                                }
                                                return appliedfilter;
                                              }
                                            );
                                          }
                                        );
                                      }}
                                    />
                                  </div>
                                );
                              })
                            )}
                          </div>
                        </div>
                      );
                    });
                  })}
                  <p className="text-b2 font-semibold text-neutral-600 mt-4">
                    Primary Contact
                  </p>
                  <TagInput />
                </div>
              </div>
            }
          />
          <Table
          tableHeight={viewMode === "table" ? screenSize === "mobile" ? "calc(100vh - 380px)" : screenSize === "tablet" ? "calc(100vh - 370px)" : screenSize === "largeTablet" ? "calc(100vh - 345px)" :  "calc(100vh - 290px)" : undefined}
            viewMode={viewMode}
            columns={
              selectedColumns.length !== 0
                ? columnsData.filter((col) =>
                    selectedColumns.includes(col.dataIndex as string)
                  )
                : columnsData
            }
            dataSource={filteredData}
            onChange={handleChange}
            gridChildren={gridChildren}
          />
        </div>
      </div>
    </>
  );
};

export default Organization;
