import { Card, Spin } from "antd";
import useData from "../hooks/useData";
import useAuth from "../hooks/useAuth";
import Title from "../components/Title";
import { Link } from "react-router-dom";
import Wrapper from "../components/Wrapper";
import { getISODateOnly } from "../utils/date";
import React, { useEffect, useState } from "react";
import { getSubjectsOfCourse } from "../services/subjects";
import { getAttendancesOfStudent } from "../services/attendances";

export function StudentAttendance() {
  const { auth } = useAuth();
  const { studentId: student, courseId: course, semester } = auth;
  const [loading, setLoading] = useState(true);
  const [attendances, setAttendances] = useState([]);
  const [attendancesMap, setAttendancesMap] = useState({});

  const { data, setData } = useData();

  useEffect(() => {
    (async () => {
      const { subjects } = await getSubjectsOfCourse({ course, semester });
      const { attendances } = await getAttendancesOfStudent({
        student,
        date: getISODateOnly(),
      });

      setData((previousState) => ({ ...previousState, subjects }));
      setAttendances(attendances);
    })();
  }, []);

  useEffect(() => {
    if (!data.subjects?.length || !attendances.length) {
      setAttendancesMap({});
      setLoading(false);
      return;
    }

    const attendancesMap = {};
    attendances.forEach((attendance) => {
      attendancesMap[attendance.subject._id.toString()] = attendance.isPresent;
    });

    console.log(attendancesMap);
    setAttendancesMap(attendancesMap);
    setLoading(false);
  }, [data.subjects, attendances]);

  const Subject = ({ subject }) => {
    const { _id, name, code } = subject;
    console.log(attendancesMap);
    const attendance = attendancesMap[_id]
      ? "present"
      : attendancesMap[_id] === undefined
      ? "n/a"
      : "absent";

    return (
      <Card
        className="course"
        data-attendance={attendance}
        loading={loading}
        title={name}
      >
        <div>
          <em>{code}</em>
        </div>

        <Link
          to={`/attendance-calendar?subject=${_id}`}
          type="primary"
          className="w-100 mt-2 ant-btn ant-btn-primary"
        >
          View Calendar
        </Link>
      </Card>
    );
  };

  return loading ? (
    <Spin size="large" className="apiLoader" />
  ) : (
    <Wrapper className="flex dashboard">
      <section>
        <Title>Today's Attendance</Title>

        <div className="courses flex wrap gap-10 items-center justify-center">
          {data.subjects?.map((subject) => (
            <Subject key={subject._id} subject={subject} />
          ))}
        </div>
      </section>
    </Wrapper>
  );
}
