"use client";

import React, { useMemo, useState } from "react";
import "./TableWithAddRow.css";
import { Table, ConfigProvider } from "antd";
import Image from "next/image";
import type { TableRowSelection } from "antd/es/table/interface";

import Badge from "../badges/Badge";
import Button from "../buttons/Button";
import dataGrid from "../table/dataGrid";
// import data from "../../(dashboard)/(routes)/organization/tableData";
import { DataType } from "@/app/(organization-selection)/(routes)/organization/page";
import Input from "../input/Input";
import CustomSelect from "../select/CustomSelect";

import More from "@/public/outline-icons/more.svg";
import Logo from "@/public/logos/ellipse-8.svg";
import NoDataFound from "@/public/images/no-data-found.png";
import NoSearchData from "@/public/images/dashboard/no-data.png";
import PercentageCircle from "@/public/outline-icons/percentage-circle.svg";
import TickCircle from "@/public/solid-icons/tick-circle.svg";
import CloseCircle from "@/public/solid-icons/close-circle.svg";

type Props = {
  viewMode?: "grid" | "table";
  gridChildren?: React.ReactNode;
  columns?: any;
  onChange?: any;
  dataSource?: any;
  getCheckboxProps?: any;
};

const TableComponent: React.FC<Props> = ({
  viewMode = "table",
  gridChildren,
  columns,
  onChange,
  dataSource,
  getCheckboxProps,
}) => {
  const rowSelection: TableRowSelection<DataType> = {
    getCheckboxProps,
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };

  const NoDataView = () => (
    <div className="no-data-view flex flex-col items-center justify-center w-full">
      <Image
        className="mb-3"
        width={157}
        height={66}
        src={NoDataFound}
        alt="No Data"
      />
      <p className="text-neutral-700 font-medium text-b2">No Data Available</p>
    </div>
  );

  const NoSearchView = () => (
    <div className="no-data-view flex flex-col items-center justify-center w-full">
      <Image
        className="mb-3"
        width={125}
        height={64}
        src={NoSearchData}
        alt="No Data"
      />
      <p className="text-neutral-700 font-medium text-b2">No results found</p>
      <p className="text-caption text-neutral-500 mb-3">
        “Automotive Club” did not match any Results. Please try again.
      </p>
      <Button color="secondary" ghost size="sm" className="max-w-max">
        Clear Search
      </Button>
    </div>
  );

  return viewMode === "table" ? (
    <div className="">
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: "#5f27cd",
            borderRadius: 6,
            // colorBgContainer: 'purple',
            // Alias Token
            // colorBgContainer: 'green',
          },
        }}
      >
        <Table
          // scroll={dataSource && dataSource.length > 0 ? { x: "auto" } : undefined}
          scroll={{ x: "max-content", y: "54vh" }}
          locale={{
            emptyText: <NoDataView />,
          }}
          // footer={() => (
          //   <div className="hidden mobile:flex overflow-x-auto">
          //     <div className="mx-4 min-w-[100px]">
          //       <Input
          //         size="small"
          //         className="mr-4"
          //         type="text"
          //         placeholderValue="Tax name"
          //       />
          //     </div>
          //     <div className="mx-4">
          //       <CustomSelect
          //         size="small"
          //         className="mr-4"
          //         placeholder="Tax Rate"
          //         options={[{ label: "2800", value: "2800" }]}
          //         separatorRight
          //         iconRight={PercentageCircle}
          //       />
          //     </div>
          //     <div className="mx-4 min-w-[100px]">
          //       <Input
          //         size="small"
          //         className="mr-4"
          //         type="text"
          //         placeholderValue="Tax name"
          //         value="CESS"
          //         disabled
          //       />
          //     </div>
          //     <div className="mx-4 min-w-[100px]">
          //       <CustomSelect
          //         size="small"
          //         className="mr-4"
          //         options={[{ label: "Qty", value: "Qty" }]}
          //       />
          //     </div>
          //     <div className="flex items-center justify-center gap-4 mx-4">
          //       <Image
          //         className="min-w-max cursor-pointer"
          //         src={TickCircle}
          //         alt="tick-circle"
          //       />
          //       <Image
          //         className="min-w-max cursor-pointer"
          //         src={CloseCircle}
          //         alt="close-circle"
          //       />
          //     </div>
          //   </div>
          // )}
          dataSource={dataSource}
          columns={columns}
          // rowSelection={rowSelection}
          onChange={onChange}
          className="border border-neutral-200 max-w-auto rounded-xl overflow-hidden"
          pagination={false}
        />
      </ConfigProvider>
    </div>
  ) : React.isValidElement(gridChildren) &&
    gridChildren.props.children.length > 0 ? (
    <>{gridChildren}</>
  ) : (
    <>
      <div className="no-data-view flex flex-col items-center justify-center w-full h-[400px]">
        <Image
          className="mb-3"
          width={157}
          height={66}
          src={NoDataFound}
          alt="No Data"
        />
        <p className="text-neutral-700 font-medium text-b2">
          No Data Available
        </p>
      </div>
    </>
  );
};
export default TableComponent;
