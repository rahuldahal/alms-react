import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../components/Wrapper";
import useAuth from "../hooks/useAuth";
import { getAttendancesOfStudent } from "../services/attendances";
import { getSubjectsOfCourse } from "../services/subjects";

export function StudentAttendance() {
  const { auth } = useAuth();
  const { studentId: student, courseId: course, semester } = auth;
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);
  const [attendances, setAttendances] = useState([]);

  useEffect(() => {
    (async () => {
      const { subjects } = await getSubjectsOfCourse({ course, semester });
      const { attendances } = await getAttendancesOfStudent({
        student,
        date: "2022-09-03",
      });

      setSubjects(subjects);
      setAttendances(attendances);
    })();
  }, []);

  useEffect(() => {
    console.log({ subjects, attendances });
    if (!subjects.length || !attendances.length) {
      return;
    }

    setLoading(false);
  }, [subjects, attendances]);

  const Subject = ({ subject }) => {
    const { _id, name, code } = subject;

    return (
      <Card className="course" loading={loading} title={name}>
        <div>
          <em>{code}</em>
        </div>

        <Link
          to={`/attendances?subject=${_id}`}
          type="primary"
          className="w-100 ant-btn ant-btn-primary"
        >
          View Attendance
        </Link>
      </Card>
    );
  };

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <Wrapper className="flex dashboard">
      <section>
        {/* <Table
          bordered
          columns={subjectsColumn}
          rowKey={(record) => record._id}
          dataSource={data}
          pagination={pagination}
          loading={loading}
        /> */}

        <div className="courses flex wrap gap-8 items-center justify-center">
          {subjects.map((subject) => (
            <Subject key={subject._id} subject={subject} />
          ))}
        </div>
      </section>
    </Wrapper>
  );
}
