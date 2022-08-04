import React from "react";
import FormTrigger from "../components/FormTrigger";
import Title from "../components/Title";
import Wrapper from "../components/Wrapper";

export default function Landing() {
  return (
    <>
      <Wrapper className="hero">
        <div className="flex hero-row">
          <div className="hero-col">
            <Title level={1} className="AppTitle">
              Attendance and Leave <br /> Management System
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
