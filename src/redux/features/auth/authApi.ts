import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/signin",
        method: "POST",
        body: userInfo,
      }),
    }),
    signUp: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/signup",
        method: "POST",
        body: userInfo,
      }),
    }),
    profile: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: ["profile"],
    }),
    updateProfile: builder.mutation({
      query: (userData) => ({
        url: "/auth/me",
        method: "PUT",
        body: userData,
      }),
      invalidatesTags: ["profile"],
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation, useProfileQuery, useUpdateProfileMutation } = authApi;
