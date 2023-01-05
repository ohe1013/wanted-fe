import { useLocation, Navigate, Outlet } from "react-router-dom";
import React, { useContext } from "react";
import AuthContext from "../../context/AuthProvider";

const RequireAuth = () => {
  const { auth } = useContext(AuthContext);
  const accessToken = auth.accessToken;

  return accessToken !== "null" ? <Navigate to="/" /> : <Outlet />;
};

export default RequireAuth;
