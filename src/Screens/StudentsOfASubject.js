import useAuth from "../hooks/useAuth";
import Wrapper from "../components/Wrapper";
import { Button, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import DashboardNav from "../components/DashboardNav";
import { createAttendance } from "../services/attendances";
import { useLocation, useSearchParams } from "react-router-dom";
import { studentsColumnCommon } from "../constants/tableColumns";
import { getStudentsByCourseAndSemester } from "../services/students";

export default function StudentsOfASubject() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { auth } = useAuth();

  console.log(auth);

  const { subjectId, subjectName } = location.state?.data;

  const course = searchParams.get("course");
  const semester = searchParams.get("semester");

  const { teacherId } = auth;

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
      dataIndex: "_id",
      render: (_id) => (
        <Space>
          <Button
            onClick={() => handleAttendance({ student: _id, isPresent: true })}
            type="primary"
            disabled={!!disabledButtons[_id]}
          >
            Present
          </Button>
          <Button
            onClick={() => handleAttendance({ student: _id, isPresent: false })}
            danger
            disabled={!!disabledButtons[_id]}
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
      teacher: teacherId,
      student,
      isPresent,
      date: new Date().toISOString().split("T")[0],
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
