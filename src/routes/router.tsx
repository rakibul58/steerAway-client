import MainLayout from "@/components/layout/MainLayout";
import About from "@/pages/About";
import CarListing from "@/pages/CarListing";
import Error from "@/pages/Error";
import Home from "@/pages/Home";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import Contact from "@/components/About/Contact";
import { createBrowserRouter } from "react-router-dom";
import { adminRoutes } from "./admin.route";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { userRoutes } from "./user.route";
import ProtectedRoute from "@/components/layout/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "signIn",
        element: <SignIn />,
      },
      {
        path: "signUp",
        element: <SignUp />,
      },
      {
        path: "car-listings",
        element: <CarListing />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    errorElement: <Error />,
    children: adminRoutes,
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute role="user">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    errorElement: <Error />,
    children: userRoutes,
  },
]);
