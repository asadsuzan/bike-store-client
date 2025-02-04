import React, { useEffect, useState } from "react";
import { useGetProductsQuery } from "../redux/features/products/productsApi";
// import a close icon from lucide react
import { CircleX } from "lucide-react";
import { useNavigate } from "react-router";

export interface IProduct {
  _id: string;
  brand: string;
  category: string;
  name: string;
  price: number;
  description: string;
  inStock: boolean;
  quantity: number;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

const Shop = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [inputPage, setInputPage] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const limit = 5;

  const { isLoading, data } = useGetProductsQuery(
    { page: currentPage, limit, search: debouncedSearchTerm },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  if (isLoading) return <div>Loading...</div>;

  const products: IProduct[] = data?.data || [];
  const { totalPages } = data?.meta || {};
  console.log(products);
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

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

  const clearSearch = () => {
    setSearchTerm("");
    setDebouncedSearchTerm("");
    setCurrentPage(1);
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="relative mb-4">
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

      {/* Product Grid */}
      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            onClick={() => navigate(`/product/${product._id}`)}
            className="cursor-pointer"
          >
            <img
              src={product?.imageUrl ? product.imageUrl : "./placeholder.webp"}
              alt={product.name}
            />
            <h2>{product.name}</h2>

            <p
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
            <p>Price: ${product.price}</p>
            <p>In Stock: {product.inStock ? "Yes" : "No"}</p>
          </div>
        ))}
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

export default Shop;
