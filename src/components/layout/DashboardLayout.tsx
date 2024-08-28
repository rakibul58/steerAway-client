import { Outlet } from "react-router-dom";
import Sidebar from "../shared/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex flex-col md:flex-row items-start">
      <Sidebar />
      <div className="max-w-6xl w-full mx-auto p-2 md:p-16">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
