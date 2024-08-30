import AddCars from "@/pages/Admin/AddCars";
import EditCars from "@/pages/Admin/EditCars";
import ManageBookings from "@/pages/Admin/ManageBookings";
import ManageCars from "@/pages/Admin/ManageCars";
import ManageReturn from "@/pages/Admin/ManageReturn";
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
  {
    path: "manage-bookings",
    name: "Manage Bookings",
    element: <ManageBookings />,
  },
  {
    path: "return-cars",
    name: "Manage Return",
    element: <ManageReturn />,
  },
];
