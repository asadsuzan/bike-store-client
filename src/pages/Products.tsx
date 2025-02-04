import clsx from "clsx";
import { useGetProductsQuery } from "../redux/features/products/productsApi";
import { CircleX, Edit, Eye, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { IProduct } from "./Shop";
import { useNavigate } from "react-router";

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const navigate = useNavigate();

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
  const { isLoading, data } = useGetProductsQuery(
    {
      page: currentPage,
      limit: 10,
      search: debouncedSearchTerm, // Replace with actual search term when implemented
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
  return (
    <div className="bg-gray-50 p-6">
      {/* Search Bar */}
      <div className="relative mb-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by product name"
          className="w-full px-4 py-2 rounded border pr-10" // Added right padding for icon
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
      <h1 className="text-2xl font-bold mb-4">Products In Inventory</h1>
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
            {products.map((product: IProduct, index: number) => (
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
                <td
                  className="py-3 px-4 hover:bg-gray-100"
                  dangerouslySetInnerHTML={{ __html: product?.description }}
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
                  <button className="p-1 rounded-md text-blue-900 hover:bg-blue-500 cursor-pointer">
                    <Edit className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-1 rounded-md text-blue-900 hover:bg-blue-500 cursor-pointer">
                    <Trash2 className="w-5 h-5 text-red-600" />{" "}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`px-4 py-2 mr-2 rounded ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
        >
          Previous
        </button>

        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 ml-2 rounded ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
        >
          Next
        </button>

        {/* Combined Input and Dropdown */}
        <div className="ml-4 flex items-center gap-2">
          <select
            value={currentPage}
            onChange={handleDropdownChange}
            className="border px-2 py-1 rounded"
          >
            {Array.from({ length: totalPages }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                Page {index + 1}
              </option>
            ))}
          </select>

          <input
            type="number"
            min="1"
            max={totalPages}
            value={inputPage}
            onChange={(e) => setInputPage(e.target.value)}
            placeholder="Page"
            className="w-16 px-2 py-1 border rounded"
          />
          <button
            onClick={handleJumpToPage}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Go
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
