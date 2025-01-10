import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam } from "@/Types";

const newsletterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    subscribeNewsletter: builder.mutation({
      query: (email) => ({
        url: `/newsletters/${email}`,
        method: "POST",
      }),
      invalidatesTags: ["newsletters"],
    }),

    getAllNewsletters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            if (item.value !== null)
              params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/newsletters",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["newsletters"],
    }),
  }),
});

export const { useGetAllNewslettersQuery, useSubscribeNewsletterMutation } =
  newsletterApi;
