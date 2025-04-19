import React from "react";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { HeroUIProvider } from "@heroui/react";

import TestPage from "./pages/Test.jsx";
import LoginPage from "./pages/Login.jsx";
import StudentMainForm from "./pages/StudentMainForm.jsx";

const Layout = () => {
  return (
    <div>
    <Outlet />
  </div>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LoginPage />
      },
      {
        path: "/student",
        element: <StudentMainForm />
      },
    ]
  }

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeroUIProvider>
    <RouterProvider router={router} />

    </HeroUIProvider>
  </StrictMode>,
)
