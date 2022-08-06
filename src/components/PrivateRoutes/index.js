import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { hasAccessToken } from "../../services/user";

const PrivateRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(
    () => async () => {
      const isAuthenticated = hasAccessToken();
      setIsAuthenticated(isAuthenticated);
    },
    []
  );

  useEffect(() => {
    console.log({ isAuthenticated });
  }, [isAuthenticated]);

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
