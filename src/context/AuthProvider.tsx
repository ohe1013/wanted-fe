import React, { SetStateAction } from "react";
import { Dispatch } from "react";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<ProviderProps>({} as ProviderProps);

type Props = {
  children: React.ReactNode;
};
export type Auth = {
  accessToken?: string;
};
type ProviderProps = {
  auth: Auth;
  setAuth: Dispatch<SetStateAction<Auth>>;
  logout: () => void;
};

export const AuthProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState<Auth>({
    accessToken: JSON.stringify(localStorage.getItem("accessToken")),
  });
  const logout = () => {
    setAuth({ accessToken: "null" });
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return <AuthContext.Provider value={{ auth, setAuth, logout }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
