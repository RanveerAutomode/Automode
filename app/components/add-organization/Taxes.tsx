import React, { useState } from "react";
import Image from "next/image";

import ContentHeader from "../content-header/ContentHeader";
import Table from "../table/Table";
import { useSidebar } from "@/app/contexts/sidebarContexts";
import TableSearchFilter from "../table-search-filter/TableSearchFilter";
import Modal from "../modal/Modal";
import Input from "../input/Input";
import CustomSelect from "../select/CustomSelect";

import Edit from "@/public/outline-icons/edit_user.svg";
import Delete from "@/public/outline-icons/trash_user.svg";
import PercentageCircle from "@/public/outline-icons/percentage-circle.svg";
import Button from "../buttons/Button";
import FilterCheckbox from "../filter-checkbox/FilterCheckbox";
import Radio from "../radio/Radio";

const columns = [
  {
    title: "Tax name",
    dataIndex: "tax_name",
    key: "tax_name",
    columnName: "Tax Name",
    width: 280,
    render: (text: any, record: any) => (
      <div>
        <p className="text-neutral-600 text-b2">{record.tax_name}</p>
      </div>
    ),
  },
  {
    title: "Tax rate",
    dataIndex: "tax_rate",
    key: "tax_rate",
    columnName: "Tax Rate",
    width: 97,
    render: (text: any, record: any) => (
      <div>
        <p className="text-neutral-600 text-b2">{record.tax_rate}</p>
      </div>
    ),
  },
  {
    title: "Tax type",
    dataIndex: "tax_type",
    key: "tax_type",
    columnName: "Tax Type",
    width: 136,
    render: (text: any, record: any) => (
      <div>
        <p className="text-neutral-600 text-b2">{record.tax_type}</p>
      </div>
    ),
  },
  {
    title: "Applied on",
    dataIndex: "applied_on",
    key: "applied_on",
    columnName: "Applied on",
    width: 113,
    render: (text: any, record: any) => (
      <div>
        <p className="text-neutral-600 text-b2">
          {record.applied_on}{" "}
          <span className="text-neutral-400">
            {record.weight ? `(${record.weight})` : ""}
          </span>
        </p>
      </div>
    ),
  },
  // {
  //   title: "",
  //   key: "edit",
  //   columnName: "edit",
  //   dataIndex: "edit",
  //   width: 80,
  //   render: (text: any, record: any) => {
  //     if (record.isFixed) {
  //       // For fixed rows, don't render anything
  //       return null;
  //     } else {
  //       // For dynamic rows, render the action buttons
  //       return (
  //         <div className="flex items-center justify-center gap-4">
  //           <Image src={Edit} alt="edit" className="cursor-pointer" />
  //           <Image src={Delete} alt="delete" className="cursor-pointer" />
  //         </div>
  //       );
  //     }
  //   },
  // },
];

const fixedData = [
  {
    key: "1",
    tax_name: "GST0%",
    tax_rate: "0%",
    tax_type: "CGST - SGST",
    applied_on: "value",
  },
  {
    key: "2",
    tax_name: "GST5%",
    tax_rate: "5%",
    tax_type: "CGST - SGST",
    applied_on: "value",
  },
  {
    key: "3",
    tax_name: "GST10%",
    tax_rate: "10%",
    tax_type: "CGST - SGST",
    applied_on: "value",
  },
  {
    key: "4",
    tax_name: "GST15%",
    tax_rate: "15%",
    tax_type: "CGST - SGST",
    applied_on: "value",
  },
  {
    key: "5",
    tax_name: "GST20%",
    tax_rate: "20%",
    tax_type: "CGST - SGST",
    applied_on: "value",
  },
  {
    key: "6",
    tax_name: "GST25%",
    tax_rate: "25%",
    tax_type: "CGST - SGST",
    applied_on: "value",
  },
  {
    key: "7",
    tax_name: "GST30%",
    tax_rate: "30%",
    tax_type: "CGST - SGST",
    applied_on: "value",
  },
  {
    key: "8",
    tax_name: "GST35%",
    tax_rate: "35%",
    tax_type: "CGST - SGST",
    applied_on: "value",
  },
  {
    key: "9",
    tax_name: "Cess_val_12%",
    tax_rate: "12%",
    tax_type: "CESS",
    applied_on: "value",
    weight: "",
  },
  {
    key: "10",
    tax_name: "Cesskg_2%",
    tax_rate: "2%",
    tax_type: "CESS",
    applied_on: "Qty",
    weight: "KG",
  },
  {
    key: "11",
    tax_name: "Cessltr8%",
    tax_rate: "2%",
    tax_type: "CESS",
    applied_on: "Qty",
    weight: "Litre",
  },
];

