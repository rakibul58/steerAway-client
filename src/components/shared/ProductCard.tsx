import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ICar } from "@/Types";

const ProductCard = ({ _id, name, images, description }: ICar) => {
  return (
    <div className="p-4">
      <div className="bg-secondary rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
        <img src={images[0]} alt={name} className="w-full h-48 object-cover" />
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-2">{name}</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {description.slice(0, 15) + "..."}
          </p>
          <div className="flex items-center justify-between">
            {/* <p className="text-orange-500 font-bold">৳{pricePerHour}/Hour</p> */}
            <Link to={`/car-details/${_id}`}>
              <Button size={"sm"}>Details</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
