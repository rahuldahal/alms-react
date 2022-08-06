import { Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import Wrapper from "../components/Wrapper";

export default function Students() {
  const DASHBOARD_BASE = "/dashboard";
  const navLinkURLs = {
    student: `${DASHBOARD_BASE}/students`,
    teacher: `${DASHBOARD_BASE}/teachers`,
    hod: `${DASHBOARD_BASE}/hods`,
  };

  return (
    <Wrapper className="flex dashboard">
      <Menu className="dashboardNav">
        <Menu.Item key="students">
          <Link className="dashboardNav__link" to={navLinkURLs.student}>
            Students
          </Link>
        </Menu.Item>

        <Menu.Item key="teachers">
          <Link className="dashboardNav__link" to={navLinkURLs.teacher}>
            Teachers
          </Link>
        </Menu.Item>

        <Menu.Item key="hods">
          {" "}
          <Link className="dashboardNav__link" to={navLinkURLs.hod}>
            HODs
          </Link>
        </Menu.Item>
      </Menu>

      <section>Students!</section>
    </Wrapper>
  );
}
