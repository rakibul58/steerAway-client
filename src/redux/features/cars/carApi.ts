import { TQueryParam } from "@/Types";
import { baseApi } from "../../api/baseApi";

const carApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCars: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            if (item.value !== null)
              params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/cars",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["cars"],
    }),
    getSingleCar: builder.query({
      query: (id: string) => ({
        url: `/cars/${id}`,
        method: "GET",
      }),
      providesTags: ["cars"],
    }),
    getRelatedCars: builder.query({
      query: (id: string) => ({
        url: `/cars/related/${id}`,
        method: "GET",
      }),
      providesTags: ["cars"],
    }),
    getNavbar: builder.query({
      query: () => ({
        url: `/cars/getCarCategories`,
        method: "GET",
      }),
      providesTags: ["cars"],
    }),
    addCar: builder.mutation({
      query: (carData) => ({
        url: `/cars`,
        method: "POST",
        body: carData,
      }),
      invalidatesTags: ["cars"],
    }),
    updateCar: builder.mutation({
      query: (payload) => ({
        url: `/cars/${payload.id}`,
        method: "PUT",
        body: payload.carData,
      }),
      invalidatesTags: ["cars", "bookings"],
    }),
    deleteCar: builder.mutation({
      query: (id: string) => ({
        url: `/cars/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cars", "bookings"],
    }),
    returnCar: builder.mutation({
      query: (payload) => ({
        url: `/cars/return`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["cars", "bookings"],
    }),
  }),
});

export const {
  useGetAllCarsQuery,
  useGetSingleCarQuery,
  useAddCarMutation,
  useUpdateCarMutation,
  useDeleteCarMutation,
  useReturnCarMutation,
  useGetNavbarQuery,
  useGetRelatedCarsQuery
} = carApi;
