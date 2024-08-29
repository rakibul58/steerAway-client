import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import axios from "axios";

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

const carTypes = [
  "Sedan",
  "SUV",
  "Hatchback",
  "Coupe",
  "Convertible",
  "Minivan",
  "Truck",
];

const ManageCars = () => {
  const [cars, setCars] = useState<ICarForm[]>([]);
  const [selectedCar, setSelectedCar] = useState<ICarForm | null>(null);
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ICarForm>();

  useEffect(() => {
    // Fetch cars from the API
    const fetchCars = async () => {
      try {
        const response = await axios.get("/api/cars");
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, []);

  const handleImageUpload = async (): Promise<string | null> => {
    if (!imageUpload) return null;
    const formData = new FormData();
    formData.append("file", imageUpload);
    formData.append("upload_preset", "your_upload_preset"); // Replace with your Cloudinary upload preset

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", // Replace with your Cloudinary details
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const onSubmit: SubmitHandler<ICarForm> = async (data) => {
    const imageUrl = await handleImageUpload();
    const carData = { ...data, image: imageUrl || selectedCar?.image };

    try {
      if (selectedCar) {
        // Update car
        await axios.put(`/api/cars/${selectedCar.name}`, carData);
        setCars((prev) =>
          prev.map((car) => (car.name === selectedCar.name ? carData : car))
        );
      } else {
        // Add new car
        const response = await axios.post("/api/cars", carData);
        setCars((prev) => [...prev, response.data]);
      }
      reset();
      setSelectedCar(null);
      setImageUpload(null);
    } catch (error) {
      console.error("Error saving car:", error);
    }
  };

  const handleEdit = (car: ICarForm) => {
    setSelectedCar(car);
    setValue("name", car.name);
    setValue("year", car.year);
    setValue("description", car.description);
    setValue("color", car.color);
    setValue("isElectric", car.isElectric);
    setValue("features", car.features);
    setValue("pricePerHour", car.pricePerHour);
    setValue("carType", car.carType);
    setValue("insurancePrice", car.insurancePrice || 50);
    setValue("childSeatPrice", car.childSeatPrice || 50);
    setValue("gpsPrice", car.gpsPrice || 50);
  };

  const handleDelete = async (carName: string) => {
    try {
      await axios.delete(`/api/cars/${carName}`);
      setCars((prev) => prev.filter((car) => car.name !== carName));
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  return (
    <section className="">
      <div className="px-6">
        <h1 className="text-2xl font-bold mb-8">Manage Cars</h1>

        {/* Add/Update Car Form */}
        {/* <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mb-12">
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
                <option value="true">Yes</option>
                <option value="false">No</option>
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
                {carTypes.map((type) => (
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
                setValueAs: (v) => v.split(",").map((f) => f.trim()),
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
                id="pricePerHour"
                {...register("pricePerHour", {
                  required: "Price per hour is required",
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
                {...register("insurancePrice")}
                placeholder="Enter insurance price"
                className="py-3 px-4 w-full rounded-sm bg-secondary shadow-md"
              />
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
                {...register("childSeatPrice")}
                placeholder="Enter child seat price"
                className="py-3 px-4 w-full rounded-sm bg-secondary shadow-md"
              />
            </div>

            <div>
              <label htmlFor="gpsPrice" className="block mb-2 font-medium">
                GPS Price
              </label>
              <input
                id="gpsPrice"
                {...register("gpsPrice")}
                placeholder="Enter GPS price"
                className="py-3 px-4 w-full rounded-sm bg-secondary shadow-md"
              />
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
            {selectedCar ? "Update Car" : "Add Car"}
          </Button>
        </form> */}

        {/* Car List */}
        {/* <div>
          <h2 className="text-2xl font-semibold mb-4">Car Listings</h2>
          {cars.length > 0 ? (
            <div className="space-y-4">
              {cars.map((car) => (
                <div
                  key={car.name}
                  className="bg-white p-6 rounded-lg shadow-md flex justify-between"
                >
                  <div>
                    <h3 className="text-xl font-bold">{car.name}</h3>
                    <p className="text-gray-600">{car.year}</p>
                    <p className="text-gray-600">{car.description}</p>
                    <p className="text-gray-600">Color: {car.color}</p>
                    <p className="text-gray-600">
                      Price Per Hour: ${car.pricePerHour}
                    </p>
                    <p className="text-gray-600">Car Type: {car.carType}</p>
                  </div>
                  <div className="flex space-x-4">
                    <Button onClick={() => handleEdit(car)}>Edit</Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(car.name)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No cars available. Add new cars to the list.</p>
          )}
        </div> */}
      </div>
    </section>
  );
};

export default ManageCars;
