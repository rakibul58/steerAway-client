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
      invalidatesTags: ["users"],
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
    getAllUsers: builder.query({
      query: () => ({
        url: "/auth/users",
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    getSingleUsers: builder.query({
      query: (id) => ({
        url: `/auth/users/${id}`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    updateUsers: builder.mutation({
      query: (payload) => ({
        url: `/auth/users/${payload.id}`,
        method: "PUT",
        body: payload.data,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useProfileQuery,
  useUpdateProfileMutation,
  useGetAllUsersQuery,
  useUpdateUsersMutation,
  useGetSingleUsersQuery,
} = authApi;
