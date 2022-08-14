import React from "react";
import Title from "../Title";
import { Button } from "antd";
import Wrapper from "../Wrapper";
import FormTrigger from "../FormTrigger";
import useAuth from "../../hooks/useAuth";
import { signOut } from "../../services/user";
import { useNavigate } from "react-router-dom";

export default function Nav({ isLoading }) {
  const { auth, setAuth } = useAuth();
  const { isAuthenticated } = auth;
  const navigate = useNavigate();

  async function handleSignOut() {
    try {
      await signOut();
      setAuth({ isAuthenticated: false });
      navigate("/", { replace: true });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <nav className="nav">
      <Wrapper className="flex">
        <Title level={4} className="logo">
          ALMS
        </Title>

        {!isAuthenticated ? (
          <FormTrigger triggers="signIn" className="CTA">
            Sign In
          </FormTrigger>
        ) : (
          <Button danger onClick={handleSignOut}>
            Sign Out
          </Button>
        )}
      </Wrapper>
    </nav>
  );
}
