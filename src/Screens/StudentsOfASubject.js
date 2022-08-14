import React, { useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import { Button, Space, Table } from "antd";
import { getStudentsByCourseAndSemester } from "../services/students";
import { studentsColumnCommon } from "../constants/tableColumns";
import DashboardNav from "../components/DashboardNav";
import { useLocation, useSearchParams } from "react-router-dom";
import { createAttendance } from "../services/attendances";
import useAuth from "../hooks/useAuth";

export default function StudentsOfASubject() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { auth } = useAuth();

  const { subjectId, subjectName } = location.state?.data;

  const course = searchParams.get("course");
  const semester = searchParams.get("semester");

  const { _id: teacher } = auth;

  // states
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const [disabledButtons, setDisabledButtons] = useState({});

  const studentsColumnTeacherAction = [
    {
      title: "Actions",
      dataIndex: "user",
      render: (student) => (
        <Space>
          <Button
            onClick={() =>
              handleAttendance({ student: student._id, isPresent: true })
            }
            type="primary"
            disabled={!!disabledButtons[student._id]}
          >
            Present
          </Button>
          <Button
            onClick={() =>
              handleAttendance({ student: student._id, isPresent: false })
            }
            danger
            disabled={!!disabledButtons[student._id]}
          >
            Absent
          </Button>
        </Space>
      ),
    },
  ];

  const fetchData = async (params = {}) => {
    setLoading(true);
    const { students, total } = await getStudentsByCourseAndSemester({
      course,
      semester,
    });

    setData(students);
    setLoading(false);
    setPagination({
      ...params.pagination,
      total,
    });
  };

  useEffect(() => {
    fetchData({
      pagination,
    });
  }, []);

  useEffect(() => {
    console.log(disabledButtons);
  }, [disabledButtons]);

  const handleTableChange = (newPagination, filters, sorter) => {
    fetchData({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination: newPagination,
      ...filters,
    });
  };

  async function handleAttendance({ student, isPresent }) {
    await createAttendance({
      subject: subjectId,
      teacher,
      student,
      isPresent,
      date: new Date().toISOString(),
    });

    setDisabledButtons((previousState) => ({
      ...previousState,
      [student]: true,
    }));
  }

  return (
    <Wrapper className="flex dashboard">
      <DashboardNav />

      <section>
        <Table
          bordered
          columns={[...studentsColumnCommon, ...studentsColumnTeacherAction]}
          rowKey={(record) => record._id}
          dataSource={data}
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
        />
      </section>
    </Wrapper>
  );
}
