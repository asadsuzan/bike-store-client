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
    getOrders: builder.query({
      query: ({ status = "" }) => ({
        url: `/order/orders?status=${status}`,
        method: "GET",
      }),
    }),
    getOrderSummary: builder.query({
      query: () => ({
        url: "/order/summary",
        method: "GET",
      }),
    }),
    deleteOrder: builder.mutation<void, string>({
      query: (orderId) => ({
        url: `/order/${orderId}`,
        method: "DELETE",
      }),
    }),

    verifyOrder: builder.query({
      query: (order_id) => ({
        url: "/order/verify-payment",
        params: { order_id },
        method: "GET",
      }),
    }),
    getOderRevenue: builder.query({
      query: () => ({
        url: "/order/revenue",
        method: "GET",
      }),
    }),
    getSellsOverview: builder.query({
      query: () => ({
        url: "/order/sells-overview",
        method: "GET",
      }),
    }),
    getRecentOrders: builder.query({
      query: () => ({
        url: "/order/recent-orders",
        method: "GET",
      }),
    }),
    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `/order/status/${orderId}`,
        method: "PUT",
        body: { status },
      }),

    })
  }),
});

export const {
  useCreateOrderMutation,
  useVerifyOrderQuery,
  useGetOrdersQuery,
  useGetOrderSummaryQuery,
  useDeleteOrderMutation,
  useGetOderRevenueQuery,
  useGetSellsOverviewQuery,
  useGetRecentOrdersQuery,
  useUpdateOrderStatusMutation,
} = orderApi;
