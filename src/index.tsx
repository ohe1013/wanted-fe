import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClientProvider } from "react-query/types/react";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const queryClient = new QueryClient();
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={true} />
        <AuthProvider>
          <Routes>
            <Route path="/*" element={<App />}></Route>
          </Routes>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
