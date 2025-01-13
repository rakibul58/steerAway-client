/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu, Car, LogOut, User, ChevronRight } from "lucide-react";
import {
  logout,
  TUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { verifyToken } from "@/utils/verifyToken";
import { ReactElement } from "react";
import { adminRoutes } from "@/routes/admin.route";
import { userRoutes } from "@/routes/user.route";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { useProfileQuery } from "@/redux/features/auth/authApi";

type TRoute = {
  path: string;
  name?: string;
  element: ReactElement;
}[];

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(useCurrentToken);
  const [routes, setRoutes] = useState<TRoute>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const user = verifyToken(token as string) as TUser;
  const { data: profile } = useProfileQuery(undefined);

  useEffect(() => {
    if (token) {
      if (user?.role === "admin") {
        setRoutes(adminRoutes);
      } else {
        setRoutes(userRoutes);
      }
    }
  }, [token, user]);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const activeClasses = `
    flex items-center gap-3 w-full px-4 py-3 rounded-lg
    bg-primary/10 text-primary font-medium
    transition-all duration-300 ease-in-out
    transform hover:translate-x-1
  `;

  const inActiveClasses = `
    flex items-center gap-3 w-full px-4 py-3 rounded-lg
    text-muted-foreground font-medium
    transition-all duration-300 ease-in-out
    hover:bg-secondary hover:text-foreground
    transform hover:translate-x-1
  `;

  const sidebarVariants = {
    expanded: { width: "270px" },
    collapsed: { width: "80px" },
  };

  const DesktopSidebar = () => (
    <motion.div
      className="hidden md:block sticky top-0 h-screen bg-background border-r"
      initial="expanded"
      animate={isCollapsed ? "collapsed" : "expanded"}
      variants={sidebarVariants}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col h-full p-4">
        {/* Header with Logo */}
        <div className="flex items-center gap-3 mb-8">
          <Link className="flex gap-3" to={"/"}>
            {" "}
            <Car className="h-8 w-8 text-primary" />
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-xl font-bold"
              >
                SteerAway
              </motion.span>
            )}
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="ml-auto"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <ChevronRight
              className={`h-4 w-4 transition-transform duration-300 ${
                isCollapsed ? "rotate-0" : "rotate-180"
              }`}
            />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {routes.map(
            (route, index) =>
              route.name && (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <NavLink
                    to={route.path}
                    className={({ isActive }) =>
                      isActive ? activeClasses : inActiveClasses
                    }
                  >
                    {route.name && (
                      <>{!isCollapsed && <span>{route.name}</span>}</>
                    )}
                  </NavLink>
                </motion.div>
              )
          )}
        </nav>

        {/* Footer with User Menu */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="font-semibold text-primary truncate">
                  {profile?.data?.name}
                </span>
                <span className="text-sm font-light truncate">
                  {profile?.data?.email}
                </span>
              </div>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar className="h-10 w-10 hover:text-primary">
                    <AvatarFallback>
                      {profile?.data?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex items-center gap-2 text-red-500"
                  onClick={() => dispatch(logout())}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const MobileSidebar = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed top-4 left-4 md:hidden z-50"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <div className="flex flex-col h-full p-4">
          <Link to={'/'} className="flex items-center gap-3 mb-8">
            <Car className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">SteerAway</span>
          </Link>
          <nav className="flex-1 space-y-2">
            {routes.map(
              (route, index) =>
                route.name && (
                  <NavLink
                    key={index}
                    to={route.path}
                    className={({ isActive }) =>
                      isActive ? activeClasses : inActiveClasses
                    }
                  >
                    <span>{route.name}</span>
                  </NavLink>
                )
            )}
          </nav>
          <div className="border-t pt-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10 hover:text-primary">
                <AvatarFallback>
                  {profile?.data?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-semibold text-primary truncate">
                  {profile?.data?.name}
                </span>
                <span className="text-sm font-light truncate">
                  {profile?.data?.email}
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full mt-4 text-red-500"
              onClick={() => dispatch(logout())}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
};

export default Sidebar;
