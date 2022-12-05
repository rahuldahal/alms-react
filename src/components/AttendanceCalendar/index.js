import { Button, Calendar, Spin } from "antd";
import useAuth from "../../hooks/useAuth";
import useData from "../../hooks/useData";
import { getISODateOnly } from "../../utils/date";
import { Link, useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getAttendancesOfMonth } from "../../services/attendances";
import DashboardNav, { getItem } from "../DashboardNav";
import Wrapper from "../Wrapper";

export default function AttendanceCalendar() {
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(getISODateOnly());
  const [attendanceDateMap, setAttendanceDateMap] = useState({});
  const [subjectIdNameMap, setSubjectIdNameMap] = useState(null);
  const [currentSubjectId, setCurrentSubjectId] = useState(null);

  const { data, setData } = useData();
  const { auth } = useAuth();
  const [searchParams] = useSearchParams();
  const subject = searchParams.get("subject");

  const fetchData = async ({ subjectId = subject }) => {
    setLoading(true);
    setCurrentSubjectId(subjectId);
    const { attendances } = await getAttendancesOfMonth({
      student: auth.studentId,
      subject: subjectId,
      date,
    });

    setData((previousState) => ({ ...previousState, attendances }));
    setLoading(false);
  };

  useEffect(() => {
    const subjectIdNameMap = {};
    data.subjects?.forEach(({ _id, name: subjectName }) => {
      subjectIdNameMap[_id] = subjectName;
    });

    setSubjectIdNameMap(subjectIdNameMap);
    console.log(subjectIdNameMap);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchData({});
  }, [date]);

  useEffect(() => {
    console.log(data.attendances);

    const attendanceDateMap = {};
    data.attendances?.forEach(
      ({ date, isPresent }) => (attendanceDateMap[date] = isPresent)
    );

    setAttendanceDateMap(attendanceDateMap);
  }, [data.attendances]);

  useEffect(() => {
    console.log(attendanceDateMap);
    setLoading(false);
  }, [attendanceDateMap]);

  const onChangeHandler = (value) => {
    setDate(getISODateOnly(value.format()));
  };

  const dateCellRender = (value) => {
    const currentDate = getISODateOnly(value.format());

    const currentMonth = new Date(value.format()).getMonth() + 1;
    const selectedMonth = new Date(date).getMonth() + 1;

    if (currentMonth !== selectedMonth) {
      return;
    }

    if (attendanceDateMap[currentDate] === undefined) {
      return <span className="color-neutral">N/A</span>;
    }

    if (attendanceDateMap[currentDate]) {
      return <span className="color-green">Present</span>;
    }

    return <span className="color-red">Absent</span>;
  };

  const getDashboardNavItems = () => {
    return data.subjects?.map(({ _id, name: subjectName }) => {
      return getItem(
        <Button
          type={currentSubjectId === _id ? "primary" : "text"}
          onClick={() => fetchData({ subjectId: _id })}
        >
          {subjectName}
        </Button>,
        _id,
        null
      );
    });
  };

  return (
    <Wrapper className="flex">
      {loading ? (
        <Spin size="large" className="apiLoader" />
      ) : (
        <>
          <DashboardNav navItems={getDashboardNavItems()} />
          <Calendar
            dateCellRender={dateCellRender}
            onChange={onChangeHandler}
          />
        </>
      )}
    </Wrapper>
  );
}
