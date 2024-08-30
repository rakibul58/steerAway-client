import BookingManagement from "@/pages/User/BookingManagement";
import Overview from "@/pages/User/Overview";
import PaymentPage from "@/pages/User/PaymentPage";

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
    element: <BookingManagement />,
  },
  {
    path: "payment-receipt/:id",
    element: <PaymentPage />,
  },
];
