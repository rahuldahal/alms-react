import { Button, DatePicker, Space } from "antd";
import { Link } from "react-router-dom";
import FormTrigger from "../components/FormTrigger";

export const studentsColumnCommon = [
  {
    title: "Fullname",
    dataIndex: "user",
    sorter: (a, b) => a.user.fullName.localeCompare(b.user.fullName),
    render: (user) => user.fullName,
    width: "20%",
  },
  {
    title: "Email",
    dataIndex: "user",
    render: (user) => user.email,
  },
  {
    title: "Batch",
    dataIndex: "batch",
  },
  {
    title: "Course",
    dataIndex: "course",
    render: (course) => course.shortName,
    width: "10%",
  },
  {
    title: "Semester",
    dataIndex: "semester",
  },
];

export const attendancesColumnPrincipal = [
  {
    title: "Teacher",
    children: [
      {
        title: "FullName",
        dataIndex: "teacher",
        render: (teacher) => teacher?.user?.fullName,
      },
      {
        title: "Email",
        dataIndex: "teacher",
        render: (teacher) => teacher?.user?.email,
      },
    ],
  },
  {
    title: "Subject",
    children: [
      {
        title: "FullName",
        dataIndex: "subject",
        render: (subject) => (
          <Link to={`/attendances?subject=${subject?._id}`} type="primary">
            {subject?.name}
          </Link>
        ),
      },
    ],
  },
];

export const studentsColumnPrincipalAction = [
  {
    title: "Actions",
    dataIndex: "user",
    render: (student) => (
      <FormTrigger
        triggers="createAttendance"
        additionalData={{ studentId: student._id }}
      >
        Create Attendance
      </FormTrigger>
    ),
  },
];

export const subjectsColumn = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Semester",
    dataIndex: "semester",
  },
  {
    title: "Code",
    dataIndex: "code",
  },
  {
    title: "Course",
    dataIndex: "course",
    render: (course) => course.shortName,
  },
  {
    title: "Actions",
    dataIndex: "",
    render: (_, record) => (
      <Space size="middle">
        <Link to={`/attendances?subject=${record._id}`} type="primary">
          View Attendance
        </Link>
        <Link
          to={`/subjects/students?course=${record.course._id}&semester=${record.semester}`}
          state={{ data: { subjectName: record.name, subjectId: record._id } }}
          type="primary"
          className="ant-btn ant-btn-primary"
        >
          Create Attendance
        </Link>
      </Space>
    ),
  },
];
