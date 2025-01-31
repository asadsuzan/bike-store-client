import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (items) => ({
        url: `/order`,
        method: "POST",
        body: items,
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = orderApi;
