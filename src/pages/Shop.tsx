import React, { useEffect, useState } from "react";
import { useGetProductsQuery } from "../redux/features/products/productsApi";
import { CircleX } from "lucide-react";
import { productCategories } from "../constants/product";
import ProductCard from "../components/Shared/ProductCard";
import NoDataFound from "../components/Shared/NoDataFound";
import Footer from "../components/Shared/Footer";
import { useSearchParams } from "react-router";

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
  const [searchParams,setSearchParams] = useSearchParams();
  const category_item = searchParams.get("category") || ''
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("200000000000");
  const [inputPage, setInputPage] = useState<string>("");
  const [category, setCategory] = useState( category_item);

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
const handleCategoryChange =(value:string)=>{
  setCategory(value);
  setSearchParams({ category: value });

}
  const clearSearch = () => {
    setSearchTerm("");
    setDebouncedSearchTerm("");
    setCurrentPage(1);
  };

  return (
    <div className="p-8  min-h-screen">
      {/* Header */}
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
        Explore Our Products
      </h1>

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
            onChange={(e) => handleCategoryChange(e.target.value)}
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

      {/* Products Grid */}
      {isLoading || isFetching ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products?.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              isLoading={isLoading}
            />
          ))}
        </div>
      )}

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




       {/* footer  */}
      <div className="mt-6"> <Footer/></div>
    </div>

    
  );
};

export default Shop;