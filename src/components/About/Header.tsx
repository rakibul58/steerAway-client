import { Button } from "../ui/button";

import img from "@/assets/headerImg3.jpg";
import { FormEvent, useState } from "react";
import { DatePicker } from "../shared/DatePicker";
import { LocationPicker } from "../shared/LocationPicker";
import { Link } from "react-router-dom";

const Header = () => {
  const [date, setDate] = useState<Date>();
  const [location, setLocation] = useState<string | undefined>();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log({ date, location });
    // Handle form submission logic here
  };

  return (
    <div
      className="relative w-full h-[85vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="text-center max-w-lg">
          <h1 className="text-5xl font-extrabold mb-4 text-white">
            <span className="text-primary">Steer Away</span> Car Rentals
          </h1>
          {/* Subtitle */}
          <h2 className="text-xl text-gray-200 mb-8">
            Discover the freedom of the open road with our top-rated vehicles.
          </h2>
          <Link to={"/car-listings"}>
            <Button className="px-6 py-3 text-lg rounded mb-8">Book Now</Button>
          </Link>
          <form
            className="px-2 md:px-0 flex flex-col sm:flex-row gap-4 justify-center"
            onSubmit={handleSubmit}
          >
            <div className="relative w-full sm:w-auto">
              <LocationPicker value={location} setValue={setLocation} />
            </div>

            <div className="relative w-full sm:w-auto">
              <DatePicker date={date} setDate={setDate} />
            </div>

            <Link to={"/car-listings"}>
              {" "}
              <Button
                type="submit"
                variant={"outline"}
                className="text-primary"
              >
                Search
              </Button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Header;
