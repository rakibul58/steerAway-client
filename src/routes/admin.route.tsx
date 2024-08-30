import AddCars from "@/pages/Admin/AddCars";
import EditCars from "@/pages/Admin/EditCars";
import ManageCars from "@/pages/Admin/ManageCars";
import Overview from "@/pages/Admin/Overview";

export const adminRoutes = [
  {
    path: "",
    name: "",
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
  {
    path: "add-car",
    element: <AddCars />,
  },
  {
    path: "edit-car/:id",
    element: <EditCars />,
  },
];
