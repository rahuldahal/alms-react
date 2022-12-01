import { Calendar } from "antd";
import useData from "../../hooks/useData";
import { getISODateOnly } from "../../utils/date";
import { useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getAttendancesOfMonth } from "../../services/attendances";
import useAuth from "../../hooks/useAuth";

export default function AttendanceCalendar() {
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(getISODateOnly());
  const [attendanceDateMap, setAttendanceDateMap] = useState({});
  const { data, setData } = useData();
  const { auth } = useAuth();
  const [searchParams] = useSearchParams();
  const subject = searchParams.get("subject");

  const fetchData = async () => {
    setLoading(true);
    const { attendances } = await getAttendancesOfMonth({
      student: auth.studentId,
      subject,
      date,
    });

    setData((previousState) => ({ ...previousState, attendances }));
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
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

  const onSelectHandler = (value) => {
    setDate(getISODateOnly(value.format()));
  };

  const dateCellRender = (value) => {
    const date = getISODateOnly(value.format());

    if (attendanceDateMap[date] === undefined) {
      return <span className="color-neutral">N/A</span>;
    }

    if (attendanceDateMap[date]) {
      return <span className="color-green">Present</span>;
    }

    return <span className="color-red">Absent</span>;
  };
  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <Calendar dateCellRender={dateCellRender} onSelect={onSelectHandler} />
  );
}
