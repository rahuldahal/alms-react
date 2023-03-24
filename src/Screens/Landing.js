import React from 'react';
import { Navigate } from 'react-router-dom';
import FormTrigger from '../components/FormTrigger';
import Title from '../components/Title';
import Wrapper from '../components/Wrapper';
import { dashboardDefaults } from '../constants/urls';
import useAuth from '../hooks/useAuth';

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

          <video
            width="720"
            height="480"
            poster="/ALMS%20Dashboard.png"
            controls
            loop
          >
            <source
              src="https://res.cloudinary.com/rdaahal/video/upload/v1679649648/alms-storytelling_fe8dxq.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </Wrapper>
    </>
  );
}
