/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  useDeleteCarMutation,
  useGetAllCarsQuery,
} from "@/redux/features/cars/carApi";
import CarListings from "@/components/Admin/CarListings";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const ManageCars = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const { data, isLoading, isFetching } = useGetAllCarsQuery([
    { name: "sort", value: "-createdAt" },
    { name: "page", value: page },
    { name: "limit", value: 5 },
    { name: "searchTerm", value: search },
  ]);

  const [deleteCar] = useDeleteCarMutation();

  useEffect(() => {
    if (isFetching || isLoading) {
      toast.loading("Fetching Cars", { duration: 3000 });
    } else {
      toast.dismiss();
      toast.success("Cars Fetched Successfully", { duration: 1000 });
    }
  }, [isFetching, isLoading]);

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Deleting Car....", { duration: 3000 });
    try {
      const res = await deleteCar(id).unwrap();
      toast.success(res.message, { id: toastId, duration: 2000 });
    } catch (err: any) {
      toast.error(err.data.message || "Something went wrong", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <section className="min-h-screen">
      <div className="px-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 lg:mb-0">
            Manage Cars
          </h1>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Search by name or brand"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            />

            <Link to="/admin/add-car">
              <Button>Add New Car</Button>
            </Link>
          </div>
        </div>

        <CarListings
          cars={data?.data?.result}
          handleDelete={handleDelete}
          totalPage={data?.data?.meta?.totalPage}
          page={page}
          setPage={setPage}
        />
      </div>
    </section>
  );
};

export default ManageCars;
