"use client";

import React, { useState } from "react";
import ProgressBar from "../../../components/progress-bar/ProgressBar";
import Table from "../../../components/table/Table";
import ContentHeader from "../../../components/content-header/ContentHeader";
import TableSearchFilter from "../../../components/table-search-filter/TableSearchFilter";
import Breadcrumb from "@/app/components/breadcrumb/Breadcrumb";
import CustomSelect from "@/app/components/select/CustomSelect";
import Button from "@/app/components/buttons/Button";
import Radio from "@/app/components/radio/Radio";

import Icon2 from "@/public/table-search-filter/columns.svg";

const Test = () => {
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");
  const handleViewChange = (viewMode: "grid" | "table") => {
    setViewMode(viewMode);
  };

  const option = [
    {
      label: "All",
      value: "All",
    },
    {
      label: "Active",
      value: "Active",
    },
    {
      label: "Inactive",
      value: "Inactive",
    },
  ];

  return (
    <div className="">
      <ContentHeader
        title="Test"
        viewMode={viewMode}
        onViewChange={handleViewChange}
        notificationCount={3}
        actionButtonText="Organization"
      />
      <div
        className={`${
          viewMode === "table" && "bg-white p-3 rounded-lg shadow-xs-1"
        }`}>
        <TableSearchFilter
          viewMode={viewMode}
          filterContent={
            <>
              <CustomSelect options={option} labelTop="Organization Category" />
              <CustomSelect options={option} labelTop="User Role" />
              <CustomSelect options={option} labelTop="Primary Contact" />
              <div>
                <p className="text-neutral-700 mb-1 font-medium">Status</p>
                <div className="flex gap-2">
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
                        id: "inactive",
                        name: "status",
                        value: "inactive",
                      },
                    ]}
                  />
                </div>
              </div>
              <CustomSelect options={option} labelTop="Subscription Status" />
            </>
          }
        />
        <Table viewMode={viewMode} />
      </div>
    </div>
  );
};

export default Test;
