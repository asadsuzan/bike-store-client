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
      invalidatesTags: [{ type: 'Orders', id: 'LIST' }], // Invalidate the 'Orders' tag
    }),

    getOrders: builder.query({
      query: ({ status = "" }) => ({
        url: `/order/orders?status=${status}`,
        method: "GET",
      }),
      providesTags: [{ type: 'Orders', id: 'LIST' }], // Provide the 'Orders' tag
    }),

    getOrderSummary: builder.query({
      query: () => ({
        url: "/order/summary",
        method: "GET",
      }),
      providesTags: [{ type: 'Orders', id: 'LIST' }], // Provide the 'Orders' tag for summary
    }),

    deleteOrder: builder.mutation<void, string>({
      query: (orderId) => ({
        url: `/order/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: 'Orders', id: 'LIST' }], // Invalidate the 'Orders' tag
    }),

    verifyOrder: builder.query({
      query: (order_id) => ({
        url: "/order/verify-payment",
        params: { order_id },
        method: "GET",
      }),
      providesTags: [{ type: 'Orders', id: 'LIST' }], // Provide the 'Orders' tag for verification
    }),

    getOderRevenue: builder.query({
      query: () => ({
        url: "/order/revenue",
        method: "GET",
      }),
      providesTags: [{ type: 'Orders', id: 'LIST' }], // Provide the 'Orders' tag for revenue
    }),

    getSellsOverview: builder.query({
      query: () => ({
        url: "/order/sells-overview",
        method: "GET",
      }),
      providesTags: [{ type: 'Orders', id: 'LIST' }], // Provide the 'Orders' tag for overview
    }),

    getRecentOrders: builder.query({
      query: () => ({
        url: "/order/recent-orders",
        method: "GET",
      }),
      providesTags: [{ type: 'Orders', id: 'LIST' }], // Provide the 'Orders' tag for recent orders
    }),

    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `/order/status/${orderId}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: [{ type: 'Orders', id: 'LIST' }], // Invalidate the 'Orders' tag
    }),
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