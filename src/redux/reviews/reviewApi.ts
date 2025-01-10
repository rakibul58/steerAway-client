import { baseApi } from "../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addReview: builder.mutation({
      query: (reviewData) => ({
        url: `/reviews`,
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: ["reviews"],
    }),
    getReviews: builder.query({
      query: (id) => ({
        url: `/reviews/car/${id}`,
        method: "GET",
      }),
      providesTags: ["reviews"],
    }),
  }),
});

export const { useAddReviewMutation, useGetReviewsQuery } = reviewApi;
