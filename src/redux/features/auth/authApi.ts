import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/user/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    getCustomerCount: builder.query({
      query: () => ({
        url: "/user/count",
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useGetCustomerCountQuery } = authApi;
