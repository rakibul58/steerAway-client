/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useGetSingleCarQuery } from "@/redux/features/cars/carApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { StarIcon, CheckIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBookCarMutation } from "@/redux/features/booking/bookingApi";
import { toast } from "sonner";

interface IAdditionalFeatures {
  insurance: boolean;
  gps: boolean;
  childSeat: boolean;
}

interface IBookingForm {
  date: string;
  startTime: string;
  duration: "hourly" | "daily" | "weekly" | "monthly";
  additionalFeatures: IAdditionalFeatures;
  nidOrPassport: string;
  drivingLicense: string;
}

const Booking = () => {
  const { id } = useParams();
  const { data: carData } = useGetSingleCarQuery(id as string);
  const [selectedImage, setSelectedImage] = useState(
    carData?.data?.images?.[0] || ""
  );
  const [bookCar] = useBookCarMutation();

  const { register, handleSubmit, watch } = useForm<IBookingForm>({
    defaultValues: {
      duration: "hourly",
      additionalFeatures: {
        insurance: false,
        gps: false,
        childSeat: false,
      },
    },
  });

  const calculateBaseCost = (duration: string) => {
    const basePrice = carData?.data?.pricing?.basePrice || 0;
    switch (duration) {
      case "hourly":
        return basePrice;
      case "daily":
        return basePrice * 24;
      case "weekly":
        return basePrice * 24 * 7;
      case "monthly":
        return basePrice * 24 * 30;
      default:
        return basePrice;
    }
  };

  const calculateTotalCost = (formData: any) => {
    const baseCost = calculateBaseCost(formData.duration);
    const additionalCosts =
      (formData.additionalFeatures.insurance
        ? carData?.data?.pricing?.insurancePrice
        : 0) +
      (formData.additionalFeatures.gps ? carData?.data?.pricing?.gpsPrice : 0) +
      (formData.additionalFeatures.childSeat
        ? carData?.data?.pricing?.childSeatPrice
        : 0);

    return baseCost + additionalCosts;
  };

  const onSubmit: SubmitHandler<IBookingForm> = async (formData) => {
    const bookingData = {
      ...formData,
      carId: id,
    };

    const toastId = toast.loading("Booking...", { duration: 3000 });
    try {
      const res = await bookCar(bookingData).unwrap();
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
    <section className="py-16 mt-12 md:mt-24">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Car Details Header */}
        <div className="flex justify-between flex-wrap items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">{carData?.data?.name}</h1>
            <p className="text-lg text-gray-600">
              {carData?.data?.brand} {carData?.data?.model}{" "}
              {carData?.data?.year}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">
              ${carData?.data?.pricing?.basePrice}/hour
            </p>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className={`w-5 h-5 ${
                      star <= (carData?.data?.ratingStats?.averageRating || 0)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span>
                ({carData?.data?.ratingStats?.totalRatings || 0} reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Car Details and Images */}
          <div className="lg:col-span-2">
            <img
              src={selectedImage}
              alt={carData?.data?.name}
              className="w-full h-96 object-cover rounded-lg mb-4"
            />
            <div className="grid grid-cols-4 gap-4 mb-6">
              {carData?.data?.images?.map((image: string, index: number) => (
                <img
                  key={index}
                  src={image}
                  alt={`${carData?.data?.name} view ${index + 1}`}
                  className={`w-full h-24 object-cover rounded-lg cursor-pointer ${
                    selectedImage === image ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </div>

            <Card className="p-6 mb-6">
              <Tabs defaultValue="specs">
                <TabsList className="w-full">
                  <TabsTrigger value="specs" className="w-full">
                    Specifications
                  </TabsTrigger>
                  <TabsTrigger value="features" className="w-full">
                    Features
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="specs">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Transmission</span>
                        <span className="font-semibold">
                          {carData?.data?.specifications?.transmission}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fuel Type</span>
                        <span className="font-semibold">
                          {carData?.data?.specifications?.fuelType}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Seating</span>
                        <span className="font-semibold">
                          {carData?.data?.specifications?.seatingCapacity} seats
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Mileage</span>
                        <span className="font-semibold">
                          {carData?.data?.specifications?.mileage} km/l
                        </span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="features">
                  <div className="grid grid-cols-2 gap-2">
                    {carData?.data?.features?.map(
                      (feature: string, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckIcon className="w-4 h-4 text-green-500" />
                          <span>{feature}</span>
                        </div>
                      )
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Right Column - Booking Form */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Booking Details</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="duration"
                      className="block mb-2 font-medium"
                    >
                      Rental Duration
                    </label>
                    <select
                      id="duration"
                      {...register("duration", {
                        required: "Duration is required",
                      })}
                      className="py-3 px-4 w-full rounded-lg bg-secondary"
                    >
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="date" className="block mb-2 font-medium">
                        Start Date
                      </label>
                      <input
                        type="date"
                        id="date"
                        {...register("date", {
                          required: "Date is required",
                        })}
                        className="py-3 px-4 w-full rounded-lg bg-secondary"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="startTime"
                        className="block mb-2 font-medium"
                      >
                        Start Time
                      </label>
                      <input
                        type="time"
                        id="startTime"
                        {...register("startTime", {
                          required: "Start time is required",
                        })}
                        className="py-3 px-4 w-full rounded-lg bg-secondary"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="nidOrPassport"
                      className="block mb-2 font-medium"
                    >
                      NID/Passport Number
                    </label>
                    <input
                      id="nidOrPassport"
                      {...register("nidOrPassport", {
                        required: "NID/Passport is required",
                      })}
                      placeholder="Enter your NID or Passport number"
                      className="py-3 px-4 w-full rounded-lg bg-secondary"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="drivingLicense"
                      className="block mb-2 font-medium"
                    >
                      Driving License
                    </label>
                    <input
                      id="drivingLicense"
                      {...register("drivingLicense", {
                        required: "Driving License is required",
                      })}
                      placeholder="Enter your Driving License number"
                      className="py-3 px-4 w-full rounded-lg bg-secondary"
                    />
                  </div>
                </div>

                {/* Additional Features */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Additional Features</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        {...register("additionalFeatures.insurance")}
                        className="w-4 h-4"
                      />
                      <span>
                        Insurance (+${carData?.data?.pricing?.insurancePrice})
                      </span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        {...register("additionalFeatures.gps")}
                        className="w-4 h-4"
                      />
                      <span>GPS (+${carData?.data?.pricing?.gpsPrice})</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        {...register("additionalFeatures.childSeat")}
                        className="w-4 h-4"
                      />
                      <span>
                        Child Seat (+${carData?.data?.pricing?.childSeatPrice})
                      </span>
                    </label>
                  </div>
                </div>

                {/* Cost Summary */}
                <Card className="p-4 bg-secondary">
                  <h3 className="text-lg font-semibold mb-3">Cost Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Base Rate:</span>
                      <span>${calculateBaseCost(watch("duration"))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Additional Features:</span>
                      <span>
                        $
                        {(watch("additionalFeatures.insurance")
                          ? carData?.data?.pricing?.insurancePrice
                          : 0) +
                          (watch("additionalFeatures.gps")
                            ? carData?.data?.pricing?.gpsPrice
                            : 0) +
                          (watch("additionalFeatures.childSeat")
                            ? carData?.data?.pricing?.childSeatPrice
                            : 0)}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-2 border-t">
                      <span>Total:</span>
                      <span>${calculateTotalCost(watch())}</span>
                    </div>
                  </div>
                </Card>

                <Button type="submit" size="lg" className="w-full">
                  Proceed to Confirmation
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
