import { Button } from "@/components/ui/button";
import {
  useCancelBookingMutation,
  useGetMyBookingsQuery,
} from "@/redux/features/booking/bookingApi";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const BookingManagement = () => {
  const {
    data: bookings,
    isFetching: isBookingFetching,
    isLoading: isBookingLoading,
  } = useGetMyBookingsQuery([
    {
      name: "sort",
      value: "-createdAt",
    },
    {
      name: "limit",
      value: 5,
    },
  ]);

  useEffect(() => {
    if (isBookingFetching || isBookingLoading) {
      toast.loading("Fetching Dashboard", { duration: 3000 });
    } else {
      toast.dismiss();
      toast.success("Dashboard Fetched Successfully", { duration: 1000 });
    }
  }, [isBookingFetching, isBookingLoading]);
  const [cancelBooking] = useCancelBookingMutation();

  const handleCancel = async (bookingId: string) => {
    const toastId = toast.loading("Cancel Booking....", { duration: 3000 });
    try {
      const res = await cancelBooking(bookingId).unwrap();
      toast.success(res.message, { id: toastId, duration: 2000 });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.data.message || "Something went wrong", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div className="px-6">
      <h1 className="text-2xl font-bold mb-8">Manage Bookings</h1>
      <div className="overflow-x-auto">
        <table className="w-full shadow-lg border rounded-md">
          <thead className="bg-secondary">
            <tr>
              <th className="px-4 py-2 text-left">Car</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Start Time</th>
              <th className="px-4 py-2 text-left">End Time</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Payment Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.data?.result?.length > 0 ? (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              bookings?.data?.result?.map((booking: any) => (
                <tr key={booking._id} className="border-b">
                  <td className="px-4 py-2">{booking.car.name}</td>
                  <td className="px-4 py-2">{booking.date}</td>
                  <td className="px-4 py-2">{booking.startTime}</td>
                  <td className="px-4 py-2">{booking.endTime || "N/A"}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`inline-block px-2 py-1 text-sm rounded ${
                        booking.status === "Pending"
                          ? "bg-yellow-200 text-yellow-800"
                          : booking.status === "Approved"
                          ? "bg-green-200 text-green-800"
                          : booking.status === "Cancelled"
                          ? "bg-red-200 text-red-800"
                          : "bg-blue-200 text-blue-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`inline-block px-2 py-1 text-sm rounded ${
                        booking.paymentStatus === "Paid"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {booking.paymentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    {booking.status === "Pending" && (
                      <>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleCancel(booking._id)}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                    {booking.status === "Returned" &&
                      booking.paymentStatus === "Pending" && (
                        <>
                          <Link to={`/user/payment-receipt/${booking._id}`} state={booking}>
                            <Button size="sm" variant="secondary">
                              Pay
                            </Button>
                          </Link>
                        </>
                      )}
                    {booking.status === "Approved" && (
                      <span className="text-gray-500">
                        Cannot cancel after approval
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-2 text-center">
                  No bookings available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingManagement;
