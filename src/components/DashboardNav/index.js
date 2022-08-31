import { Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { ATTENDANCES_BASE, users } from "../../constants/urls";
import useAuth from "../../hooks/useAuth";
import FormTrigger from "../FormTrigger";

export function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

export function MenuLink({ to, label }) {
  return (
    <Link className="dashboardNav__link" to={to}>
      {label}
    </Link>
  );
}

// TODO: keep these "items" into constants/

export const principalItems = [
  getItem("Students", "students", null, [
    getItem(
      <MenuLink to={users.students.ui} label="All" />,
      "allStudents",
      null
    ),
    getItem(
      // FormTrigger
      <FormTrigger
        type="link"
        triggers="createStudent"
        className="createStudent"
      >
        Create
      </FormTrigger>,
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
      <FormTrigger
        type="link"
        triggers="createTeacher"
        className="createTeacher"
      >
        Create
      </FormTrigger>,
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

function getNavItems(role) {
  let item;
  switch (role) {
    case "PRINCIPAL":
      item = principalItems;
      break;
  }

  return item;
}

export default function DashboardNav({ navItems = [], defaultOpenKey }) {
  const { auth } = useAuth();
  const { role } = auth;

  const onClick = (e) => {
    console.log("click ", e);
  };

  return (
    <Menu
      onClick={onClick}
      style={{
        width: 220,
      }}
      className="dashboardNav"
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={[defaultOpenKey]}
      mode="inline"
      items={navItems.length ? navItems : getNavItems(role)}
    />
  );
}
