/* eslint-disable @typescript-eslint/no-explicit-any */
import { RecentActivity } from "@/components/Admin/RecentActivity";
import { StatCard } from "@/components/Admin/StatCard";
import { useGetAllBookingsQuery } from "@/redux/features/booking/bookingApi";
import { useGetAllCarsQuery } from "@/redux/features/cars/carApi";
import { useEffect } from "react";
import { toast } from "sonner";
import { ICarForm } from "./ManageCars";

const Overview = () => {
  const {
    data: cars = [],
    isFetching: isCarsFetching,
    isLoading: isCarsLoading,
  } = useGetAllCarsQuery([
    {
      name: "sort",
      value: "-createdAt",
    },
  ]);
  const {
    data: bookings = [],
    isLoading: isBookingLoading,
    isFetching: isBookingFetching,
  } = useGetAllBookingsQuery([
    {
      name: "sort",
      value: "-createdAt",
    },
  ]);

  useEffect(() => {
    if (
      isCarsFetching ||
      isCarsLoading ||
      isBookingFetching ||
      isBookingLoading
    ) {
      toast.loading("Fetching Dashboard", { duration: 3000 });
    } else {
      toast.dismiss();
      toast.success("Dashboard Fetched Successfully", { duration: 1000 });
    }
  }, [isCarsFetching, isCarsLoading, isBookingFetching, isBookingLoading]);

  const totalBookings = bookings?.data?.result?.length || 0;
  const totalCars = cars?.data?.result?.length || 0;
  const availableCars =
    cars?.data?.result?.filter((car: ICarForm) => car.status === "available")
      .length || 0;

  const revenue =
    bookings?.data?.result
      ?.filter(
        (booking: Record<string, string | number>) =>
          booking.status === "Returned" && booking.paymentStatus === "Paid"
      )
      .reduce(
        (acc: number, booking: Record<string, string | number>) =>
          acc + Number(booking.totalCost),
        0
      ) || 0;

  const receivable =
    bookings?.data?.result
      ?.filter(
        (booking: Record<string, string | number>) =>
          booking.status === "Returned" && booking.paymentStatus === "Pending"
      )
      .reduce(
        (acc: number, booking: Record<string, string | number>) =>
          acc + Number(booking.totalCost),
        0
      ) || 0;

  const activeReservations =
    bookings?.data?.result?.filter(
      (booking: Record<string, string | number>) =>
        booking.status === "Approved"
    ).length || 0;

  const pendingReservation =
    bookings?.data?.result?.filter(
      (booking: Record<string, string | number>) => booking.status === "Pending"
    ).length || 0;

  const cancelledReservation =
    bookings?.data?.result?.filter(
      (booking: Record<string, string | number>) =>
        booking.status === "Cancelled"
    ).length || 0;

  const recentBookings =
    bookings?.data?.result
      ?.slice(0, 5)
      .map((booking: Record<string, any>) => booking) || [];

  console.log({ recentBookings });

  return (
    <div className="space-y-6 px-6">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Bookings" value={totalBookings} />
        <StatCard title="Total Cars" value={totalCars} />
        <StatCard title="Available Cars" value={availableCars} />
        <StatCard title="Total Revenue" value={`৳${Math.floor(revenue)}`} />
        <StatCard title="Account Receivable" value={`৳${Math.floor(receivable)}`} />
        <StatCard title="Active Reservations" value={activeReservations} />
        <StatCard title="Pending Reservations" value={pendingReservation} />
        <StatCard title="Cancelled Reservations" value={cancelledReservation} />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Activity</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <RecentActivity activities={recentBookings} />
        </div>
      </div>
    </div>
  );
};

export default Overview;
