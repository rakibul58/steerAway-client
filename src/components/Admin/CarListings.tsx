import { ICarForm } from "@/pages/Admin/ManageCars";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import Pagination from "../shared/Pagination";

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
      <h2 className="text-2xl font-semibold mb-4">Car Listings</h2>
      <div className="overflow-x-auto">
        <table className="w-full shadow-lg border rounded-md">
          <thead className="bg-secondary">
            <tr>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Name/Model</th>
              <th className="px-4 py-2 text-left">Year</th>
              <th className="px-4 py-2 text-left">Color</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Price Per Hour</th>
              <th className="px-4 py-2 text-left">Car Type</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars?.length > 0 ? (
              cars?.map((car) => (
                <tr key={car?.name} className="border-b">
                  <td className="px-4 py-2">
                    <img
                      src={car?.image}
                      alt={car?.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-2">{car.name}</td>
                  <td className="px-4 py-2">{car.year || "N/A"}</td>
                  <td className="px-4 py-2">{car.color || "N/A"}</td>
                  <td className="px-4 py-2">
                    <div
                      className={`inline-block px-2 py-1 text-sm rounded ${
                        car.status === "available"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {car.status?.charAt(0).toLocaleUpperCase()}{car.status?.slice(1)}
                    </div>
                  </td>
                  <td className="px-4 py-2">৳{car.pricePerHour || "N/A"}</td>
                  <td className="px-4 py-2">{car.carType || "N/A"}</td>
                  <td className="px-4 py-2 space-x-0 lg:space-x-2 space-y-2">
                    <Link to={`/admin/edit-car/${car._id}`} className="">
                      <Button size="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </svg>
                      </Button>
                    </Link>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => handleDelete(car._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-4 py-2 text-center">
                  No cars available. Add new cars to the list.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="mt-5 flex justify-center">
          {cars && cars?.length && (
            <Pagination totalPage={totalPage} page={page} setPage={setPage} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CarListings;
