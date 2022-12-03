import React from "react";
import { Navigate } from "react-router-dom";
import FormTrigger from "../components/FormTrigger";
import Title from "../components/Title";
import Wrapper from "../components/Wrapper";
import { dashboardDefaults } from "../constants/urls";
import useAuth from "../hooks/useAuth";

export default function Landing() {
  const { auth } = useAuth();
  const { isAuthenticated, role } = auth;

  if (isAuthenticated) {
    return <Navigate to={dashboardDefaults[role]} replace />;
  }

  return (
    <>
      <Wrapper className="hero">
        <div className="flex hero-row">
          <div className="hero-col">
            <Title level={1} className="AppTitle">
              Attendance <br /> Management System
            </Title>

            <FormTrigger size="large" triggers="signIn" className="CTA">
              Sign In
            </FormTrigger>
          </div>

          <img
            src="https://picsum.photos/640/480"
            alt="dashboard art of the application"
          />
        </div>
      </Wrapper>
    </>
  );
}
