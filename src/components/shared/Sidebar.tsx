import { NavLink } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { ModeToggle } from "../theme/mode-toggle";
import logo from "@/assets/steer-away-high-resolution-logo-transparent.png";
import {
  logout,
  TUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { verifyToken } from "@/utils/verifyToken";
import { ReactElement, useEffect, useState } from "react";
import { adminRoutes } from "@/routes/admin.route";
import { userRoutes } from "@/routes/user.route";

type TRoute = {
  path: string;
  name?: string;
  element: ReactElement;
}[];

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(useCurrentToken);
  const [routes, setRoutes] = useState<TRoute>([]);
  const user = verifyToken(token as string) as TUser;

  useEffect(() => {
    if (token) {
      console.log({ user: user?.role });
      if (user?.role === "admin") {
        setRoutes(adminRoutes);
      } else {
        setRoutes(userRoutes);
      }
    }
  }, [token, user]);

  const activeClasses =
    "transition-all hover:text-foreground text-lg border bg-secondary border w-full pl-4 py-3 rounded border-primary";
  const inActiveClasses =
    "text-muted-foreground transition-colors text-lg hover:bg-orange-100 dark:hover:bg-orange-900 border w-full pl-4 py-3 rounded border-primary";

  return (
    <div className="sticky top-0 flex flex-col justify-center bg-background z-50 w-full md:w-[270px]">
      <header className="flex flex-row md:flex-col md:items-center gap-4 md:border-r bg-background py-4 md:py-8 px-2 md:min-h-screen">
        <div className="hidden md:flex flex-col items-center gap-8">
          <NavLink to="/" className="">
            <img
              className="max-w-[150px] w-full"
              src={logo}
              alt="Website Logo"
              loading="lazy"
            />
          </NavLink>
          <ModeToggle />
        </div>
        {/* navlinks for big devices */}
        <nav className="hidden md:flex-col gap-8 mt-4 text-lg font-medium md:flex md:w-[250px] md:items-center md:gap-3 md:text-sm lg:gap-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? activeClasses : inActiveClasses
            }
          >
            Home
          </NavLink>
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
                  {route.name}
                </NavLink>
              )
          )}
          <Button
            className="w-full text-lg py-6"
            onClick={() => dispatch(logout())}
          >
            Logout
          </Button>
        </nav>
        {/* navlinks for small devices */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <div className="flex flex-col items-center gap-4 text-lg font-semibold">
                <img
                  className="h-2/3 w-auto mx-auto"
                  src={logo}
                  alt="Website Logo"
                  loading="lazy"
                />
                <ModeToggle />
              </div>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? activeClasses : inActiveClasses
                }
              >
                Home
              </NavLink>
              {routes.map(
                (route, index) =>
                  route.path !== "" && (
                    <NavLink
                      key={index}
                      to={route.path}
                      className={({ isActive }) =>
                        isActive ? activeClasses : inActiveClasses
                      }
                    >
                      {route.name}
                    </NavLink>
                  )
              )}
              <Button
                className="w-full text-lg py-6"
                onClick={() => dispatch(logout())}
              >
                Logout
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </header>
    </div>
  );
};

export default Sidebar;
