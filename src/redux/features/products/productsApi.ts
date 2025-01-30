import { baseApi } from "../../api/baseApi";

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ page = 1, limit = 5, search = "" }) => ({
        url: `/products?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
