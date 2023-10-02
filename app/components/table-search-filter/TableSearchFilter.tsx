"use client";

import React, { use, useCallback, useEffect, useState } from "react";
import Input from "../input/Input";
import Button from "../buttons/Button";
import Tooltip from "@/app/components/tooltip/Tooltip";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ConfigProvider, Popover } from "antd";
import Checkbox from "../checkbox/Checkbox";
import Modal from "../modal/Modal";
import Image from "next/image";

import Search from "@/public/table-search-filter/search.svg";
import Filter from "@/public/table-search-filter/filter.svg";
import Columns from "@/public/table-search-filter/columns.svg";
import Manage from "@/public/table-search-filter/manage.svg";
import { Lock1 } from "iconsax-react";

type TableSearchFilterProps = {
  viewMode: "grid" | "table";
  filterContent?: React.ReactNode;
  filterModalContent?: React.ReactNode;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  columnsData?: any;
  setColumnsData?: any;
  onSelectChange?: any;
  handleClear?: () => void;
  appliedFiltersData?: any;
  handleApplyFilter?: () => void;
  columnsDisabled?: boolean;
};

const TableSearchFilter: React.FC<TableSearchFilterProps> = ({
  viewMode,
  filterContent,
  filterModalContent,
  onSearchChange,
  columnsData,
  setColumnsData,
  onSelectChange,
  handleClear,
  appliedFiltersData,
  handleApplyFilter,
  columnsDisabled,
}) => {
  const [open, setOpen] = useState(false);
  const [manageColumnsOpen, setManageColumnsOpen] = useState(false);
  const [clearHover, setClearHover] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState(false);
  const [defaultColumns, setDefaultColumns] = useState<any>(columnsData);
  const [columnsChanges, setColumnsChanges] = useState<boolean>(false);
  const [selectedCount, setSelectedCount] = useState<number>(0);
  const [scrollState, setScrollState] = useState<string | null>("top");
  const [columns, setColumns] = useState(
    columnsChanges ? defaultColumns : columnsData
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isScroll, setIsScroll] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<Set<any>>(
    new Set(columns && columns.map((col: any) => col.dataIndex))
  );
  const [screen, setScreen] = useState("desktop");
  const [filterModalVisible, setFilterModalVisible] = useState<boolean>(false);
  useEffect(() => {
    const handleScroll = (e: any) => {
      if (e.target.scrollTop > 0) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };
    const form = document.getElementById("content");
    form?.addEventListener("scroll", handleScroll);
    return () => {
      form?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 767) {
        setScreen("mobile");
        setOpen(false);
        setFilterModalVisible(false);
      } else {
        setScreen("desktop");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onSearchColumnsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const filteredColumns = columns?.filter((column: any) =>
    column.columnName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    setColumns(defaultColumns);
    setColumnsData && setColumnsData(defaultColumns);
  };
  const handleManageOpenChange = (newOpen: boolean) => {
    setManageColumnsOpen(newOpen);
  };

  const onDragEnd = (e: any) => {
    if (e.destination.index === 0) {
      return;
    } else {
      let tempData = Array.from(columns);
      let [source_data] = tempData.splice(e.source.index, 1);
      tempData.splice(e.destination.index, 0, source_data);
      setColumns(tempData);
      setColumnsData(tempData);
    }
  };

  useEffect(() => {
    const count = filteredColumns?.filter(
      (item: any) => item.notManageable
    ).length;
    setSelectedCount(selectedColumns.size - count);
  }, [selectedColumns]);

  useEffect(() => {
    const handleScroll = (e: any) => {
      if (!filterModalVisible) return;
      const scrollHeight = e.target.scrollHeight;
      const scrollTop = e.target.scrollTop;
      const clientHeight = e.target.clientHeight;

      console.log(scrollHeight, scrollTop, clientHeight);
      if (scrollHeight === clientHeight) {
        setScrollState(null);
        return;
      }

      if (scrollTop === 0) {
        setScrollState("top");
      } else if (scrollTop === scrollHeight - clientHeight) {
        setScrollState("bottom");
      } else {
        setScrollState("middle");
      }
    };

    const form = document.getElementById("filter-modal-content");
    console.log(form);
    form?.addEventListener("scroll", handleScroll);
    handleScroll({ target: form });

    return () => {
      form?.removeEventListener("scroll", handleScroll);
    };
  }, [filterModalVisible]);

  return (
    <div
      className={`${
        viewMode === "grid" &&
        "bg-neutral-100 top-[88px] px-4 px-4 py-3 bg-white shadow-xs-1 rounded-lg"
      }  ${
        viewMode === "table"
          ? "mb-4"
          : `${
              appliedFiltersData?.filter(
                (item: any) => item.value && item.value.length > 0
              ).length > 0
                ? "mb-4"
                : "mb-6"
            }`
      }`}
    >
      <div className={`flex gap-2 justify-between`}>
        <div className="w-full tablet:max-w-[360px]">
          <Input
            type="any"
            placeholderValue="Search here"
            iconLeft={Search}
            onChange={onSearchChange}
          />
        </div>
        <div className="flex gap-2 ">
          <div className="flex gap-2 ">
            {viewMode === "table" && !columnsDisabled && (
              <>
                <Modal isOpen={manageColumnsOpen} top={0}>
                  <div className="">
                    <div className="bg-neutral-100 mx-[-16px] tablet:mx-[-24px] py-2 px-6 mt-[-16px]">
                      <p className="text-subtitle text-neutral-700 font-medium">
                        Manage Columns
                      </p>
                      <p className="text-b2 text-neutral-500 mt-1">
                        select the column you’d like to see{" "}
                      </p>
                    </div>
                    <div className="py-6">
                      <Input
                        type="text"
                        placeholderValue="Search Column"
                        iconLeft={Search}
                        onChange={onSearchColumnsChange}
                      />
                    </div>
                    {searchQuery === "" && (
                      <p className="text-caption font-medium text-neutral-500 mb-2">
                        {selectedCount} Columns Selected
                      </p>
                    )}
                    <div className="flex flex-col gap-4">
                      <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="columns">
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              className="flex flex-col space-y-4"
                            >
                              {filteredColumns?.map(
                                (item: any, index: number) => {
                                  if (index === columns.length - 1) {
                                    return null;
                                  } else if (item.key === "action") {
                                    return null;
                                  }
                                  return (
                                    <React.Fragment key={item.dataIndex}>
                                      {index === 0 ? (
                                        <div className="flex items-center justify-between gap-2 w-[330px] bg-neutral-100 cursor-not-allowed border border-neutral-200 px-3 py-[9px] rounded-md">
                                        <div className="flex items-center gap-2 rounded-md">
                                          <Lock1
                                            size="16"
                                            color="#64748b"
                                          />
                                            <p className="text-b2 text-neutral-600">
                                              {item.columnName}
                                            </p>
                                          </div>
                                          <Image src={Manage} alt="Manage" />
                                        </div>
                                      ) : (
                                        <Draggable
                                          draggableId={item.key.toString()}
                                          // isDragDisabled={index === 0}
                                          index={index}
                                        >
                                          {(provided) => (
                                            <div
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              className="flex items-center justify-between gap-2 w-[330px] bg-white border border-neutral-200 px-3 py-[9px] rounded-md"
                                            >
                                              <div className="flex items-center gap-2 rounded-md">
                                                <Checkbox
                                                  value={item.dataIndex}
                                                  defaultCheck={selectedColumns.has(
                                                    item.dataIndex
                                                  )}
                                                  onChange={({
                                                    value,
                                                    checked,
                                                  }) => {
                                                    const updatedColumns =
                                                      new Set(selectedColumns);

                                                    if (checked) {
                                                      updatedColumns.add(value);
                                                    } else {
                                                      updatedColumns.delete(
                                                        value
                                                      );
                                                    }

                                                    setSelectedColumns(
                                                      updatedColumns
                                                    );
                                                    onSelectChange(
                                                      Array.from(updatedColumns)
                                                    );
                                                  }}
                                                />
                                                <p className="text-b2 text-neutral-600">
                                                  {item.columnName}
                                                </p>
                                              </div>
                                              <Image
                                                src={Manage}
                                                alt="Manage"
                                              />
                                            </div>
                                          )}
                                        </Draggable>
                                      )}
                                    </React.Fragment>
                                  );
                                }
                              )}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </DragDropContext>

                      <div className="flex gap-2">
                        <Button
                          ghost
                          color="secondary"
                          onClick={() => {
                            setColumns(defaultColumns);
                            setColumnsData && setColumnsData(defaultColumns);
                            setManageColumnsOpen(false);
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={() => {
                            setColumnsChanges(true);
                            setDefaultColumns(columns);
                            setColumnsData && setColumnsData(columns);
                            setManageColumnsOpen(false);
                          }}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                </Modal>
                <div>
                  <Button
                    ghost
                    color="secondary"
                    onClick={() => setManageColumnsOpen(true)}
                    size="md"
                    className={`!max-w-[113px] ${
                      screen === "mobile" && "!p-3"
                    }`}
                    leftIcon={Columns}
                  >
                    {screen === "desktop" && "Columns"}
                  </Button>
                </div>
              </>
            )}
            <div>
              <Modal
                // getPopupContainer={(triggerNode: HTMLElement) =>
                //   triggerNode.parentNode as HTMLElement
                // }
                // arrow={false}
                isOpen={screen === "mobile" ? open : false}
                closeModal={() => setOpen(false)}
                top={0}
                heading="Data Filter"
              >
                <div className="max-h-[520px] min-w-[315px]">
                  {/* <hr className="border-neutral-200 my-4" /> */}
                  <div className="flex flex-col gap-4 mt-4">
                    {filterContent}
                    <Button
                      size="md"
                      onClick={() => {
                        setAppliedFilters(true);
                        setOpen(false);
                        handleApplyFilter && handleApplyFilter();
                      }}
                    >
                      Apply Filter
                    </Button>
                  </div>
                </div>
              </Modal>
              <div>
                <Button
                  ghost
                  color={
                    appliedFiltersData?.filter(
                      (item: any) => item.value && item.value.length > 0
                    ).length > 0 && appliedFilters
                      ? "primary"
                      : "secondary"
                  }
                  size="md"
                  className={`${screen === "mobile" && "!p-3"}`}
                  leftIcon={Filter}
                  count={
                    appliedFiltersData?.filter(
                      (item: any) => item.value && item.value.length > 0
                    ).length
                  }
                  onClick={() => {
                    screen === "desktop"
                      ? setFilterModalVisible(true)
                      : setOpen(true);
                  }}
                >
                  {screen === "desktop" && "Filter"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {appliedFilters &&
        appliedFiltersData?.filter(
          (item: any) => item.value && item.value.length > 0
        ).length > 0 && (
          <div className="flex items-center gap-3 pb-3 mb-[4px]">
            <Tooltip
              content={
                <div>
                  {appliedFiltersData?.map((item: any) => {
                    if (item.value && item.value.length > 0) {
                      return (
                        <div
                          className="text-caption text-neutral-400"
                          key={item.key}
                        >
                          {item.key} :{" "}
                          <span className="font-semibold text-neutral-300">
                            {item.value}
                          </span>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              }
              placement="right"
            >
              <div className="text-b2 font-medium text-neutral-600">
                {
                  appliedFiltersData?.filter(
                    (item: any) => item.value && item.value.length > 0
                  ).length
                }{" "}
                filters applied
              </div>
            </Tooltip>
            <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full"></div>
            <span
              className={`text-b2 text-neutral-600 font-normal ${
                clearHover && "text-gradient-primary-500"
              } cursor-pointer`}
              onMouseEnter={() => setClearHover(true)}
              onMouseLeave={() => setClearHover(false)}
              onClick={() => {
                setAppliedFilters(false);
                handleClear && handleClear();
              }}
            >
              Clear Filter
            </span>
          </div>
        )}
      {isScroll && (
        <div
          className={`h-12 absolute bottom-[-48px] px-3 ml-4 !w-[calc(100%-32px)] left-0 ${"linear-gradient"}`}
        ></div>
      )}

      <Modal
        isOpen={filterModalVisible}
        top={0}
        closeModal={() => setFilterModalVisible(false)}
        className="min-w-[768px] max-w-[768px] tablet:max-w-[768px]"
        heading="Data Filter"
        supportingText="focus on relevant information and exclude irrelevant or
        unnecessary data."
      >
        <div className="max-h-[600px] relative">
          {/* <div className="px-6 mx-[-24px] ">
            <header className="px-6 py-2 bg-neutral-100 mx-[-24px] mt-[-16px]">
              <h1 className="text-subtitle font-medium text-neutral-700">
                Data Filter
              </h1>
              <p className="text-b2 text-neutral-500">
                focus on relevant information and exclude irrelevant or
                unnecessary data.
              </p>
            </header>
          </div> */}
          <div
            className={`${
              scrollState !== "top" && scrollState !== null
                ? "shadow-custom shadow--top"
                : "!h-0"
            } top-0  min-w-[768px] mx-[-24px]`}
          ></div>
          <div
            className={`${
              scrollState !== "bottom" && scrollState !== null
                ? "shadow-custom shadow--bottom"
                : "!h-0"
            } bottom-0 min-w-[768px] mx-[-24px] `}
          ></div>
          <div
            className="pt-6 mr-[-14px] overflow-auto max-h-[426px]"
            id="filter-modal-content"
          >
            {filterModalContent}
          </div>
          <div className="flex gap-2 items-center w-max float-right mt-6">
            <Button
              ghost
              size="md"
              color="secondary"
              onClick={() => setFilterModalVisible(false)}
            >
              Cancel
            </Button>
            <Button
              size="md"
              onClick={() => {
                setFilterModalVisible(false);
              }}
            >
              View Results
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TableSearchFilter;
