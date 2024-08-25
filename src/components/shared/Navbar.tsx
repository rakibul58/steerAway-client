import { Link, NavLink } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { ModeToggle } from "../theme/mode-toggle";
import logo from "@/assets/steer-away-high-resolution-logo-transparent.png";

const Navbar = () => {
  const activeClasses =
    "transition-colors hover:text-foreground font-bold text-primary";
  const inActiveClasses =
    "text-muted-foreground transition-colors hover:text-foreground";
  return (
    <div className="sticky top-0 flex flex-col justify-center bg-background z-50">
      <header className="flex md:justify-between items-center gap-4 border-b bg-background pt-2 pb-4">
        <div className="hidden md:block">
          <NavLink to="/" className="">
            <img
              className="max-w-[200px] w-full"
              src={logo}
              alt="Website Logo"
              loading="lazy"
            />
          </NavLink>
        </div>
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? activeClasses : inActiveClasses
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? activeClasses : inActiveClasses
            }
          >
            About
          </NavLink>
          <NavLink
            to="/booking"
            className={({ isActive }) =>
              isActive ? activeClasses : inActiveClasses
            }
          >
            Booking
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? activeClasses : inActiveClasses
            }
          >
            Contact
          </NavLink>
        </nav>
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
              <NavLink
                to="/"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <img
                  className="h-2/3 w-auto mx-auto"
                  src={logo}
                  alt="Website Logo"
                  loading="lazy"
                />
              </NavLink>
              {/* <div className="flex justify-center">
                <ModeToggle />
              </div> */}
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? activeClasses : inActiveClasses
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? activeClasses : inActiveClasses
                }
              >
                About
              </NavLink>
              <NavLink
                to="/booking"
                className={({ isActive }) =>
                  isActive ? activeClasses : inActiveClasses
                }
              >
                Booking
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? activeClasses : inActiveClasses
                }
              >
                Contact
              </NavLink>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex items-center gap-3">
            <div className="flex gap-6 flex-wrap">
              <Link to={"signIn"}>
                <Button>Sign In</Button>
              </Link>
              <ModeToggle />
            </div>
          </form>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
