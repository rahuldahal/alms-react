import React from "react";
import Title from "../Title";
import { Avatar, Button } from "antd";
import Wrapper from "../Wrapper";
import FormTrigger from "../FormTrigger";
import useAuth from "../../hooks/useAuth";
import { signOut } from "../../services/user";
import { Link, useNavigate } from "react-router-dom";

export default function Nav({ isLoading }) {
  const { auth, setAuth } = useAuth();
  const { isAuthenticated, picture } = auth;
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
        <Link to="/">
          <Title level={4} className="logo">
            AMS
          </Title>
        </Link>

        {!isAuthenticated ? (
          <FormTrigger triggers="signIn" className="CTA">
            Sign In
          </FormTrigger>
        ) : (
          <div className="flex">
            <Avatar src={picture} className="mr-2 avatar" />

            <Button danger onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        )}
      </Wrapper>
    </nav>
  );
}
