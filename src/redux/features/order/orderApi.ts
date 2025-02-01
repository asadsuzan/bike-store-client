// import { baseApi } from "../../api/baseApi";

// const orderApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     createOrder: builder.mutation({
//       query: (items) => ({
//         url: `/order`,
//         method: "POST",
//         body: items,
//       }),
//     }),
//   }),
// });

// export const { useCreateOrderMutation } = orderApi;

import { baseApi } from "../../api/baseApi";

interface ICreateOrderRequest {
  items: Array<{
    productId: string;
    quantity: number;
  }>;
}

interface ICreateOrderResponse {
  data?: {
    data: {
      checkout_url: string;
    };
  };
  error?: {
    data: {
      item: string;
    };
  };
}

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<ICreateOrderResponse, ICreateOrderRequest>({
      query: (items) => ({
        url: `/order`,
        method: "POST",
        body: items,
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = orderApi;
