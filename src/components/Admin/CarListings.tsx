import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import Pagination from "../shared/Pagination";

interface ICarForm {
  _id: string;
  name: string;
  brand: string;
  year: number;
  color: string;
  status: "available" | "unavailable";
  pricing: {
    hourlyRate: number;
    dailyRate: number;
  };
  specifications: {
    transmission: string;
    fuelType: string;
    seatingCapacity: number;
  };
  features: string[];
  images: string[];
}

interface CarListingProps {
  cars: ICarForm[];
  handleDelete: (id: string) => void;
  page: number;
  totalPage: number;
  setPage: (page: number) => void;
}

const CarListings = ({
  cars,
  handleDelete,
  totalPage,
  page,
  setPage,
}: CarListingProps) => {
  return (
    <div className="w-full">
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="w-full table-auto text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">
                Image
              </th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">
                Name/Model
              </th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">
                Year
              </th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">
                Color
              </th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">
                Status
              </th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">
                Hourly Rate
              </th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">
                Daily Rate
              </th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">
                Specifications
              </th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">
                Features
              </th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {cars?.length > 0 ? (
              cars.map((car) => (
                <tr key={car._id} className="border-b">
                  <td className="px-6 py-4">
                    <img
                      src={car.images[0]}
                      alt={car.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">{car.name}</p>
                      <p className="text-sm text-gray-600">
                        {car.brand || "N/A"}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">{car.year || "N/A"}</td>
                  <td className="px-6 py-4">{car.color || "N/A"}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        car.status === "available"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {car.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    ${car.pricing?.hourlyRate || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    ${car.pricing?.dailyRate || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p>
                        Transmission:{" "}
                        {car.specifications?.transmission || "N/A"}
                      </p>
                      <p>Fuel: {car.specifications?.fuelType || "N/A"}</p>
                      <p>
                        Seats: {car.specifications?.seatingCapacity || "N/A"}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {car.features?.length > 0 ? (
                      <ul className="list-disc list-inside text-sm">
                        {car.features.slice(0, 3).map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                        {car.features.length > 3 && <li>+ more</li>}
                      </ul>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="px-6 py-4 flex flex-col space-y-2">
                    <Link className="w-full" to={`/admin/edit-car/${car._id}`}>
                      <Button className="w-full" size="sm">Edit</Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(car._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="px-6 py-4 text-center">
                  No cars found. Add new cars to the list.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {cars?.length > 0 && (
        <div className="mt-6">
          <Pagination totalPage={totalPage} page={page} setPage={setPage} />
        </div>
      )}
    </div>
  );
};

export default CarListings;
