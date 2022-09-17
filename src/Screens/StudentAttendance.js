import { Card } from "antd";
import Title from "../components/Title";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../components/Wrapper";
import useAuth from "../hooks/useAuth";
import { getAttendancesOfStudent } from "../services/attendances";
import { getSubjectsOfCourse } from "../services/subjects";
import { getISODateOnly } from "../utils/date";

export function StudentAttendance() {
  const { auth } = useAuth();
  const { studentId: student, courseId: course, semester } = auth;
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);
  const [attendances, setAttendances] = useState([]);
  const [attendancesMap, setAttendancesMap] = useState({});

  useEffect(() => {
    (async () => {
      const { subjects } = await getSubjectsOfCourse({ course, semester });
      const { attendances } = await getAttendancesOfStudent({
        student,
        date: getISODateOnly(),
      });

      setSubjects(subjects);
      setAttendances(attendances);
    })();
  }, []);

  useEffect(() => {
    console.log({ subjects, attendances });
    if (!subjects.length || !attendances.length) {
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
  }, [subjects, attendances]);

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
          to={`/attendances?subject=${_id}`}
          type="primary"
          className="w-100 mt-2 ant-btn ant-btn-primary"
        >
          View Calendar
        </Link>
      </Card>
    );
  };

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <Wrapper className="flex dashboard">
      <section>
        <Title>Today's Attendance</Title>

        <div className="courses flex wrap gap-10 items-center justify-center">
          {subjects.map((subject) => (
            <Subject key={subject._id} subject={subject} />
          ))}
        </div>
      </section>
    </Wrapper>
  );
}
