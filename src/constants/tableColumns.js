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
