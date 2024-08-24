import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

const MainLayout = () => {
  return (
    <div className="w-full max-w-7xl min-h-screen mx-auto px-4 lg:px-0">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
