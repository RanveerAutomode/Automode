"use client";

import React, { useState } from "react";
import type { DatePickerProps, RangePickerProps } from "antd/lib/date-picker";
import type { TimeRangePickerProps } from "antd";
import { DatePicker } from "antd";

import "./CustomRangePicker.css";
import Button from "../buttons/Button";
import dayjs from "dayjs";

type CustomDatePickerProps = {
  range?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  setSelectedDate?: (date: string[]) => void;
} & (DatePickerProps | RangePickerProps);

const { RangePicker } = DatePicker;

const getQuarterStart = (date: dayjs.Dayjs, offset: number) => {
  const quarter = Math.floor(date.month() / 3);
  return date.month(quarter * 3 + offset * 3).startOf("month");
};

const getQuarterEnd = (date: dayjs.Dayjs, offset: number) => {
  const quarter = Math.floor(date.month() / 3);
  return date.month(quarter * 3 + 2 + offset * 3).endOf("month");
};

const rangePresets: TimeRangePickerProps["presets"] = [
  { label: "Today", value: [dayjs().startOf("day"), dayjs().endOf("day")] },
  {
    label: "Yesterday",
    value: [
      dayjs().subtract(1, "day").startOf("day"),
      dayjs().subtract(1, "day").endOf("day"),
    ],
  },
  {
    label: "This Month",
    value: [dayjs().startOf("month"), dayjs().endOf("month")],
  },
  {
    label: "Last Month",
    value: [
      dayjs().subtract(1, "month").startOf("month"),
      dayjs().subtract(1, "month").endOf("month"),
    ],
  },
  {
    label: "This Quarter",
    value: [getQuarterStart(dayjs(), 0), getQuarterEnd(dayjs(), 0)],
  },
  {
    label: "Last Quarter",
    value: [getQuarterStart(dayjs(), -1), getQuarterEnd(dayjs(), -1)],
  },
  {
    label: "This Year",
    value: [dayjs().startOf("year"), dayjs().endOf("year")],
  },
  {
    label: "Last Year",
    value: [
      dayjs().subtract(1, "year").startOf("year"),
      dayjs().subtract(1, "year").endOf("year"),
    ],
  },
];

function calculateSelectedDays(dates: string[]) {
  if (!dates || dates.length !== 2 || !dates[0] || !dates[1]) {
    return 0; // Return 0 for an invalid date range
  }

  const start = dayjs(dates[0]);
  const end = dayjs(dates[1]);

  if (!start.isValid() || !end.isValid()) {
    return 0; // Return 0 for an invalid date range
  }

  const days = end.diff(start, "day") + 1; // Add 1 to include both start and end dates
  return days > 0 ? days : 0; // Return the number of days if greater than 0, otherwise return 0
}

const CustomRangePicker: React.FC<CustomDatePickerProps> = ({
  range,
  open,
  onOpenChange,
  setSelectedDate,
  ...props
}) => {
  const [selectedDates, setSelectedDates] = useState<string[]>([]);

  const handleCancel = () => {
    //  logic
  };

  console.log(selectedDates);

  const handleSave = (value: any) => {
    console.log("value: ", value);
  };

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
    setSelectedDate?.([dateString]);
  };

  const onRangeChange: RangePickerProps["onChange"] = (dates, dateStrings) => {
    console.log(dates, dateStrings);

    const selectedDates =
      dates && dates.length === 2 && dates[0] && dates[1]
        ? [dates[0].format("YYYY-MM-DD"), dates[1].format("YYYY-MM-DD")]
        : [];

    setSelectedDates(selectedDates);
  };

  const renderFooter = (selectedDates: any) => {
    const selectedDays = calculateSelectedDays(selectedDates);

    return (
      <>
        {range && <div>Selected: {selectedDays} days</div>}
        <div
          className={`flex ${
            range ? "justify-end mt-6" : "justify-between"
          } gap-3 items-center px-6 mb-6`}
        >
          <Button
            size="md"
            color="secondary"
            ghost
            className={`${range ? "max-w-max" : ""}`}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            size="md"
            className={`${range ? "max-w-max" : ""}`}
            color="primary"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </>
    );
  };

  if (range) {
    return (
      <RangePicker
        popupClassName="customRangePicker hidden tablet:flex"
        onCalendarChange={onRangeChange}
        // renderExtraFooter={renderFooter}
        presets={rangePresets}
        format={"DD/MM/YYYY"}
        onChange={onRangeChange}
        {...(props as RangePickerProps)}
      />
    );
  }

  return (
    <DatePicker
      // renderExtraFooter={renderFooter}
      // onOk={handleSave}
      open={open}
      format={"DD MMMM YYYY"}
      onChange={onChange}
      onOpenChange={onOpenChange}
      {...(props as DatePickerProps)}
    />
  );
};

export default CustomRangePicker;
