/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Menu,
  ChevronDown,
  Car,
  Calendar,
  Phone,
  Zap,
  Filter,
  Settings,
  CarIcon,
} from "lucide-react";
import {
  logout,
  selectCurrentUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { motion, AnimatePresence } from "framer-motion";
import { useGetNavbarQuery } from "@/redux/features/cars/carApi";
import UserAvatarDropdown from "./AvatarDropDown";
import { useProfileQuery } from "@/redux/features/auth/authApi";

interface Brand {
  name: string;
  models: string[];
  totalCars: number;
}

interface FeaturedCar {
  _id: string;
  slug: string;
  image: string;
  name: string;
  brand: string;
  model: string;
  dailyRate: number;
}

interface FuelTypeIconProps {
  type: string;
}

const Navbar = () => {
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const { data: profile } = useProfileQuery(undefined);
  const { data: navbarData } = useGetNavbarQuery(undefined);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getFuelTypeIcon = ({ type }: FuelTypeIconProps): JSX.Element => {
    switch (type) {
      case "electric":
        return <Zap className="w-4 h-4" />;
      case "hybrid":
        return <Settings className="w-4 h-4" />;
      default:
        return <Car className="w-4 h-4" />;
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[100] w-full max-w-7xl
        mx-auto transition-all duration-300 ${
          isScrolled ? "bg-background" : "bg-background"
        }`}
    >
      {/* Top Bar */}
      <div className="hidden md:block bg-primary/10 px-4">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center text-sm py-2">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a
                  href="tel:+1234567890"
                  className="hover:text-primary transition-colors"
                >
                  +(880) 1850415714
                </a>
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Open 24/7</span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              {navbarData?.data?.carTypes.slice(0, 3).map((type: any) => (
                <Link
                  key={type.type}
                  to={`/car-listings?specifications.fuelType=${type.type}`}
                  className="flex items-center gap-1 text-sm hover:text-primary transition-colors"
                >
                  {getFuelTypeIcon(type.type)}
                  {type.type.charAt(0).toUpperCase() + type.type.slice(1)}
                  <span className="text-xs text-muted-foreground">
                    ({type.count})
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="w-full mx-auto px-4">
        <header
          className={`flex items-center mx-auto justify-between transition-all duration-300 ${
            isScrolled ? "py-2" : "py-4"
          }`}
        >
          <Link
            to="/"
            className="flex-shrink-0 flex gap-2 text-lg items-center font-bold text-primary"
          >
            <CarIcon />
            SteerAway
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${
                  isActive ? "text-primary font-bold" : "text-muted-foreground"
                } hover:text-primary transition-colors`
              }
            >
              Home
            </NavLink>

            {/* Brands Mega Menu */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveMegaMenu("brands")}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                Brands & Models
                <ChevronDown className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {activeMegaMenu === "brands" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 w-[800px] bg-white shadow-lg rounded-lg p-6"
                  >
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <h3 className="font-bold mb-4 text-primary">
                          Popular Brands
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          {navbarData?.data?.brands
                            .slice(0, 6)
                            .map((brand: Brand) => (
                              <div key={brand.name} className="space-y-2">
                                <Link
                                  to={`/car-listings?searchTerm=${brand.name.toLowerCase()}`}
                                  className="font-medium hover:text-primary transition-colors"
                                >
                                  {brand.name}
                                </Link>
                                <div className="pl-4 space-y-1">
                                  {brand.models
                                    .slice(0, 3)
                                    .map((model: string) => (
                                      <Link
                                        key={model}
                                        to={`/car-listings?searchTerm=${model.toLowerCase()}`}
                                        className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                                      >
                                        {model}
                                      </Link>
                                    ))}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold mb-4 text-primary">
                          Featured Cars
                        </h3>
                        <div className="space-y-4">
                          {navbarData?.data?.featuredCars.map(
                            (car: FeaturedCar) => (
                              <Link
                                key={car._id}
                                to={`/car-details/${car._id}`}
                                className="flex items-center gap-4 hover:bg-primary/5 p-2 rounded-lg transition-colors group"
                              >
                                <img
                                  src={car.image}
                                  alt={car.name}
                                  className="w-20 h-14 object-cover rounded-lg group-hover:shadow-md transition-shadow"
                                />
                                <div>
                                  <p className="font-medium group-hover:text-primary transition-colors">
                                    {car.brand} {car.model}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    From ${car.dailyRate}/day
                                  </p>
                                </div>
                              </Link>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t">
                      <Link
                        to="/car-listings"
                        className="text-primary hover:text-primary/80 flex items-center gap-2"
                      >
                        <Filter className="w-4 h-4" />
                        View all cars with filters
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${
                  isActive ? "text-primary font-bold" : "text-muted-foreground"
                } hover:text-primary transition-colors`
              }
            >
              About
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `${
                  isActive ? "text-primary font-bold" : "text-muted-foreground"
                } hover:text-primary transition-colors`
              }
            >
              Contact
            </NavLink>

            <NavLink
              to="/support"
              className={({ isActive }) =>
                `${
                  isActive ? "text-primary font-bold" : "text-muted-foreground"
                } hover:text-primary transition-colors`
              }
            >
              Support
            </NavLink>
          </nav>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]">
              <nav className="grid gap-6 text-lg mt-16">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "text-primary font-bold"
                        : "text-muted-foreground"
                    } hover:text-primary transition-colors`
                  }
                >
                  Home
                </NavLink>

                <div className="space-y-4">
                  <p className="font-bold">Popular Brands</p>
                  <div className="grid gap-2 pl-4">
                    {navbarData?.data?.brands
                      .slice(0, 6)
                      .map((brand: Brand) => (
                        <Link
                          key={brand.name}
                          to={`/cars/brand/${brand.name.toLowerCase()}`}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {brand.name} ({brand.totalCars})
                        </Link>
                      ))}
                  </div>
                </div>

                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "text-primary font-bold"
                        : "text-muted-foreground"
                    } hover:text-primary transition-colors`
                  }
                >
                  About
                </NavLink>

                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "text-primary font-bold"
                        : "text-muted-foreground"
                    } hover:text-primary transition-colors`
                  }
                >
                  Contact
                </NavLink>
                <NavLink
                  to="/support"
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "text-primary font-bold"
                        : "text-muted-foreground"
                    } hover:text-primary transition-colors`
                  }
                >
                  Support
                </NavLink>

                {token === null ? (
                  <Link to="/signIn">
                    <Button className="w-full">Sign In</Button>
                  </Link>
                ) : (
                  <UserAvatarDropdown
                    onLogout={() => dispatch(logout())}
                    role={user?.role as string}
                    user={profile?.data}
                  />
                )}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            {token === null ? (
              <>
                <Link to="/signIn">
                  <Button variant="outline">Sign In</Button>
                </Link>
                <Link to="/signUp">
                  <Button>Register</Button>
                </Link>
              </>
            ) : (
              <UserAvatarDropdown
                onLogout={() => dispatch(logout())}
                role={user?.role as string}
                user={profile?.data}
              />
            )}
          </div>
        </header>
      </div>
    </div>
  );
};

export default Navbar;
