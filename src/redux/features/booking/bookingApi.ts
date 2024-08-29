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

        console.log({params});

        return {
          url: "/bookings/my-bookings",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["bookings"],
    }),
  }),
});

export const { useBookCarMutation, useGetMyBookingsQuery } = bookingApi;
