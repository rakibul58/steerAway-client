import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useGetSingleCarQuery } from "@/redux/features/cars/carApi";
import { toast } from "sonner";
import { useBookCarMutation } from "@/redux/features/booking/bookingApi";

const BookingConfirmation = () => {
  const { state: bookingDetails } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useGetSingleCarQuery(id as string);
  const [bookCar] = useBookCarMutation();

  if (!bookingDetails) {
    return <div>No booking details available.</div>;
  }

  const handleConfirmBooking = async () => {
    const toastId = toast.loading("Booking...");
    try {
      const res = await bookCar(bookingDetails).unwrap();
      toast.success(res.message, { id: toastId, duration: 2000 });
      navigate(`/`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.data.message || "Something went wrong", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-6 lg:px-12">
        <h1 className="text-3xl font-bold mb-8">Confirm Your Booking</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-semibold">Car Details</h2>
            <p>Car: {data?.data?.name}</p>
            <p>Price: ৳{data?.data?.pricePerHour}/Hour</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">Personal Details</h2>
            <p>NID/Passport Number: {bookingDetails.nidOrPassport}</p>
            <p>Driving License: {bookingDetails.drivingLicense}</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">Booking Timings</h2>
            <p>Date: {bookingDetails.date}</p>
            <p>Start Time: {bookingDetails.startTime}</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">Additional Options</h2>
            <p>
              Insurance:{" "}
              {bookingDetails.additionalFeatures.insurance == true
                ? "Yes"
                : "No"}
            </p>
            <p>
              GPS:{" "}
              {bookingDetails.additionalFeatures.gps == true ? "Yes" : "No"}
            </p>
            <p>
              Child Seat:{" "}
              {bookingDetails.additionalFeatures.childSeat == true
                ? "Yes"
                : "No"}
            </p>
          </div>
        </div>
        <Button
          onClick={handleConfirmBooking}
          size="lg"
          className="w-full mt-8"
        >
          Confirm and Book Now
        </Button>
      </div>
    </section>
  );
};

export default BookingConfirmation;
