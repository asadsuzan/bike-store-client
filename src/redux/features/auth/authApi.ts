import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/user/login",
        method: "POST",
        body: userInfo,
        invalidatesTags: [{ type: 'Profile', id: 'LIST' }], // Invalidate the 'Orders' tag
      }),
    }),
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        body: userInfo,
      }),
    }),
    updateProfile: builder.mutation({
      query: (userInfo) => ({
        url: "/user/profile",
        method: "PUT",
        body: userInfo,
        invalidatesTags: [{ type: 'Profile', id: 'LIST' }], // Invalidate the 'Orders' tag
      }),
    }),
    getCustomerCount: builder.query({
      query: () => ({
        url: "/user/count",
        method: "GET",
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: "/user/profile",
        method: "GET",
        providesTags: [{ type: 'Profile', id: 'LIST' }], // Provide the 'Orders' tag
      }),
    }),
  }),
});

export const { useLoginMutation, useGetCustomerCountQuery ,useRegisterMutation,useUpdateProfileMutation,useGetProfileQuery} = authApi;
