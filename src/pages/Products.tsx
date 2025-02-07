import clsx from "clsx";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../redux/features/products/productsApi";
import { CircleX, Edit, Eye, Trash2, Box } from "lucide-react";
import { useEffect, useState } from "react";
import { IProduct } from "./Shop";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import NoDataFound from "../components/Shared/NoDataFound";
import { productCategories } from "../constants/product";

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("200000000000");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();
  const [deleteProduct] = useDeleteProductMutation();
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);
  const clearSearch = () => {
    setSearchTerm("");
    setDebouncedSearchTerm("");
    setCurrentPage(1);
  };
  const { isLoading, data, refetch, isFetching } = useGetProductsQuery(
    {
      page: currentPage,
      limit: 10,
      search: debouncedSearchTerm, // Replace with actual search term when implemented

      minPrice,
      maxPrice,
      category,
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    }
  );
  const handleJumpToPage = () => {
    const pageNumber = parseInt(inputPage, 10);
    if (!isNaN(pageNumber) && pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    } else {
      alert(`Please enter a valid page number between 1 and ${totalPages}`);
    }
  };

  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCurrentPage(parseInt(event.target.value, 10));
  };
  if (isLoading) return <div>Loading...</div>;
  const products: IProduct[] = data?.data || [];
  const { totalPages } = data?.meta || {};
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const toastId = toast.loading("Please wait...");

      const res = await deleteProduct(productId);
      if (res.data) {
        toast.success("Product deleted successfully", { id: toastId });
        // Refetch products with the updated status
        refetch();
        setCurrentPage(currentPage); // Refresh the current page when product is deleted
      } else {
        toast.error("Error deleting product", { id: toastId });
      }
    }
  };
  const renderSkeleton = (count: number) => (
    <div className="animate-pulse">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="h-6 my-2 w-[100vw] bg-gray-300 rounded-md "
        ></div>
      ))}
    </div>
  );
  return (
    <div className="bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-[#00283a] mb-4 flex items-center">
        <Box className="mr-2" /> Products In Inventory
      </h1>
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by product name"
            className="w-full px-4 py-2 rounded focus:outline-none border-[#006400] bg-[#e0f7e0] focus:ring-2 focus:ring-[#006400] shadow-sm pr-10"
          />
          {searchTerm && (
            <span
              onClick={clearSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              <CircleX size={20} />
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min Price"
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full px-4 py-2 rounded border-[#006400] bg-[#e0f7e0] focus:ring-2 focus:ring-[#004d00] shadow-sm"
          />
          <input
            type="number"
            placeholder="Max Price"
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full px-4 py-2 rounded border-[#006400] bg-[#e0f7e0] focus:ring-2 focus:ring-[#004d00] shadow-sm"
          />
        </div>

        <div>
          <select
            id="sort-by-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 rounded border-[#006400] bg-[#e0f7e0] focus:ring-2 focus:ring-[#004d00] shadow-sm"
          >
            {productCategories?.map((item) => (
              <option key={item} value={item === "All" ? "" : item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div> */}
     {/* Filters Section */}
     <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by product name"
            className="w-full px-6 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 shadow-lg bg-white placeholder-gray-400"
          />
          {searchTerm && (
            <span
              onClick={clearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
            >
              <CircleX size={20} />
            </span>
          )}
        </div>

        {/* Price Range Inputs */}
        <div className="flex gap-4">
          <input
            type="number"
            placeholder="Min Price"
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full px-6 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 shadow-lg bg-white placeholder-gray-400"
          />
          <input
            type="number"
            placeholder="Max Price"
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full px-6 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 shadow-lg bg-white placeholder-gray-400"
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <select
            id="sort-by-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-6 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 shadow-lg bg-white text-gray-700"
          >
            {productCategories?.map((item) => (
              <option key={item} value={item === "All" ? "" : item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
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
            {isLoading || isFetching ? (
              <div className="mt-4">{renderSkeleton(10)}</div>
            ) : (
              products?.map((product: IProduct, index: number) => (
                <tr key={product._id} className="border-b border-gray-200">
                  <td className="py-3 px-4 hover:bg-gray-100">{index + 1}</td>
                  <td className="py-3 px-4 hover:bg-gray-100">
                    {product?.name}
                  </td>
                  <td className="py-3 px-4 hover:bg-gray-100">
                    {product?.brand}
                  </td>
                  <td className="py-3 px-4 hover:bg-gray-100">
                    {product?.category}
                  </td>
                  <td className="py-3 px-4 hover:bg-gray-100">
                    ${product?.price}
                  </td>
                  <td
                    className={clsx(
                      "py-3 px-4 hover:bg-gray-100",
                      product?.quantity <= 0
                        ? "text-red-700"
                        : product?.quantity <= 10
                        ? "text-yellow-700"
                        : "text-green-700"
                    )}
                  >
                    {product.quantity <= 0
                      ? "Out of Stock"
                      : product?.quantity <= 10
                      ? "Limited Stock"
                      : product?.quantity}
                  </td>
                  <td className="py-3 px-4 hover:bg-gray-100">
                    {product?.inStock ? (
                      <span className="text-green-700">In Stock</span>
                    ) : (
                      <span className="text-red-700">Out of Stock</span>
                    )}
                  </td>
                  <td
                    className="py-3 px-4 hover:bg-gray-100"
                    dangerouslySetInnerHTML={{
                      __html: product?.description.slice(0, 20),
                      // Limit the description to 20 characters for display
                    }}
                  >
                    {/* {product.description} */}
                  </td>
                  <td className="py-3 px-4 hover:bg-gray-100">
                    <button
                      onClick={() => navigate(`/product/${product._id}`)}
                      className="p-1 rounded-md text-blue-900 hover:bg-blue-500 cursor-pointer"
                    >
                      <Eye className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                      className="p-1 rounded-md text-blue-900 hover:bg-blue-500 cursor-pointer"
                      onClick={() =>
                        navigate(`/edit-product/${product?._id}`)
                      }
                    >
                      <Edit className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product?._id)}
                      className="p-1 rounded-md text-blue-900 hover:bg-blue-500 cursor-pointer"
                    >
                      <Trash2 className="w-5 h-5 text-red-600" />{" "}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {products?.length === 0 && !isFetching && !isLoading && (
          <div className=" justify-center items-center">
            <NoDataFound />
          </div>
        )}
      </div>
    {/* Pagination Section */}
    <div className="flex justify-center mt-12 flex-wrap gap-4">
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`px-6 py-3 rounded-xl ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
          } transition-all duration-300 shadow-lg`}
        >
          Previous
        </button>

        {/* Page Info */}
        <span className="text-sm sm:text-base px-6 py-3 text-center text-gray-700 bg-white rounded-xl shadow-lg">
          Page {currentPage} of {totalPages}
        </span>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-6 py-3 rounded-xl ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
          } transition-all duration-300 shadow-lg`}
        >
          Next
        </button>

        {/* Dropdown and Page Input */}
        <div className="flex flex-wrap gap-4 items-center justify-center">
          {/* Page Dropdown */}
          <select
            value={currentPage}
            onChange={handleDropdownChange}
            className="border-2 border-gray-200 px-6 py-3 rounded-xl bg-white focus:outline-none focus:border-green-500 shadow-lg text-sm sm:text-base"
          >
            {Array.from({ length: totalPages }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                Page {index + 1}
              </option>
            ))}
          </select>

          {/* Page Input */}
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              max={totalPages}
              value={inputPage}
              onChange={(e) => setInputPage(e.target.value)}
              placeholder="Page"
              className="w-16 sm:w-24 px-4 py-3 border-2 border-gray-200 rounded-xl bg-white focus:outline-none focus:border-green-500 shadow-lg text-sm sm:text-base"
            />
            <button
              onClick={handleJumpToPage}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg text-sm sm:text-base"
            >
              Go
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
