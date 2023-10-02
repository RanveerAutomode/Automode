"use client";

import React, { use, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import ContentHeader from "../content-header/ContentHeader";
import TableSearchFilter from "../table-search-filter/TableSearchFilter";
import Table from "@/app/components/table/Table";
import TagInput from "../tag-input/TagInput";
import CustomSelect from "../select/CustomSelect";
import Button from "../buttons/Button";
import Image from "next/image";
import Badge from "../badges/Badge";
import { useSidebar } from "@/app/contexts/sidebarContexts";
import data from "./userData";
import Avatar from "../avatar/Avatar";
import Modal from "../modal/Modal";
import Input from "../input/Input";
import Upload from "../upload/Upload";
import Tabs from "../tabs/Tabs";
import FilterCheckbox from "../filter-checkbox/FilterCheckbox";
import Radio from "../radio/Radio";

import Profile from "../../../public/images/profile-image.webp";
import Edit from "@/public/outline-icons/edit_user.svg";
import Delete from "@/public/outline-icons/trash_user.svg";
import More from "@/public/outline-icons/more.svg";
import Call from "@/public/outline-icons/call-calling.svg";
import Email from "@/public/admin/profile/sms.svg";
import ProfileIcon from "@/public/admin/profile/profile.svg";
import Building from "@/public/outline-icons/building.svg";
import useScreenSize from "@/app/hooks/screenSize";
import ScrollShadowContainer from "../scroll-shadow-container/ScrollShadowContainer";
import { set, update } from "lodash";
import WarningModal from "../warning-modal/WarningModal";

const filterData = [
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
    Location_category: [
      { label: "Store", key: "1", value: "store" },
      { label: "Warehouse", key: "2", value: "warehouse" },
      { label: "Default", key: "3", value: "default" },
    ],
  },
  {
    Location_area: [
      { label: "Within state", key: "1", value: "within state" },
      { label: "Outside state", key: "2", value: "outside state" },
    ],
  },
  {
    Date_added: [
      { label: "Today", key: "1", value: "today" },
      { label: "Yesterday", key: "2", value: "yesterday" },
      { label: "This month", key: "3", value: "this month" },
      { label: "Last month", key: "4", value: "last month" },
      { label: "This quarter", key: "5", value: "this quarter" },
      { label: "Last quarter", key: "6", value: "last quarter" },
      { label: "This year", key: "7", value: "this year" },
      { label: "Last year", key: "8", value: "last year" },
      { label: "More then 2 years", key: "9", value: "more then 2 years" },
      { label: "Custom", key: "10", value: "custom" },
    ],
  },
  {
    User_status: [
      { label: "Active", key: "1", value: "active" },
      { label: "Inactive", key: "2", value: "inactive" },
    ],
  },
];

const option = {
  User_Role: [
    { label: "Service Manager", value: "Service Manager" },
    { label: "Accountant", value: "Accountant" },
  ],
  Location_Category: [
    { label: "Ashish Jaria", value: "Ashish Jaria" },
    { label: "Parth Goswami", value: "Parth Goswami" },
  ],
  Location_Area: [
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" },
  ],
  Date_Added: [
    { label: "Premium", value: "Premium" },
    { label: "Basic", value: "Basic" },
  ],
};

type RoleItem = {
  label: string;
  value: string;
  isChecked: boolean;
  name?: string;
};
type RoleObject = {
  [key: string]: RoleItem[];
};
const userRoles: RoleObject[] = [
  {
    accounts: [
      { label: "Admin", value: "admin", isChecked: false },
      { label: "Accountant", value: "accountant", isChecked: false },
      { label: "Sales", value: "sales", isChecked: false },
      { label: "Purchase", value: "purchase", isChecked: false },
      { label: "Production", value: "production", isChecked: false },
      { label: "Inventory", value: "inventory", isChecked: false },
      { label: "Auditor", value: "auditor", isChecked: false },
      { label: "External", value: "external", isChecked: false },
      { label: "Custom", value: "customAccount", isChecked: false, name: "accountCustom" },
    ],
  },
  {
    hr: [
      { label: "HR", value: "hr", isChecked: false },
      { label: "Payroll", value: "payroll", isChecked: false },
    ],
  },
  {
    crm: [
      { label: "Admin", value: "admin", isChecked: false },
      { label: "Custom", value: "customCrm", isChecked: false, name: "crmCustom" },
    ],
  },
];

