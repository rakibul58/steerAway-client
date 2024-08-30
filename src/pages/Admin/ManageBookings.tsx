import Pagination from "@/components/shared/Pagination";
import { Button } from "@/components/ui/button";
import {
  useGetAllBookingsQuery,
  useUpdateBookingStatusMutation,
} from "@/redux/features/booking/bookingApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ManageBookings = () => {
  const [page, setPage] = useState(1);
  const {
    data: bookings,
    isFetching,
    isLoading,
  } = useGetAllBookingsQuery([
    {
      name: "sort",
      value: "-createdAt",
    },
    {
      name: "limit",
      value: 5,
    },
    {
      name: "page",
      value: page,
    },
  ]);
  const [updateBookingStatus] = useUpdateBookingStatusMutation();

  useEffect(() => {
    if (isFetching || isLoading) {
      toast.loading("Fetching Bookings", { duration: 3000 });
    } else {
      toast.dismiss();
      toast.success("Bookings Fetched Successfully", { duration: 1000 });
    }
  }, [isFetching, isLoading]);

  const handleApprove = async (bookingId: string) => {
    const toastId = toast.loading("Approving Booking....", { duration: 3000 });
    try {
      const res = await updateBookingStatus({
        id: bookingId,
        data: { status: "Approved" },
      }).unwrap();
      toast.success(res.message, { id: toastId, duration: 2000 });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.data.message || "Something went wrong", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  const handleCancel = async (bookingId: string) => {
    const toastId = toast.loading("Cancelling Booking....", { duration: 3000 });
    try {
      const res = await updateBookingStatus({
        id: bookingId,
        data: { status: "Cancelled" },
      }).unwrap();
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
    <section className="">
      <div className="px-6">
        <h1 className="text-3xl font-bold mb-8">Manage Bookings</h1>
        <div className="overflow-x-auto">
          <table className="w-full shadow-lg border rounded-md">
            <thead className="bg-secondary">
              <tr>
                <th className="px-4 py-2 text-left">User</th>
                <th className="px-4 py-2 text-left">Car</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Start Time</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings?.data?.result?.length > 0 ? (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                bookings?.data?.result?.map((booking: Record<string, any>) => (
                  <tr key={booking._id} className="border-b">
                    <td className="px-4 py-2">{booking.user.name}</td>
                    <td className="px-4 py-2">{booking.car.name}</td>
                    <td className="px-4 py-2">{booking.date}</td>
                    <td className="px-4 py-2">{booking.startTime}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`inline-block px-2 py-1 text-sm rounded ${
                          booking.status === "Approved"
                            ? "bg-green-200 text-green-800"
                            : booking.status === "Cancelled"
                            ? "bg-red-200 text-red-800"
                            : booking.status === "Pending" ? "bg-yellow-200 text-yellow-800":
                            "bg-blue-200 text-blue-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 space-x-2 space-y-2">
                      {booking.status === "Pending" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleApprove(booking._id)}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleCancel(booking._id)}
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-4 py-2 text-center">
                    No bookings available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-5 flex justify-center">
          {bookings && bookings?.data?.result?.length && (
            <Pagination
              totalPage={bookings?.data?.meta?.totalPage}
              page={page}
              setPage={setPage}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default ManageBookings;
