import { TQueryParam } from "@/Types";
import { baseApi } from "../../api/baseApi";

const carApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCars: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        console.log({ args });
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
    }),
  }),
});

export const { useGetAllCarsQuery, useGetSingleCarQuery } = carApi;
