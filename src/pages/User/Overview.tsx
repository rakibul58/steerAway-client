/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  useProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { useGetMyBookingsQuery } from "@/redux/features/booking/bookingApi";

interface IProfileForm {
  name: string;
  email: string;
  phone: string;
  preferences: string;
  address: string;
}

const Overview = () => {
  const {
    data: user,
    isFetching: isProfileFetching,
    isLoading: isProfileLoading,
  } = useProfileQuery(undefined);
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
      value: 3,
    },
  ]);
  const [updateProfile] = useUpdateProfileMutation();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (
      isProfileFetching ||
      isProfileLoading ||
      isBookingFetching ||
      isBookingLoading
    ) {
      toast.loading("Fetching Dashboard", { duration: 3000 });
    } else {
      toast.dismiss();
      toast.success("Dashboard Fetched Successfully", { duration: 1000 });
    }
  }, [
    isProfileFetching,
    isProfileLoading,
    isBookingFetching,
    isBookingLoading,
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfileForm>();

  const onSubmit: SubmitHandler<IProfileForm> = async (data) => {
    const toastId = toast.loading("Profile Updating...", { duration: 3000 });
    try {
      const res = await updateProfile(data).unwrap();
      toast.success(res.message, { id: toastId, duration: 2000 });
      setIsEditing(false);
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
        <h1 className="text-3xl font-bold mb-8">User Dashboard</h1>

        {/* Profile Overview Section */}
        <div className="p-6 rounded-lg shadow-xl border mb-8">
          <h2 className="text-2xl font-semibold mb-4">Profile Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="font-medium">Name:</p>
              <p>{user?.data?.name}</p>
            </div>
            <div>
              <p className="font-medium">Email:</p>
              <p>{user?.data?.email}</p>
            </div>
            <div>
              <p className="font-medium">Phone:</p>
              <p>{user?.data?.phone || "N/A"}</p>
            </div>
            <div>
              <p className="font-medium">Address:</p>
              <p>{user?.data?.address || "N/A"}</p>
            </div>
            <div>
              <p className="font-medium">Preferences:</p>
              <p>{user?.data?.preferences || "N/A"} </p>
            </div>
          </div>
          <Button className="mt-6" onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        </div>

        {/* Edit Profile Section */}
        {isEditing && (
          <div className="shadow-xl border p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 font-medium">
                  Name
                </label>
                <input
                  defaultValue={user?.data?.name}
                  id="name"
                  {...register("name", { required: "Name is required" })}
                  className="py-3 px-4 w-full rounded-sm bg-secondary shadow-md"
                />
                {errors.name && (
                  <span className="text-destructive">
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 font-medium">
                  Email
                </label>
                <input
                  id="email"
                  defaultValue={user?.data?.email}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Invalid email address",
                    },
                  })}
                  className="py-3 px-4 w-full rounded-sm bg-secondary shadow-md"
                />
                {errors.email && (
                  <span className="text-destructive">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block mb-2 font-medium">
                  Phone
                </label>
                <input
                  id="phone"
                  defaultValue={user?.data?.phone}
                  {...register("phone")}
                  className="py-3 px-4 w-full rounded-sm bg-secondary shadow-md"
                />
              </div>

              <div>
                <label htmlFor="address" className="block mb-2 font-medium">
                  Address
                </label>
                <input
                  id="address"
                  defaultValue={user?.data?.address}
                  {...register("address")}
                  className="py-3 px-4 w-full rounded-sm bg-secondary shadow-md"
                />
              </div>

              <div>
                <label htmlFor="preferences" className="block mb-2 font-medium">
                  Preferences
                </label>
                <textarea
                  id="preferences"
                  defaultValue={user?.data?.preferences}
                  {...register("preferences")}
                  className="py-3 px-4 w-full rounded-sm bg-secondary shadow-md"
                />
              </div>

              <Button type="submit" className="w-full">
                Save Changes
              </Button>
              <Button
                type="button"
                className="w-full mt-4"
                variant="secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </form>
          </div>
        )}

        {/* Booking History Section */}
        <div className="p-6 rounded-lg shadow-xl border">
          <h2 className="text-2xl font-semibold mb-4">Booking History</h2>
          {bookings?.data?.result?.length > 0 ? (
            <div className="space-y-4">
              {bookings?.data?.result?.map((booking: any, index: string) => (
                <div key={index} className="border-b pb-4">
                  <p className="font-medium">Car: {booking?.car?.name}</p>
                  <p>Rental Date: {booking.date}</p>
                  <p>Booking Status: {booking.status}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No bookings found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Overview;
