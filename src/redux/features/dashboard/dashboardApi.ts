import { baseApi } from "@/redux/api/baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    adminDashboard: builder.query({
      query: () => ({
        url: `/dashboard/admin`,
        method: "GET",
      }),
      providesTags: ["dashboard"],
    }),
    userDashboard: builder.query({
      query: () => ({
        url: `/dashboard/user`,
        method: "GET",
      }),
      providesTags: ["dashboard"],
    }),
  }),
});

export const { useAdminDashboardQuery, useUserDashboardQuery } = dashboardApi;
