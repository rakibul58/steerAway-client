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

export interface ICarForm {
  _id: string;
  name: string;
  year: string;
  description: string;
  color: string;
  isElectric: boolean;
  features: string[];
  pricePerHour: number;
  carType?: string;
  image?: string;
  insurancePrice?: number;
  childSeatPrice?: number;
  gpsPrice?: number;
  status?: string;
}

const ManageCars = () => {
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, isFetching } = useGetAllCarsQuery([
    {
      name: "sort",
      value: "-createdAt",
    },
    {
      name: "page",
      value: page,
    },
    {
      name: "limit",
      value: 5,
    },
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
      console.log({res});
      toast.success(res.message, { id: toastId, duration: 2000 });
    } catch (err: any) {
      console.log({err});
      toast.error(err.data.message || "Something went wrong", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <section className="">
      <div className="px-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Cars</h1>
          <Link to={"/admin/add-car"}>
            <Button>Add New Car</Button>
          </Link>
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
