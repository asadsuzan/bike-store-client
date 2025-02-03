import clsx from "clsx";
import { useGetProductsQuery } from "../redux/features/products/productsApi";

const Products = () => {
  const { isLoading, data } = useGetProductsQuery(
    {
      page: 1,
      limit: 10,
      search: "", // Replace with actual search term when implemented
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    }
  );
  if (isLoading) return <div>Loading...</div>;
  const products = data?.data || [];
  // console.log(products);
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white text-sm md:text-base rounded-lg shadow-md">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Brand</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Quantity</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index: number) => (
              <tr key={product._id} className="border-b border-gray-200">
                <td className="py-3 px-4 hover:bg-gray-100">{index + 1}</td>
                <td className="py-3 px-4 hover:bg-gray-100">{product.name}</td>
                <td className="py-3 px-4 hover:bg-gray-100">{product.brand}</td>
                <td className="py-3 px-4 hover:bg-gray-100">
                  {product.category}
                </td>
                <td className="py-3 px-4 hover:bg-gray-100">
                  ${product.price}
                </td>
                <td
                  className={clsx(
                    "py-3 px-4 hover:bg-gray-100",
                    product.quantity <= 0
                      ? "text-red-700"
                      : product.quantity <= 10
                      ? "text-yellow-700"
                      : "text-green-700"
                  )}
                >
                  {product.quantity <= 0
                    ? "Out of Stock"
                    : product.quantity <= 10
                    ? "Limited Stock"
                    : product.quantity}
                </td>
                <td className="py-3 px-4 hover:bg-gray-100">
                  {product.inStock ? (
                    <span className="text-green-700">In Stock</span>
                  ) : (
                    <span className="text-red-700">Out of Stock</span>
                  )}
                </td>
                <td className="py-3 px-4 hover:bg-gray-100">
                  {product.description}
                </td>
                <td className="py-3 px-4 hover:bg-gray-100">
                  <button className="p-1 rounded-md text-blue-900 hover:bg-blue-500 cursor-pointer">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
