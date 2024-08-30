import Pagination from "@/components/shared/Pagination";
import { Button } from "@/components/ui/button";
import { useGetAllBookingsQuery } from "@/redux/features/booking/bookingApi";
import { useReturnCarMutation } from "@/redux/features/cars/carApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ManageReturn = () => {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState("");
  const [endTime, setEndTime] = useState("");
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
      name: "status",
      value: "Approved",
    },
    {
      name: "status",
      value: "Returned",
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
    const toastId = toast.loading("Status updating....", { duration: 3000 });
    try {
      const res = await returnCar({
        bookingId: selectedBookingId,
        endTime,
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

  const openModal = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEndTime("");
  };

  return (
    <section className="">
      <div className="px-6">
        <h1 className="text-3xl font-bold mb-8">Manage Return</h1>
        <div className="overflow-x-auto">
          <table className="w-full shadow-lg border rounded-md">
            <thead className="bg-secondary">
              <tr>
                <th className="px-4 py-2 text-left">User</th>
                <th className="px-4 py-2 text-left">Car</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Start Time</th>
                <th className="px-4 py-2 text-left">End Time</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Price/Hour</th>
                <th className="px-4 py-2 text-left">Renting Cost</th>
                <th className="px-4 py-2 text-left">Additional Cost</th>
                <th className="px-4 py-2 text-left">Total Cost</th>
                <th className="px-4 py-2 text-left">Action</th>
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
                    <td className="px-4 py-2">{booking.endTime || "N/A"}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`inline-block px-2 py-1 text-sm rounded ${
                          booking.status === "Approved"
                            ? "bg-green-200 text-green-800"
                            : "bg-blue-200 text-blue-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>

                    <td className="px-4 py-2">৳{booking.car.pricePerHour}</td>
                    <td className="px-4 py-2">৳{booking.rentingCost}</td>
                    <td className="px-4 py-2 text-sm flex flex-col items-start">
                      <span>Insurance: ৳{booking.insuranceCost}</span>
                      <span>Baby Seat: ৳{booking.childSeatCost}</span>
                      <span>GPS: ৳{booking.gpsCost}</span>
                    </td>
                    <td className="px-4 py-2">৳{booking.totalCost}</td>
                    <td className="px-4 py-2 space-x-2 space-y-2">
                      {booking.status === "Approved" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => openModal(booking._id)}
                          >
                            Return
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
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 border shadow-lg bg-black">
          <div className="p-6 rounded-lg shadow-lg w-[90%] max-w-md bg-background">
            <h3 className="text-xl font-semibold mb-4">Enter End Time</h3>
            <p className="mb-4">Please enter the time the car was returned.</p>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="mb-4 w-full bg-secondary p-2 rounded-md"
            />
            <div className="flex justify-end space-x-4">
              <Button variant="secondary" onClick={closeModal}>
                Cancel
              </Button>
              <Button onClick={() => handleReturn()}>Confirm Return</Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ManageReturn;
