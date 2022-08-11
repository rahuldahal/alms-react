import { useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function PrivateRoutes({ allowedRoles }) {
  const { auth } = useAuth();
  console.log(auth);
  const { isAuthenticated, role } = auth;
  const location = useLocation();

  useEffect(() => {
    console.log({ isAuthenticated });
  }, [isAuthenticated]);

  return isAuthenticated && allowedRoles.includes(role) ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}