const Taxes = () => {
  const { collapsed, setCollapsed } = useSidebar();
  const { isSidebarHovered, setIsSidebarHovered } = useSidebar();
  const [userModal, setUserModal] = useState(false);

  return (
    <div className="pl-2 pr-2 mobile:pl-8 mobile:pr-5 tablet:pr-5 tablet:pl-12 largeTablet:pl-[34px] largeTablet:pr-[16px] ml-0 tablet:ml-0 max-w-[848px]">
      <ContentHeader
        title="Taxes"
        notificationCount={5}
        actionButtonText="Taxes"
        handleActionClick={() => setUserModal(true)}
        className="!mt-[8px] !ml-[-16px] mobile:!ml-[-24px] tablet:!mt-[-8px] largeTablet:!ml-[-18px] !py-[16px] mobile:!pt-6 mobile:!pb-[20px]"
        // breadcrumbItems={[
        //   { title: "Home", href: "/dashboard" },
        //   { title: "Organizations", href: "/organization" },
        //   { title: "New Organization", href: "/" },
        // ]}
        viewMode="card"
      />
      <div
        className={`
            bg-white w-[800px] p-3 pt-4 rounded-lg shadow-xs-1
          animation-all duration-500 mobile:ml-[-10px] tablet:ml-[-8px] largeTablet:ml-[0px] ${
            !collapsed || isSidebarHovered
              ? "largeTablet:max-w-[calc(100vw-534px)] tablet:max-w-[calc(100vw-288px)] max-w-[calc(100vw-32px)] mobile:max-w-[calc(100vw-62px)]"
              : "tablet:max-w-[calc(100vw-284px)] largeTablet:max-w-[calc(100vw-366px)]"
          }`}
      >
        <TableSearchFilter
          columnsDisabled
          filterContent={
            <div className="flex flex-col gap-4">
              <CustomSelect
                selectMode="multiple"
                labelTop="Tax rate"
                options={[{ label: "18%", value: "18%" }]}
              />
              <CustomSelect
                selectMode="multiple"
                labelTop="Tax type"
                options={[{ label: "CESS", value: "CESS" }]}
              />
              <div>
                <h1 className="text-caption font-medium text-neutral-700 mb-1">
                  Applied on
                </h1>
                <div className="flex gap-2">
                  <Radio
                    options={[
                      {
                        supportingText: "Value",
                        id: "active",
                        name: "value",
                        value: "Value",
                      },
                      {
                        supportingText: "Qty",
                        id: "inactive",
                        name: "qty",
                        value: "Qty",
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          }
          filterModalContent={
            <div className="flex flex-col gap-4 mb-4">
              <div className="flex flex-col gap-3">
                <h1 className="text-b2 font-semibold text-neutral-600">
                  Tax rate
                </h1>
                <div className="flex gap-2">
                  <FilterCheckbox label="0%" />
                  <FilterCheckbox label="5%" />
                  <FilterCheckbox label="12%" />
                  <FilterCheckbox label="18%" />
                  <FilterCheckbox label="28%" />
                </div>
              </div>
              <hr className="text-neutral-200" />
              <div className="flex flex-col gap-3">
                <h1 className="text-b2 font-semibold text-neutral-600">
                  Tax type
                </h1>
                <div className="flex gap-2">
                  <FilterCheckbox label="CGST - SGST" />
                  <FilterCheckbox label="IGST" />
                  <FilterCheckbox label="CESS" />
                </div>
              </div>
              <hr className="text-neutral-200" />
              <div className="flex flex-col gap-3">
                <h1 className="text-b2 font-semibold text-neutral-600">
                  Applied on
                </h1>
                <div className="flex gap-2">
                  <FilterCheckbox label="Value" />
                  <FilterCheckbox label="Qty" />
                </div>
              </div>
            </div>
          }
          viewMode="table"
        />
        <Table rowSelection={false} columns={columns} dataSource={fixedData} />
        <Modal
          isOpen={userModal}
          top={0}
          heading="Add New Tax"
          supportingText="Fill details to add new tax"
          closeModal={() => setUserModal(false)}
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-5">
              <Input type="text" placeholderValue="CESS" labelTop="Tax Name" />
              <div className="flex gap-5">
                <CustomSelect
                  placeholder="Tax Rate"
                  options={[{ label: "2800", value: "2800" }]}
                  separatorRight
                  iconRight={PercentageCircle}
                  labelTop="Tax Name"
                />
                <CustomSelect
                  disabled
                  placeholder="Tax Type"
                  options={[{ label: "CESS", value: "CESS" }]}
                  value={[{ label: "CESS", value: "CESS" }]}
                  labelTop="Tax Type"
                />
              </div>
              <CustomSelect
                options={[{ label: "value", value: "value" }]}
                labelTop="Applied on"
              />
            </div>
            <div className="mx-[-24px]">
              <div className="flex gap-2 items-center w-max float-right px-6">
                <Button
                  ghost
                  size="md"
                  color="secondary"
                  onClick={() => setUserModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  size="md"
                  onClick={() => {
                    setUserModal(false);
                  }}
                >
                  Add Tax
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Taxes;
