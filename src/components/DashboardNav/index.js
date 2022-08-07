import { Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { ATTENDANCES_BASE, users } from "../../constants/urls";
import FormTrigger from "../FormTrigger";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

function MenuLink({ to, label }) {
  return (
    <Link className="dashboardNav__link" to={to}>
      {label}
    </Link>
  );
}

const items = [
  getItem("Attendance", "attendance", null, [
    getItem(
      <MenuLink to={ATTENDANCES_BASE} label="All" />,
      "allAttendances",
      null
    ),
    getItem(
      // FormTrigger
      <FormTrigger
        type="link"
        triggers="createAttendance"
        className="createAttendance"
      >
        Create
      </FormTrigger>,
      "createAttendance",
      null
    ),
  ]),
  getItem("Students", "students", null, [
    getItem(
      <MenuLink to={users.students.ui} label="All" />,
      "allStudents",
      null
    ),
    getItem(
      // FormTrigger
      <MenuLink to={users.students.api} label="Create" />,
      "createStudent",
      null
    ),
  ]),
  getItem("Teachers", "teachers", null, [
    getItem(
      <MenuLink to={users.teachers.ui} label="All" />,
      "allTeachers",
      null
    ),
    getItem(
      // FormTrigger
      <MenuLink to={users.teachers.api} label="Create" />,
      "createTeacher",
      null
    ),
  ]),
  getItem("HODs", "hods", null, [
    getItem(<MenuLink to={users.hods.ui} label="All" />, "allHODs", null),
    getItem(
      // FormTrigger
      <MenuLink to={users.hods.api} label="Create" />,
      "createHODs",
      null
    ),
  ]),
];

export default function DashboardNav() {
  const onClick = (e) => {
    console.log("click ", e);
  };

  return (
    <Menu
      onClick={onClick}
      style={{
        width: 256,
      }}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["attendance"]}
      mode="inline"
      items={items}
    />
  );
}
