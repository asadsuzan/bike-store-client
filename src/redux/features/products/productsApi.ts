import { IProduct } from "../../../pages/Shop";
import { baseApi } from "../../api/baseApi";

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({
        page = 1,
        limit = 5,
        search = "",
        minPrice = "",
        maxPrice = "",
        category = "",
      }) => ({
        url: `/products?page=${page}&limit=${limit}&search=${search}&minPrice=${minPrice}&maxPrice=${maxPrice}&category=${category}`,
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
    updateProduct: builder.mutation({
      query: ({ product, id }: { product: IProduct; id: string }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: product,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id: string) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useInsertProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
