import React, { useContext } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import RequireAuth from "./components/auth/RequiredAuth";
import AuthContext from "./context/AuthProvider";
import TodoMain from "./components/todo/TodoMain";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<RequireAuth />}>
          <Route path="auth" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="todos" element={<TodoMain />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
