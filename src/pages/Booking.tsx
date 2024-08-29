import { Button } from "@/components/ui/button";
import { useGetSingleCarQuery } from "@/redux/features/cars/carApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";

interface IAdditionalFeatures {
  insurance: string;
  gps: boolean;
  childSeat: boolean;
}

export interface IBookingForm {
  carId: string;
  date: string;
  startTime: string;
  additionalFeatures: IAdditionalFeatures;
  nidOrPassport: string;
  drivingLicense: string;
}

const Booking = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const { data } = useGetSingleCarQuery(id as string);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBookingForm>();

  const onSubmit: SubmitHandler<IBookingForm> = (data) => {
    // Pass the form data to the confirmation page via state
    const bookingData = {...data, carId: id}
    // console.log({bookingData});
    navigate(`/booking-confirmation/${id}`, { state: bookingData });
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-6 lg:px-12">
        <h1 className="text-3xl font-bold mb-8">Complete Your Booking</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="nidOrPassport" className="block mb-2 font-medium">
                NID/Passport Number
              </label>
              <input
                id="nidOrPassport"
                {...register("nidOrPassport", {
                  required: "NID/Passport is required",
                })}
                placeholder="Enter your NID or Passport number"
                className="py-3 px-4 w-full rounded-sm bg-secondary shadow-md"
              />
              {errors.nidOrPassport && (
                <span className="text-destructive mt-1">
                  {errors.nidOrPassport.message}
                </span>
              )}
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
                className="py-3 px-4 w-full rounded-sm bg-secondary shadow-md"
              />
              {errors.drivingLicense && (
                <span className="text-destructive mt-1">
                  {errors.drivingLicense.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="date" className="block mb-2 font-medium">
                Date
              </label>
              <input
                type="date"
                id="date"
                {...register("date", {
                  required: "Date is required",
                })}
                placeholder="Enter Date"
                className="py-3 px-4 w-full rounded-sm bg-secondary shadow-md"
              />
              {errors.date && (
                <span className="text-destructive mt-1">
                  {errors.date.message}
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor="drivingLicense"
                className="block mb-2 font-medium"
              >
                Start Time
              </label>
              <input
                id="startTime"
                type="time"
                {...register("startTime", {
                  required: "Start Time is required",
                })}
                placeholder="Enter your Start Time"
                className="py-3 px-4 w-full rounded-sm bg-secondary shadow-md"
              />
              {errors.startTime && (
                <span className="text-destructive mt-1">
                  {errors.startTime.message}
                </span>
              )}
            </div>
          </div>

          {/* Additional Options */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Additional Options</h2>
            <label className="flex items-center">
              <input
                type="checkbox"
                defaultChecked={state.insurance}
                {...register("additionalFeatures.insurance")}
                className="mr-2"
              />
              <span>Insurance (+৳{data?.data?.insurancePrice})</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                defaultChecked={state.gps}
                {...register("additionalFeatures.gps")}
                className="mr-2"
              />
              <span>GPS (+৳{data?.data?.gpsPrice})</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                defaultChecked={state.childSeat}
                {...register("additionalFeatures.childSeat")}
                className="mr-2"
              />
              <span>Child Seat (+৳{data?.data?.childSeatPrice})</span>
            </label>
          </div>

          {/* Submit Button */}
          <Button type="submit" size="lg" className="w-full mt-8">
            Proceed to Confirmation
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Booking;
