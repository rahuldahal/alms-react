import React from "react";
import Title from "../Title";
import { Button } from "antd";
import Wrapper from "../Wrapper";
import FormTrigger from "../FormTrigger";

export default function Nav({ isLoading }) {
  return (
    <nav className="nav">
      <Wrapper className="flex">
        <Title level={4} className="logo">
          ALMS
        </Title>

        <FormTrigger triggers="signIn" className="CTA">
          Sign In
        </FormTrigger>
      </Wrapper>
    </nav>
  );
}
