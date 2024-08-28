import ManageCars from "@/pages/Admin/ManageCars";
import Overview from "@/pages/Admin/Overview";

export const adminRoutes = [
  {
    path: "",
    name: "Overview",
    element: <Overview />,
  },
  {
    path: "overview",
    name: "Overview",
    element: <Overview />,
  },
  {
    path: "manage-car",
    name: "Manage Cars",
    element: <ManageCars />,
  },
];
