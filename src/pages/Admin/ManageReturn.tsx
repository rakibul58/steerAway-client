/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Pagination from "@/components/shared/Pagination";
import { useGetAllBookingsQuery } from "@/redux/features/booking/bookingApi";
import { useReturnCarMutation } from "@/redux/features/cars/carApi";
import { toast } from "sonner";

const ManageReturn = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState("");
  const [endTime, setEndTime] = useState("");
  const [endDate, setEndDate] = useState("");

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

  const [returnCar] = useReturnCarMutation();

  useEffect(() => {
    if (isFetching || isLoading) {
      toast.loading("Fetching Bookings", { duration: 3000 });
    } else {
      toast.dismiss();
      toast.success("Bookings Fetched Successfully", { duration: 1000 });
    }
  }, [isFetching, isLoading]);

  const handleReturn = async () => {
    const toastId = toast.loading("Processing return...", { duration: 3000 });
    console.log({
      bookingId: selectedBookingId,
      endTime,
      endDate,
    });
    try {
      const res = await returnCar({
        bookingId: selectedBookingId,
        endTime,
        endDate,
      }).unwrap();
      toast.success(res.message, { id: toastId, duration: 2000 });
      closeModal();
    } catch (err: any) {
      console.log({ err });
      toast.error(err.data.message || "Something went wrong", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  const openModal = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEndTime("");
    setEndDate("");
  };

  return (
    <section className="min-h-screen">
      <div className="px-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 lg:mb-0">
            Manage Returns
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
                  <th className="px-6 py-3 text-sm font-medium text-gray-600">
                    Vehicle Details
                  </th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-600">
                    Customer Details
                  </th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-600">
                    Booking Period
                  </th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-600">
                    Costs
                  </th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-600">
                    Status
                  </th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-600">
                    Payment Info
                  </th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings?.data?.result?.length > 0 ? (
                  bookings.data.result.map((booking: any) => (
                    <tr key={booking._id} className="border-b">
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <p className="font-medium">{booking.car.name}</p>
                          <p className="text-sm text-gray-600">
                            {booking.car.brand} {booking.car.model}
                          </p>
                          <p className="text-sm text-gray-600">
                            {booking.car.specifications.transmission} |{" "}
                            {booking.car.specifications.fuelType}
                          </p>
                          <p className="text-sm text-gray-600">
                            {booking.car.specifications.seatingCapacity} seats
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <p className="font-medium">{booking.user.name}</p>
                          <p className="text-sm text-gray-600">
                            {booking.user.email}
                          </p>
                          <p className="text-sm text-gray-600">
                            {booking.user.phone}
                          </p>
                          <p className="text-xs text-gray-500">
                            License: {booking.drivingLicense}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <p className="text-sm">Date: {booking.date}</p>
                          <p className="text-sm">Start: {booking.startTime}</p>
                          <p className="text-sm">
                            End: {booking.endTime || "N/A"}
                          </p>
                          <p className="text-sm font-medium">
                            Duration: {booking.duration}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <p className="text-sm">Base: ${booking.baseCost}</p>
                          <div className="text-xs text-gray-600">
                            <p>
                              Insurance: $
                              {booking.additionalCosts.insuranceCost}
                            </p>
                            <p>GPS: ${booking.additionalCosts.gpsCost}</p>
                            <p>
                              Child Seat: $
                              {booking.additionalCosts.childSeatCost}
                            </p>
                          </div>
                          <p className="font-medium">
                            Total: ${booking.totalCost}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-xs rounded-full ${
                            booking.status === "Approved"
                              ? "bg-green-200 text-green-800"
                              : booking.status === "Returned"
                              ? "bg-blue-200 text-blue-800"
                              : booking.status === "Cancelled"
                              ? "bg-red-200 text-red-800"
                              : "bg-yellow-200 text-yellow-800"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <span
                            className={`px-3 py-1 text-xs rounded-full ${
                              booking.paymentStatus === "Paid"
                                ? "bg-green-200 text-green-800"
                                : "bg-red-200 text-red-800"
                            }`}
                          >
                            {booking.paymentStatus}
                          </span>
                          {booking.paymentStatus === "Paid" && (
                            <p className="text-xs text-gray-600 mt-2">
                              ID: {booking.transactionId}
                            </p>
                          )}
                          {booking.paidAt && (
                            <p className="text-xs text-gray-600">
                              Paid:{" "}
                              {new Date(booking.paidAt).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {booking.status === "Approved" && (
                          <Button
                            size="sm"
                            className="w-full"
                            onClick={() => openModal(booking._id)}
                          >
                            Return
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center">
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

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Car Return Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Return Date
                </label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Return Time
                </label>
                <Input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <Button variant="outline" onClick={closeModal}>
                  Cancel
                </Button>
                <Button onClick={handleReturn}>Confirm Return</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ManageReturn;
