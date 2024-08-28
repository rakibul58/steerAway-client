import { Outlet } from "react-router-dom";
import Sidebar from "../shared/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="max-w-6xl w-full mx-auto md:p-16 pt-16 px-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
