import { TQueryParam } from "@/Types";
import { baseApi } from "../../api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    bookCar: builder.mutation({
      query: (bookingDetails) => ({
        url: `/bookings`,
        method: "POST",
        body: bookingDetails,
      }),
      invalidatesTags: ["cars", "dashboard", "bookings"],
    }),

    getMyBookings: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            if (item.value !== null)
              params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/bookings/my-bookings",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["bookings"],
    }),

    getAllBookings: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            if (item.value !== null)
              params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/bookings",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["bookings"],
    }),

    updateBookingStatus: builder.mutation({
      query: (payload) => ({
        url: `/bookings/${payload.id}`,
        method: "PUT",
        body: payload.data,
      }),
      invalidatesTags: ["bookings", "cars", "dashboard"],
    }),
    cancelBooking: builder.mutation({
      query: (id) => ({
        url: `/bookings/my-bookings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["bookings", "dashboard"],
    }),
    payment: builder.mutation({
      query: (id) => ({
        url: `/bookings/payment/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["bookings", 'dashboard'],
    }),
  }),
});

export const {
  useBookCarMutation,
  useGetMyBookingsQuery,
  useGetAllBookingsQuery,
  useUpdateBookingStatusMutation,
  useCancelBookingMutation,
  usePaymentMutation,
} = bookingApi;
