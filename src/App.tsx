import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import RequireAuth, { NotRequireAuth } from "./components/auth/RequiredAuth";
import TodoMain from "./components/todo/TodoMain";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<NotRequireAuth />}>
          <Route path="auth" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="todos" element={<TodoMain />} />
          <Route path="todos/:id" element={<TodoMain />} />
        </Route>
      </Route>
      <Route path="*" element={<Layout />} />
    </Routes>
  );
}

export default App;
