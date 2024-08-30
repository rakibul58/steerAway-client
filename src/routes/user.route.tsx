import Overview from "@/pages/User/Overview";

export const userRoutes = [
  {
    path: "",
    element: <Overview />,
  },
  {
    path: "overview",
    name: "Overview",
    element: <Overview />,
  },
  {
    path: "booking-management",
    name: "Booking Management",
    element: <Overview />,
  },
];
