import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";

const RequireAuth = () => {
  const { auth } = useContext(AuthContext);
  const accessToken = auth.accessToken;
  return accessToken === "null" ? <Navigate to="/auth" /> : <Outlet />;
};
export const NotRequireAuth = () => {
  const { auth } = useContext(AuthContext);
  const accessToken = auth.accessToken;
  return accessToken !== "null" ? <Navigate to="/" /> : <Outlet />;
};

export default RequireAuth;
