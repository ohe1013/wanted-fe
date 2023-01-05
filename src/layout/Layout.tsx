import React from "react";
import { Link, Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

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
