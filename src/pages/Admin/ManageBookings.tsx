/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  useGetAllBookingsQuery,
  useUpdateBookingStatusMutation,
} from "@/redux/features/booking/bookingApi";
import Pagination from "@/components/shared/Pagination";
import { toast } from "sonner";

const ManageBookings = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const {
    data: bookings,
    isFetching,
    isLoading,
  } = useGetAllBookingsQuery([
    { name: "sort", value: "-createdAt" },
    { name: "limit", value: 5 },
    { name: "page", value: page },
    { name: "searchTerm", value: search },
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
            Manage Bookings
          </h1>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Search by user or car"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>

        <div className="w-full">
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="w-full table-auto text-left">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-sm font-medium text-gray-600">User</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-600">Car</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-600">Date</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-600">Start Time</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-600">Status</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings?.data?.result?.length > 0 ? (
                  bookings.data.result.map((booking: any) => (
                    <tr key={booking._id} className="border-b">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium">{booking.user.name}</p>
                          <p className="text-sm text-gray-600">{booking.user.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium">{booking.car.name}</p>
                          <p className="text-sm text-gray-600">{booking.car.brand}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">{booking.date}</td>
                      <td className="px-6 py-4">{booking.startTime}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-xs rounded-full ${
                            booking.status === "Approved"
                              ? "bg-green-200 text-green-800"
                              : booking.status === "Cancelled"
                              ? "bg-red-200 text-red-800"
                              : booking.status === "Pending"
                              ? "bg-yellow-200 text-yellow-800"
                              : "bg-blue-200 text-blue-800"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {booking.status === "Pending" && (
                          <div className="flex flex-col space-y-2">
                            <Button
                              size="sm"
                              className="w-full"
                              onClick={() => handleApprove(booking._id)}
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="w-full"
                              onClick={() => handleCancel(booking._id)}
                            >
                              Cancel
                            </Button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center">
                      No bookings available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {bookings?.data?.result?.length > 0 && (
            <div className="mt-6">
              <Pagination
                totalPage={bookings.data.meta.totalPage}
                page={page}
                setPage={setPage}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ManageBookings;