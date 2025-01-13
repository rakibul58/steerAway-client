import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { useEffect } from "react";

const MainLayout = () => {
  const { pathname } = useLocation();

  //to scroll to top every time route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className="w-full">
      <Navbar />
      <div className="max-w-7xl min-h-screen mx-auto px-4 lg:px-0">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
