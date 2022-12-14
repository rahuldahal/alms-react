import React, { useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import { Button, Card, Space, Table } from "antd";
import { subjectsColumn } from "../constants/tableColumns";
import DashboardNav from "../components/DashboardNav";
import { getTeacherByUserId } from "../services/teachers";
import useAuth from "../hooks/useAuth";
import useData from "../hooks/useData";
import { getSubjectsOfCourse } from "../services/subjects";
import { Link, useSearchParams } from "react-router-dom";

export default function Subjects() {
  const [searchParams] = useSearchParams();
  const { auth } = useAuth();
  const { userId, teacherId } = auth;

  const course = searchParams.get("course");
  const semester = searchParams.get("semester");

  // states
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const { setData } = useData();

  const fetchData = async (params = {}) => {
    setLoading(true);

    if (userId && teacherId) {
      const { teacher } = await getTeacherByUserId({ userId });
      const { subjects } = teacher;
      setSubjects(subjects);
      setData((previousState) => ({ ...previousState, subjects }));
    } else {
      const { subjects } = await getSubjectsOfCourse({ course, semester });
      setSubjects(subjects);
      setData((previousState) => ({
        ...previousState,
        subjects,
        course,
        semester,
      }));
    }

    setLoading(false);
    setPagination({
      ...params.pagination,
      total: subjects?.length || 0,
    });
  };

  useEffect(() => {
    fetchData({
      pagination,
    });
  }, []);

  const Subject = ({ subject }) => {
    const { _id, name, code, course, semester } = subject;

    return (
      <Card className="course" loading={loading} title={name}>
        <div>
          <em>{code}</em>
        </div>

        <Space className="w-100 mt-2 attendanceCTA">
          <Link
            to={`/attendances?subject=${_id}`}
            type="primary"
            className="w-100 ant-btn ant-btn-primary"
          >
            View Attendance
          </Link>
          {teacherId ? (
            <Link
              to={`/subjects/students?course=${course._id}&semester=${semester}`}
              state={{ data: { subjectName: name, subjectId: _id } }}
              type="primary"
              className="ant-btn ant-btn-outlined"
            >
              Create Attendance
            </Link>
          ) : null}
        </Space>
      </Card>
    );
  };

  return (
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