const initialSelectedUserRoles = userRoles.reduce((acc, role) => {
  for (const key in role) {
    const roleData = role[key];
    acc[key] = roleData.reduce((roleAcc:any, item:any) => {
      roleAcc[item.value] = item.isChecked;
      return roleAcc;
    }, {});
  }
  return acc;
}, {});

const Users = () => {
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");
  const { collapsed, setCollapsed } = useSidebar();
  const { isSidebarHovered, setIsSidebarHovered } = useSidebar();
  const [userModal, setUserModal] = useState(false);
  const [updatedImage, setUpdatedImage] = useState<string>("");
  const [profileImage, setProfileImage] = useState<boolean>(false);
  const [locationModal, setLocationModal] = useState(false);
  const [scrollState, setScrollState] = useState<string>("top");
  const [accountsCustom, setAccountsCustom] = useState<boolean>(false);
  const [crmCustom, setCrmCustom] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [tableData, setTableData] = useState<any>(data);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedUserRoles, setSelectedUserRoles] = useState<any>(initialSelectedUserRoles);
  const [userRoleError, setUserRoleError] = useState<boolean>(false);
  const [warningModal, setWarningModal] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<any>(tableData);
  const [deleteKey, setDeleteKey] = useState<any>(null);
  const columns = [
    {
      title: "User Name",
      dataIndex: "user_name",
      key: "user_name",
      columnName: "User Name",
      width: 250,
      fixed: "left",
      render: (text: any, record: any) => {
        return (
          <div className="flex items-center gap-3">
            <div className="min-w-[40px]">
              <Avatar
                size="md"
                text={record.profileImg === false ? "AJ" : ""}
                img={record.profileImg === true ? Profile : ""}
              />
            </div>
            <div>
              <p className="text-b2 font-medium text-neutral-600">
                {record.name}
              </p>
              <small className="text-neutral-500 text-caption">
                {record.userRole}
              </small>
            </div>
          </div>
        );
      },
    },
    {
      title: "Date added",
      dataIndex: "date_added",
      key: "date_added",
      columnName: "Date Added",
      width: 150,
      render: (text: any, record: any) => (
        <div>
          <p className="text-neutral-500 text-b2">{record.dateAdded}</p>
        </div>
      ),
    },
    {
      title: "Business Location",
      dataIndex: "business_location",
      key: "business_location",
      columnName: "Business Location",
      width: 150,
      render: (text: any, record: any) => (
        <div className="">
          <Badge color="primaryGradient" onClick={() => setLocationModal(true)}>
            {record.businessLocation}{" "}
            {record.businessLocation > 1 ? "Locations" : "Location"}
          </Badge>
        </div>
      ),
    },
    {
      title: "Contact details",
      key: "contact_details",
      columnName: "Contact Details",
      width: 200,
      dataIndex: "contact_details",
      render: (text: any, record: any) => (
        <div className="">
          <p className="text-b2 text-neutral-600">+91 {record.mobile}</p>
          <p className="text-caption text-neutral-500">{record.email}</p>
        </div>
      ),
    },
    {
      title: "Status",
      key: "status",
      columnName: "Status",
      width: 100,
      dataIndex: "status",
      render: (text: any, record: any) => (
        <Badge color={record.status === "Active" ? "green" : "red"}>
          {record.status}
        </Badge>
      ),
    },
    {
      title: "Actions",
      key: "action",
      notManageable: true,
      columnName: "Actions",
      width: 100,
      align: "center" as const,
      fixed: "right",
      render: (text: any, record: any) => (
        <div className="flex items-center justify-center gap-4">
          <Image
            src={Edit}
            alt="edit"
            className="cursor-pointer"
            onClick={() => {
              setUserModal(true);
              setEditModal(true);
            }}
          />
          <Image src={Delete} alt="delete" className="cursor-pointer" onClick={() => {setDeleteKey(record.key); setWarningModal(true)}} />
        </div>
      ),
    },
  ];
  const [columnsData, setColumnsData] = useState<any>(columns);
  const tabs = [
    { label: "Accounts", icon: Building },
    { label: "HR", icon: Building },
    { label: "CRM", icon: Building },
  ];
  const [filterList, setFilterList] = useState<any>([
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
    { key: "custom", value: false },
    { key: "store", value: false },
    { key: "warehouse", value: false },
    { key: "default", value: false },
    { key: "within state", value: false },
    { key: "outside state", value: false },
    { key: "today", value: false },
    { key: "yesterday", value: false },
    { key: "this month", value: false },
    { key: "last month", value: false },
    { key: "this quarter", value: false },
    { key: "last quarter", value: false },
    { key: "this year", value: false },
    { key: "last year", value: false },
    { key: "more then 2 years", value: false },
    { key: "custom date", value: false },
  ]);
  const [appliedFilters, setAppliedFilters] = useState<any>([
    { key: "User Role", value: null },
    { key: "Location Category", value: null },
    { key: "Location Area", value: null },
    { key: "Date Added", value: null },
    { key: "User Status", value: null },
  ]);
  const screenSize = useScreenSize();

  const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Enter First Name"),
  lastName: Yup.string().required("Enter Last Name"),
  email: Yup.string().email("Enter a valid email").required("Enter Email"),
  mobile: Yup.string()
    .required("Enter Mobile Number")
    .min(10, "Enter a valid mobile number")
    .max(10, "Enter a valid mobile number"),
  businessLocation: Yup.string().required("Enter Business Location"),
  accountsCustomCheck: Yup.boolean(),
  accountCustom: Yup.string().when('accountsCustomCheck', {
    is: (value: any) => value === true,
    then: (schema: Yup.StringSchema) => schema.required("Select Accounts Custom"),
  }),
  userRole: Yup.array().test(
    'has-true-value',
    'At least one role should be selected',
    (value) => {
      if (userRoleError) {
        value?.push(true)
        return true;
      }
      return value && value.length > 0;
    }
  ),
});

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      businessLocation: "",
      accountCustom: "",
      crmCustom: "",
      userRole: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      setUserModal(false);
      formik.resetForm();
      setSelectedUserRoles(userRoles.reduce((acc, role) => {
        for (const key in role) {
          const roleData = role[key];
          acc[key] = roleData.reduce((roleAcc:any, item:any) => {
            roleAcc[item.value] = item.isChecked;
            return roleAcc;
          }, {});
        }
        return acc;
      }, {}))
    },
  });
  useEffect(() => {
    const handleScroll = (e: any) => {
      const scrollHeight = e.target.scrollHeight;
      const scrollTop = e.target.scrollTop;
      const clientHeight = e.target.clientHeight;
      if (scrollTop === 0) {
        setScrollState("top");
      } else if (scrollTop === scrollHeight - clientHeight) {
        setScrollState("bottom");
      } else {
        setScrollState("middle");
      }
    };
    const form = document.getElementById("user-grid-card-container");
    form?.addEventListener("scroll", handleScroll);

    return () => {
      form?.removeEventListener("scroll", handleScroll);
    };
  }, [viewMode]);

  const locationData = [
    {
      key: "1",
      location_name: "Default",
      location_type: "Head Office",
      gstin: "24GXHFG1314R9Z6",
      street_address:
        "Automode Enclave, Beside Rajhans Montessa, Dumas Rd, near Airport",
      pincode: "395007",
      city: "Surat",
      state_country: "Gujarat, India",
    },
    {
      key: "2",
      location_name: "Automode - Operations",
      location_type: "Store",
      gstin: "24GGGGG2658E9Z6",
      street_address:
        "506, Trinity orion, near vijya laxmi hall, vesu main road, Vesu",
      pincode: "395007",
      city: "Surat",
      state_country: "Gujarat, India",
    },
    {
      key: "3",
      location_name: "Automode - Development",
      location_type: "Warehouse",
      gstin: "24GXHFG1314R9Z6",
      street_address:
        "506, Trinity orion, near vijya laxmi hall, vesu main road, Vesu",
      pincode: "395007",
      city: "Surat",
      state_country: "Gujarat, India",
    },
  ];
  const applyFilters = () => {
    let filteredData = [...tableData].filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return setFilteredData(filteredData);
  };


  useEffect(() => {
    applyFilters();
  }, [searchText]);

  const handleDelete = () => {
    const updatedData = filteredData.filter((record:any) => record.key !== deleteKey);
    setFilteredData(updatedData);
    setDeleteKey(null);
    setWarningModal(false);
  };

  const gridChildren = (
    <div className="relative">
      <div
        className={`${"shadow-custom shadow--top !h-0"} animation-all duration-500 ${
          scrollState !== "top" && "!h-5"
        } top-0`}></div>

      <div
        id="user-grid-card-container"
        className="p-2 pb-4  m-[-8px] mr-[-22px] max-h-[calc(100vh-352px)] mobile:max-h-[calc(100vh-358px)] tablet:max-h-[calc(100vh-292px)] largeTablet:max-h-[calc(100vh-236px)] overflow-auto grid grid-cols-1 min-[500px]:grid-cols-2 min-[1130px]:grid-cols-3 tablet:grid-cols-2 min-[1439px]:grid-cols-4 min-[1920px]:grid-cols-4 min-[1920px]:grid-cols-5  gap-6 flex-wrap">
        {filteredData.map((item:any) => (
          <div
            className="border p-6 rounded-lg bg-white shadow-xs-3"
            key={item.key}>
            <div className="flex flex-col items-center justify-center relative">
              <Image
                src={More}
                alt="more"
                className="float-right absolute top-0 right-0"
              />
              <Avatar
                size="md"
                profile
                text={item.profileImg === false ? "AJ" : ""}
                img={item.profileImg === true ? Profile : ""}
                status={item.status === "Active" ? "online" : "offline"}
              />
              <p className="text-b2 font-medium text-neutral-600 mt-2">
                {item.name}
              </p>
              <p className="text-caption text-neutral-500">{item.userRole}</p>
            </div>
            <hr className="border-neutral-200 my-4" />

            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-caption text-neutral-500 mb-1">Date added</p>
                <p className="text-b2 font-medium text-neutral-600">
                  {item.dateAdded}
                </p>
              </div>
              <div>
                <p className="text-caption text-neutral-500 mb-1">
                  Business Location
                </p>
                <Badge
                  color="primaryGradient"
                  onClick={() => setLocationModal(true)}>
                  {item.businessLocation}{" "}
                  {item.businessLocation > 1 ? "Locations" : "Location"}
                </Badge>
              </div>
            </div>
            <hr className="border-neutral-200 my-4" />

            <div className="flex items-center gap-1 mb-2">
              <Image src={Call} alt="call" />
              <p className="text-b2 text-neutral-600">+91 {item.mobile}</p>
            </div>
            <div className="flex items-center gap-1">
              <Image src={Email} alt="mail" />
              <p className="text-b2 text-neutral-600 max-w-max whitespace-nowrap overflow-hidden text-ellipsis ">
                {item.email}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );


  const hasTrueValue = (obj:any) => {
    for (const key in obj) {
      if(key === 'customAccount') {
        formik.setFieldValue('accountsCustomCheck', true);
        formik.setFieldError('accountCustom', 'Select Custom Role')
        
      }
      if (obj[key] === true) {
        if(key === 'custom') {
          formik.setFieldValue('accountsCustomCheck', true);
          formik.setFieldError('accountCustom', 'Select Custom Role')
        }
        return true;
      }
    }
    return false;
  };

  
  const handleButtonClick = () => {
    const anyKeyHasTrueValue = userRoles.some((role) => {
      return hasTrueValue(selectedUserRoles[Object.keys(role)[0]]);
    });
  
    if (anyKeyHasTrueValue) {
        setUserRoleError(true);
        formik.setFieldValue('userRole', [true]);
        formik.setFieldError('accountCustom', 'Select Custom Role')

    } else {
      setUserRoleError(false);
      formik.setFieldValue('userRole', []);
      formik.validateOnChange = true;
    }
  };

  console.log(selectedUserRoles)

  const handleCustomChange = (e:any) => {
    formik.setFieldError('accountCustom', "");
     formik.setFieldValue('userRole', [true]);
     formik.handleChange(e)
     formik.setErrors({userRole: []})
    }
    console.log(formik.values.userRole, formik.errors.userRole)

  return (
    <div className="pl-2 pr-2 mobile:pl-8 mobile:pr-5 tablet:pr-5 tablet:pl-12 largeTablet:pl-[34px] largeTablet:pr-[16px] ml-0 tablet:ml-0 w-full">
      <ContentHeader
        title="Users"
        notificationCount={filteredData.length}
        actionButtonText="User"
        handleActionClick={() => setUserModal(true)}
        onViewChange={(viewMode) => setViewMode(viewMode)}
        className="!mt-[8px] !ml-[-16px] mobile:!ml-[-24px] tablet:!mt-[-8px] largeTablet:!ml-[-18px] !py-[16px] mobile:!pt-6 mobile:!pb-[20px]"
        viewMode={viewMode}
      />

      <div
        className={`${
          viewMode === "table" && "bg-white p-3 pt-4 rounded-lg shadow-xs-1"
        } animation-all duration-500 mobile:ml-[-10px] tablet:ml-[-8px] largeTablet:ml-[0px] ${
          !collapsed || isSidebarHovered
            ? "largeTablet:max-w-[calc(100vw-534px)] tablet:max-w-[calc(100vw-288px)] max-w-[calc(100vw-32px)] mobile:max-w-[calc(100vw-62px)]"
            : "tablet:max-w-[calc(100vw-284px)] largeTablet:max-w-[calc(100vw-366px)]"
        }`}>
        <TableSearchFilter
          viewMode={viewMode}
          columnsData={columns}
          setColumnsData={setColumnsData}
          onSearchChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchText(e.target.value)
          }
          onSelectChange={(value: any) => {
            setSelectedColumns(value);
          }}
          filterContent={
            <>
              <CustomSelect options={option.User_Role} labelTop="User Role" />
              <CustomSelect
                options={option.Location_Category}
                labelTop="Location Category"
              />
              <CustomSelect
                options={option.Location_Area}
                labelTop="Location Area"
              />
              <CustomSelect options={option.Date_Added} labelTop="Date Added" />
              <div>
                <p className="text-neutral-700 mb-1 text-b2 font-medium">
                  User Status
                </p>
                <div className="flex gap-2">
                  <Radio
                    size="md"
                    value={appliedFilters[3].value}
                    onChange={(value) => {
                      setAppliedFilters((prevFilters: any) => {
                        const updatedFilters = prevFilters.map((filter: any) =>
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
                        key={key + "1"}>
                        <p className={`text-b2 font-semibold text-neutral-600`}>
                          {key
                            .split("_")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ")}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-3" key={key}>
                          {key === "User_status" ? (
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
                                  key={filter.label}>
                                  <FilterCheckbox
                                    label={filter.label}
                                    value={filter.value}
                                    isChecked={
                                      filterList.find(
                                        (item: any) => item.key === filter.value
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
                                      setAppliedFilters((prevFilters: any) => {
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
                                                          item !== value.value
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
                                      });
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
              </div>
            </div>
          }
        />
        <Table
          tableHeight={
            viewMode === "table"
              ? screenSize === "mobile"
                ? "calc(100vh - 420px)"
                : screenSize === "tablet"
                ? "calc(100vh - 424px)"
                : screenSize === "largeTablet"
                ? "calc(100vh - 358px)"
                : "calc(100vh - 302px)"
              : undefined
          }
          viewMode={viewMode}
          columns={
            selectedColumns.length !== 0
              ? columnsData.filter((col: any) =>
                  selectedColumns.includes(col.dataIndex as string)
                )
              : columnsData
          }
          dataSource={filteredData}
          gridChildren={gridChildren}
        />
      </div>
      <WarningModal isOpen={warningModal} title="Delete User" supportingText="Do you want to Delete this user?" setIsOpen={()=>{setWarningModal(true)}} onCancel={()=>setWarningModal(false)} onConfirm={handleDelete} />
      <Modal
        heading={editModal ? "Edit User" : "Add New User"}
        supportingText="Add new user according to role."
        closeModal={() => {setUserModal(false); setSelectedUserRoles(userRoles.reduce((acc, role) => {
          for (const key in role) {
            const roleData = role[key];
            acc[key] = roleData.reduce((roleAcc:any, item:any) => {
              roleAcc[item.value] = item.isChecked;
              return roleAcc;
            }, {});
          }
          return acc;
        }, {}));}}
        isOpen={userModal}
        top={0}>
        <form onSubmit={formik.handleSubmit} className="max-h-[600px]">
          <ScrollShadowContainer
            id="user-modal-container"
            className="mobile:flex max-mobile:max-h-[70vh] tablet:max-h-[calc(100vh-180px)] pt-6 max-mobile:mr-[-14px] max-mobile:overflow-y-auto max-mobile:overflow-x-hidden"
            shadowBottom={screenSize === "mobile" ? "70px" : "80px"}
            shadowTop={screenSize === "mobile" ? "82px" : "74px"}>
            <div className="flex flex-col gap-4 mobile:pr-6 mobile:border-r max-mobile:pb-4 max-mobile:border-b max-mobile:max-w-[330px]">
              <div className="flex gap-4 mobile:items-center">
                <div className="border border-white min-w-[103px] min-h-[103px] rounded-full bg-white w-[86px] mobile:w-[100px] mobile:h-[100px] h-[86px] shadow-md  overflow-hidden">
                  {updatedImage ? (
                    <Image
                      width={100}
                      height={100}
                      src={updatedImage}
                      alt="updateImg"
                    />
                  ) : (
                    <Image
                      width={100}
                      height={100}
                      src={Profile}
                      alt="updateImg"
                    />
                  )}

                  {profileImage && (
                    <Image src={Profile} alt="profile" className="" />
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-2">
                    <Upload onImageSave={setUpdatedImage} />
                    {updatedImage && (
                      <Button
                        textButton
                        color="red"
                        onClick={() => setUpdatedImage("")}>
                        Remove
                      </Button>
                    )}
                  </div>
                  <p className="text-caption text-neutral-400">
                    Allowed JPG, PNG or SVG. Max size of 800k
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 max-w-[330px]">
                <div className="flex gap-4">
                  <Input
                    name="firstName"
                    value={editModal ? "Parth" : formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    hasError={
                      formik.touched.firstName &&
                      typeof formik.errors.firstName === "string"
                        ? formik.errors.firstName
                        : ""
                    }
                    type="text"
                    labelTop="First Name"
                    placeholderValue="Parth"
                    iconLeft={ProfileIcon}
                  />{" "}
                  <Input
                    name="lastName"
                    value={editModal ? "Goswami" : formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    hasError={
                      formik.touched.lastName &&
                      typeof formik.errors.lastName === "string"
                        ? formik.errors.lastName
                        : ""
                    }
                    type="text"
                    labelTop="Last Name"
                    placeholderValue="Goswami"
                  />
                </div>
                <Input
                  name="email"
                  value={
                    editModal
                      ? "parth.goswami@automode.ai"
                      : formik.values.email
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  hasError={
                    formik.touched.email &&
                    typeof formik.errors.email === "string"
                      ? formik.errors.email
                      : ""
                  }
                  type="email"
                  labelTop="Email"
                  placeholderValue="parthgoswami@automode.ai"
                  iconLeft={Email}
                />
                <Input
                  name="mobile"
                  value={editModal ? "8888888888" : formik.values.mobile}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  hasError={
                    formik.touched.mobile &&
                    typeof formik.errors.mobile === "string"
                      ? formik.errors.mobile
                      : ""
                  }
                  type="mobile"
                  labelTop="Mobile No."
                  placeholderValue="8888888888"
                  iconLeft={Call}
                />
                <CustomSelect
                  onChange={(selectedOption: any) =>
                    formik.setFieldValue(
                      "businessLocation",
                      selectedOption.value
                    )
                  }
                  onBlur={() =>
                    formik.setFieldTouched("businessLocation", true)
                  }
                  hasError={
                    formik.touched.businessLocation &&
                    typeof formik.errors.businessLocation === "string"
                      ? formik.errors.businessLocation
                      : false
                  }
                  options={[{ label: "All", value: "All" }]}
                  labelTop="Business Location"
                  iconLeft={Building}
                />
              </div>
            </div>
            <div className="mobile:pl-6 max-mobile:mt-4">
              <p className="font-medium text-neutral-600 mb-3">User Role</p>
              <div className="min-w-[320px] max-w-[320px]">
                <Tabs tabs={tabs} type="default">
                  {userRoles.map((item, index) => {
                    const outerKey = Object.keys(item)[0] as keyof typeof item;
                    let innerData: any[] | undefined;
                    switch (outerKey) {
                      case "accounts":
                        innerData = item.accounts;
                        break;
                      case "hr":
                        innerData = item.hr;
                        break;
                      case "crm":
                        innerData = item.crm;
                        break;
                      default:
                        break;
                    }
                    return (
                      <>
                      <div
                        className="pt-5 pb-1 max-w-[336px] flex flex-wrap gap-2"
                        key={index}>
                        {innerData?.map((innerItem, innerIndex) => (
                          <React.Fragment key={innerIndex}>
                            <div key={innerIndex}>
                              <FilterCheckbox
                                label={innerItem.label}
                                name={innerItem.name}
                                isChecked={selectedUserRoles[outerKey]?.[innerItem.value] || false}
                                value={innerItem.value}
                                onChange={(value) => {
                                setSelectedUserRoles((prevSelectedUserRoles:any) => {
                                  const updatedSelectedUserRoles = { ...prevSelectedUserRoles };
                                  updatedSelectedUserRoles[outerKey][innerItem.value] = value.checked;                            
                                  return updatedSelectedUserRoles;
                                });handleButtonClick();
                                innerItem.name === "accountCustom" ? setAccountsCustom(value.checked) : innerItem.name === "crmCustom" ? setCrmCustom(value.checked) :  null;
                                }}
                              />
                            </div>
                          </React.Fragment>
                        ))}
                        {accountsCustom && outerKey === "accounts" && (
                      <Input
                        type="text"
                        labelTop="Custom Role"
                        className="mt-5"
                        name="accountCustom"
                        value={formik.values.accountCustom}
                        // onChange={formik.handleChange}
                        onChange={handleCustomChange}
                        onBlur={formik.handleBlur}
                        hasError={
                          formik.touched.accountCustom &&
                          typeof formik.errors.accountCustom === "string"
                            ? formik.errors.accountCustom
                            : ""
                        }

                      />
                    )}
                    {crmCustom && outerKey === "crm" && (
                      <Input
                        type="text"
                        labelTop="Custom Role"
                        className="mt-5"
                        name="crmCustom"
                        value={formik.values.crmCustom}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        hasError={
                          formik.touched.crmCustom &&
                          typeof formik.errors.crmCustom === "string"
                            ? formik.errors.crmCustom
                            : ""
                        }

                      />
                    )}
                      </div>
                      
                      </>
                    );
                  })}
                </Tabs>
              </div>
              {formik.touched.userRole && formik.errors.userRole ? (
                <p className="text-caption font-medium text-red-600 mt-5">
                  {formik.errors.userRole}
                </p>
              ) : null}
            </div>
          </ScrollShadowContainer>
          <div className="h-[1px] mx-[-24px]  ">
            <div className="flex gap-2 items-center w-max float-right mt-4 px-6">
              <Button
                ghost
                size="md"
                color="secondary"
                onClick={() => {
                  formik.resetForm();
                  setUserModal(false);
                  setEditModal(false);
                  setSelectedUserRoles(userRoles.reduce((acc, role) => {
                    for (const key in role) {
                      const roleData = role[key];
                      acc[key] = roleData.reduce((roleAcc:any, item:any) => {
                        roleAcc[item.value] = item.isChecked;
                        return roleAcc;
                      }, {});
                    }
                    return acc;
                  }, {}));
                }}>
                Cancel
              </Button>
              <Button size="md" onClick={() => { handleButtonClick();}}>
                {editModal ? "Save changes" : "Add User"}
              </Button>
            </div>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={locationModal}
        top={0}
        closeModal={() => setLocationModal(false)}
        heading="Locations Details"
        supportingText="Manage your locations">
        <div className="mx-[-16px] tablet:mx-[-24px]">
          {locationData.map((item, index) => (
            <div className="flex items-center" key={index}>
              <div
                className={`py-5 ${locationData.length-1 === index && "pb-0"} px-6 ${
                  index === locationData.length - 1
                    ? ""
                    : "border-b border-b-neutral-200"
                } w-full`}
                key={index}>
                <h1 className="text-b2 font-semibold text-neutral-700 mb-2">
                  {item.location_name}
                </h1>
                <div className="flex flex-col mobile:flex-row mobile:justify-between gap-3 mobile:gap-10 items-baseline">
                  <div>
                    <p className="text-b2 text-neutral-500 mb-2">
                      {item.street_address}
                    </p>
                    <p className="text-b2 text-neutral-500 mb-2">
                      {item.city}, {item.state_country} - {item.pincode}
                    </p>
                    <p className="text-b2 font-semibold text-neutral-500 mb-2">
                      GSTIN: {item.gstin}
                    </p>
                    <Badge>{item.location_type}</Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};
export default Users;
