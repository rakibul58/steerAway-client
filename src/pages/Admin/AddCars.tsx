/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CarTypes } from "@/Constants/Car";
import { toast } from "sonner";
import { useAddCarMutation } from "@/redux/features/cars/carApi";

interface ICarForm {
  name: string;
  year: string;
  description: string;
  color: string;
  isElectric: boolean;
  features: string[];
  pricePerHour: number;
  carType: string;
  image?: string;
  insurancePrice?: number;
  childSeatPrice?: number;
  gpsPrice?: number;
}

const AddCars = () => {
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICarForm>();
  const [addCar] = useAddCarMutation();

  const handleImageUpload = async (): Promise<string | null> => {
    if (!imageUpload) return null;
    const formData = new FormData();
    formData.append("file", imageUpload);
    formData.append(
      "upload_preset",
      `${import.meta.env.VITE_CLOUDINARY_PRESET}`
    );
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_CLOUDINARY_URI}`,
        formData
      );
      return response.data.secure_url;
    } catch (error: any) {
      toast.error(error.message || "Failed Upload Image....", {
        duration: 3000,
      });
      return null;
    }
  };

  const onSubmit: SubmitHandler<ICarForm> = async (data) => {
    const toastId = toast.loading("Adding Car....", { duration: 3000 });
    const imageUrl = await handleImageUpload();
    const carData = {
      ...data,
      image: imageUrl,
      isElectric: data?.isElectric == true,
    };
    try {
      const res = await addCar(carData).unwrap();
      toast.success(res.message, { id: toastId, duration: 2000 });
      navigate("/admin/manage-car");
    } catch (err: any) {
      toast.error(err.data.message || "Something went wrong", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <section className="px-6">
      <div className="container mx-auto px-6 lg:px-12">
        <h1 className="text-3xl font-bold mb-8">Add New Car</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name" className="block mb-2 font-medium">
              Car Name/Model
            </label>
            <input
              id="name"
              {...register("name", { required: "Car name is required" })}
              placeholder="Enter car name or model"
              className="py-3 px-4 w-full rounded-sm bg-secondary shadow-md"
            />
            {errors.name && (
              <span className="text-destructive">{errors.name.message}</span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="year" className="block mb-2 font-medium">
                Year
              </label>
              <input
                id="year"
                {...register("year", { required: "Year is required" })}
                placeholder="Enter year"
                className="py-3 px-4 w-full rounded-sm bg-secondary shadow-md"
              />
              {errors.year && (
                <span className="text-destructive">{errors.year.message}</span>
              )}
            </div>

            <div>
              <label htmlFor="color" className="block mb-2 font-medium">
                Color
              </label>
              <input
                id="color"
                {...register("color", { required: "Color is required" })}
                placeholder="Enter color"
                className="py-3 px-4 w-full rounded-sm bg-secondary shadow-md"
              />
              {errors.color && (
                <span className="text-destructive">{errors.color.message}</span>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block mb-2 font-medium">
              Description
            </label>
            <textarea
              id="description"
              {...register("description", {
                required: "Description is required",
              })}
              placeholder="Enter car description"
              className="py-3 px-4 w-full rounded-sm bg-secondary shadow-md"
            />
            {errors.description && (
              <span className="text-destructive">
                {errors.description.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="isElectric" className="block mb-2 font-medium">
                Is Electric?
              </label>
              <select
                id="isElectric"
                {...register("isElectric", {
                  required: "Please select if the car is electric",
                })}
                className="py-3 px-4 w-full rounded-sm bg-secondary shadow-md"
              >
                <option value={"true"}>Yes</option>
                <option value={"false"}>No</option>
              </select>
              {errors.isElectric && (
                <span className="text-destructive">
                  {errors.isElectric.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="carType" className="block mb-2 font-medium">
                Car Type
              </label>
              <select
                id="carType"
                {...register("carType", {
                  required: "Please select a car type",
                })}
                className="py-3 px-4 w-full rounded-sm bg-secondary shadow-md"
              >
                <option value="">Select Car Type</option>
                {CarTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.carType && (
                <span className="text-destructive">
                  {errors.carType.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="features" className="block mb-2 font-medium">
              Features (comma-separated)
            </label>
            <input
              id="features"
              {...register("features", {
                required: "Features are required",
                setValueAs: (v) => v.split(",").map((f: any) => f.trim()),
              })}
              placeholder="Enter features"
              className="py-3 px-4 w-full rounded-sm bg-secondary shadow-md"
            />
            {errors.features && (
              <span className="text-destructive">
                {errors.features.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="pricePerHour" className="block mb-2 font-medium">
                Price Per Hour
              </label>
              <input
                type="number"
                id="pricePerHour"
                {...register("pricePerHour", {
                  required: "Price per hour is required",
                  valueAsNumber: true,
                })}
                placeholder="Enter price per hour"
                className="py-3 px-4 w-full rounded-sm bg-secondary shadow-md"
              />
              {errors.pricePerHour && (
                <span className="text-destructive">
                  {errors.pricePerHour.message}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label
                htmlFor="insurancePrice"
                className="block mb-2 font-medium"
              >
                Insurance Price
              </label>
              <input
                id="insurancePrice"
                {...register("insurancePrice", {
                  required: "Insurance price is required",
                  valueAsNumber: true,
                })}
                placeholder="Enter insurance price"
                className="py-3 px-4 w-full rounded-sm bg-secondary shadow-md"
              />
              {errors.insurancePrice && (
                <span className="text-destructive">
                  {errors.insurancePrice.message}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="childSeatPrice"
                className="block mb-2 font-medium"
              >
                Child Seat Price
              </label>
              <input
                id="childSeatPrice"
                type="number"
                {...register("childSeatPrice", {
                  required: "Child Seat Price is required",
                  valueAsNumber: true,
                })}
                placeholder="Enter child seat price"
                className="py-3 px-4 w-full rounded-sm bg-secondary shadow-md"
              />
              {errors.childSeatPrice && (
                <span className="text-destructive">
                  {errors.childSeatPrice.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="gpsPrice" className="block mb-2 font-medium">
                GPS Price
              </label>
              <input
                id="gpsPrice"
                type="number"
                {...register("gpsPrice", {
                  required: "Gps Price is required",
                  valueAsNumber: true,
                })}
                placeholder="Enter GPS price"
                className="py-3 px-4 w-full rounded-sm bg-secondary shadow-md"
              />
              {errors.gpsPrice && (
                <span className="text-destructive">
                  {errors.gpsPrice.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="image" className="block mb-2 font-medium">
              Car Image
            </label>
            <input
              type="file"
              accept="image/*"
              id="image"
              onChange={(e) => setImageUpload(e.target.files?.[0] || null)}
              className="py-3 px-4 w-full rounded-sm bg-secondary shadow-md"
            />
          </div>

          <Button type="submit" size="lg" className="w-full">
            Add Car
          </Button>
        </form>
      </div>
    </section>
  );
};

export default AddCars;
