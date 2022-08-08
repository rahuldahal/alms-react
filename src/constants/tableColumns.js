import { Button, Space } from "antd";

export const studentsColumn = [
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
  {
    title: "Actions",
    dataIndex: "user",
    render: (name) => (
      <Space size="middle">
        <Button type="primary">Edit</Button>
        <Button danger>Delete</Button>
      </Space>
    ),
  },
];

export const attendancesColumn = [
  {
    title: "Student",
    children: [
      {
        title: "FullName",
        dataIndex: "student",
        render: (student) => student.user.fullName,
      },
      {
        title: "Email",
        dataIndex: "student",
        render: (student) => student.user.email,
      },
      {
        title: "Batch",
        dataIndex: "student",
        render: (student) => student.batch,
      },
    ],
  },
  {
    title: "Teacher",
    children: [
      {
        title: "FullName",
        dataIndex: "teacher",
        render: (teacher) => teacher.user.fullName,
      },
      {
        title: "Email",
        dataIndex: "teacher",
        render: (teacher) => teacher.user.email,
      },
    ],
  },
  {
    title: "Subject",
    children: [
      {
        title: "FullName",
        dataIndex: "subject",
        render: (subject) => subject.name,
      },
      {
        title: "Code",
        dataIndex: "subject",
        render: (subject) => subject.code,
      },
    ],
  },
  {
    title: "Attendance",
    children: [
      {
        title: "Date",
        dataIndex: "date",
        render: (date) => date.split("T")[0],
      },
      {
        title: "Status",
        dataIndex: "isPresent",
        render: (isPresent) => (isPresent ? "Present" : "Absent"),
      },
    ],
  },
];
