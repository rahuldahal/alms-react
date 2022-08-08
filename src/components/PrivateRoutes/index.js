import { useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function PrivateRoutes () {
  const {auth} = useAuth();
  console.log(auth);
  const {isAuthenticated} = auth;
  const location = useLocation();

  useEffect(() => {
    console.log({ isAuthenticated });
  }, [isAuthenticated]);

  return isAuthenticated ? <Outlet /> : <Navigate to="/" state={{from: location}} replace />;
};
