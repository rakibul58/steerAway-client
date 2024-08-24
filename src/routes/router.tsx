import MainLayout from "@/components/layout/MainLayout";
import About from "@/pages/About";
import Error from "@/pages/Error";
import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error></Error>,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);
