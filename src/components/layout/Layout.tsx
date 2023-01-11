import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = () => {
  return (
    <>
      <main className="App">
        <NavBar></NavBar>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
