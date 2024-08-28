import ManageCars from "@/pages/Admin/ManageCars";
import Overview from "@/pages/Admin/Overview";

export const adminRoutes = [
  {
    path: "",
    element: <Overview />,
  },
  {
    path: "overview",
    element: <Overview />,
  },
  {
    path: "manage-car",
    element: <ManageCars />,
  },
];
