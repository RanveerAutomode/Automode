"use client";

import { NextPage } from "next";
import React from "react";
import Image from "next/image";

import ContentHeader from "@/app/components/content-header/ContentHeader";
import TableComponent from "@/app/components/table/Table";
import { SalesOrderData } from "./data";
import Badge from "@/app/components/badges/Badge";

import Dots from "@/public/outline-icons/vertical-dots.svg";
import TableSearchFilter from "@/app/components/table-search-filter/TableSearchFilter";

const columns = [
  {
    title: "# Sales Order",
    dataIndex: "sales_order",
    key: "sales_order",
    render: (text: string) => {
      return (
        <>
          <h1 className="font-semibold text-neutral-600 text-b2"># {text}</h1>
        </>
      );
    },
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (text: string) => {
      return (
        <>
          <h1 className="text-b2 text-neutral-600">{text}</h1>
        </>
      );
    },
  },
  {
    title: "Customer",
    dataIndex: "customer",
    key: "customer",
    render: (text: any) => {
      return (
        <div className="flex items-center gap-2">
          <img
            className="min-h-[32px] min-w-[32px] w-[32px] h-[32px]"
            src={text.image}
            alt="Customer"
          />
          <h1 className="text-b2 font-medium text-neutral-600">{text.name}</h1>
        </div>
      );
    },
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    align: "right" as const,
    render: (text: string) => {
      return (
        <>
          <h1 className="text-b2 text-neutral-600">{text}</h1>
        </>
      );
    },
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    align: "center" as const,
    render: (text: string) => {
      return (
        <div className="flex justify-center">
          <Badge
            color={
              text === "Closed"
                ? "secondary"
                : text === "Cancelled"
                ? "red"
                : text === "Confirmed"
                ? "primary"
                : "green"
            }
            leftDot
          >
            {text}
          </Badge>
        </div>
      );
    },
  },
  {
    title: "",
    key: "more",
    notManageable: true,
    columnName: "More",
    dataIndex: "more",
    width: 50,
    align: "center" as const,
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

const SalesOrder: NextPage = () => {
  return (
    <>
      <div>
        <ContentHeader
          title="Sales Orders"
          viewMode="card"
          breadcrumbItems={[
            { title: "Home", href: "/dashboard" },
            { title: "Sales", href: "/sales-order" },
            { title: "Sales Orders", href: "/" },
          ]}
        />
        <div className="bg-white p-3 rounded-lg shadow-xs-1">
          <TableSearchFilter viewMode="table" />
          <TableComponent columns={columns} dataSource={SalesOrderData} />
        </div>
      </div>
    </>
  );
};

export default SalesOrder;
