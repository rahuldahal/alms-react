import React from "react";
import useAuth from "../hooks/useAuth";
import Title from "../components/Title";
import TeacherDashboard from "../components/TeacherDashboard.js";
import PrincipalDashboard from "../components/PrincipalDashboard";

export default function Attendance() {
  const { auth } = useAuth();
  const { role } = auth;

  let DashboardToRender;

  switch (role) {
    case "PRINCIPAL":
      DashboardToRender = PrincipalDashboard;
      break;
    case "TEACHER":
      DashboardToRender = TeacherDashboard;
      break;
    default:
      DashboardToRender = <Title level="1">Error 500</Title>;
  }

  return <DashboardToRender />;
}
