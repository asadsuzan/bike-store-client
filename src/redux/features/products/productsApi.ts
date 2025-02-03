import { baseApi } from "../../api/baseApi";

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ page = 1, limit = 5, search = "" }) => ({
        url: `/products?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
    }),
    getProductById: builder.query({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "GET",
      }),
    }),
    insertProduct: builder.mutation({
      query: (product) => ({
        url: `/products`,
        method: "POST",
        body: product,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useInsertProductMutation,
} = productsApi;
