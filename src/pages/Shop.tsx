import React, { useEffect, useState } from "react";
import { useGetProductsQuery } from "../redux/features/products/productsApi";
import { CircleX } from "lucide-react";

import { productCategories } from "../constants/product";

import ProductCard from "../components/Shared/ProductCard";
import NoDataFound from "../components/Shared/NoDataFound";

export interface IProduct {
  _id: string;
  brand: string;
  category: string;
  name: string;
  price: number;
  description: string;
  inStock: boolean;
  quantity: number;
  image?: string;
  createdAt: string;
  updatedAt: string;
  isLoading?: boolean;
}

const Shop = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("200000000000");
  const [inputPage, setInputPage] = useState<string>("");

  const [category, setCategory] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const limit = 5;

  const { isLoading, data, isFetching } = useGetProductsQuery(
    {
      page: currentPage,
      limit,
      search: debouncedSearchTerm,
      minPrice,
      maxPrice,
      category,
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  );

  const products: IProduct[] = data?.data || [];
  const totalPages = data?.meta?.totalPages || 0;

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
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
      </div>
      {isLoading || isFetching ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(5)].map((_, idx) => (
            <ProductCard
              key={idx}
              product={{
                _id: "",
                brand: "",
                category: "",
                name: "",
                price: 0,
                description: "",
                inStock: false,
                quantity: 0,
                image: "",
                createdAt: "",
                updatedAt: "",
                isLoading: true,
              }}
              isLoading={true}
            />
          ))}
        </div>
      ) : products?.length === 0 ? (
        <NoDataFound />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products?.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              isLoading={isLoading}
            />
          ))}
        </div>
      )}

      <div className="flex justify-center mt-4 flex-wrap gap-4 sm:gap-2">
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`px-6 py-2 rounded ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
        >
          Previous
        </button>

        {/* Page Info */}
        <span className="text-sm sm:text-base px-4 py-2 text-center">
          Page {currentPage} of {totalPages}
        </span>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-6 py-2 rounded ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
        >
          Next
        </button>

        {/* Dropdown and Page Input */}
        <div className="flex flex-wrap gap-2 items-center justify-center mt-2 sm:mt-0">
          {/* Page Dropdown */}
          <select
            value={currentPage}
            onChange={handleDropdownChange}
            className="border px-4 py-2 rounded bg-[#e0f7e0] focus:outline-0  shadow-sm text-sm sm:text-base"
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
              className="w-16 sm:w-24 px-4 py-2 border rounded bg-[#e0f7e0]   shadow-sm text-sm sm:text-base"
            />
            <button
              onClick={handleJumpToPage}
              className="px-6 py-2 bg-green-500 text-white rounded focus:outline-0  hover:bg-green-600 text-sm sm:text-base"
            >
              Go
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
