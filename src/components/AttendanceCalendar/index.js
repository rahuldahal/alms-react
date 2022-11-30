import React from "react";
import { Calendar } from "antd";
import { getISODateOnly } from "../../utils/date";

export default function AttendanceCalendar() {
  const dateCellRender = (value) => {
    const date = getISODateOnly(value.format());

    // TODO: fetch the attendance for particular subject and render accordingly

    if (date === "2022-08-02") {
      return <span className="color-green">Present</span>;
    }
  };
  return <Calendar dateCellRender={dateCellRender} />;
}
