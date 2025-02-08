/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useGetProductsQuery } from "../redux/features/products/productsApi";
import { CircleX } from "lucide-react";
import { productCategories } from "../constants/product";

import NoDataFound from "../components/Shared/NoDataFound";
import Footer from "../components/Shared/Footer";
import { useSearchParams } from "react-router";
import ProductCard from "../components/Shared/ProductCard";
import Pagination from "../components/Shared/Pagination";
import { generateArray } from "../utils";
import ProductCardSkeleton from "../components/ProductCardSkeleton";

const Shop = () => {
  const [searchParams, setSearchParam] = useSearchParams();
  const category_item = searchParams.get("category") || "";

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [tempMinPrice, setTempMinPrice] = useState("");
  const [tempMaxPrice, setTempMaxPrice] = useState("");
  const [appliedMinPrice, setAppliedMinPrice] = useState("");
  const [appliedMaxPrice, setAppliedMaxPrice] = useState("");
  const [category, setCategory] = useState(category_item);
  const [currentPage, setCurrentPage] = useState(1);

  // const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const { isLoading, data, isFetching } = useGetProductsQuery({
    page: currentPage,
    limit: 5,
    search: debouncedSearchTerm,
    minPrice: appliedMinPrice,
    maxPrice: appliedMaxPrice,
    category,
  });

  const handlePriceFilterApply = () => {
    const min = parseFloat(tempMinPrice);
    const max = parseFloat(tempMaxPrice);

    if (tempMinPrice && tempMaxPrice && min > max) {
      alert("Minimum price cannot be greater than maximum price");
      return;
    }

    setAppliedMinPrice(tempMinPrice);
    setAppliedMaxPrice(tempMaxPrice);
    setCurrentPage(1);
  };
  const handleSetCategory = (category: string) => {
    setCategory(category);
    setSearchParam(`category=${category}`);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setDebouncedSearchTerm("");
    setTempMinPrice("");
    setTempMaxPrice("");
    setAppliedMinPrice("");
    setAppliedMaxPrice("");
    setCategory("");
    setCurrentPage(1);
  };

  const isAnyFilterActive =
    !!searchTerm || !!category || !!appliedMinPrice || !!appliedMaxPrice;

  const products = data?.data || [];
  const { totalPages = 0 } = data?.meta || {};

  return (
    <div className="p-4 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          Shop Products
        </h1>

        {/* Filters Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
          <div className="relative col-span-1 lg:col-span-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 pr-10"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <CircleX size={20} />
              </button>
            )}
          </div>

          <div className="flex gap-2 col-span-1">
            <input
              type="number"
              placeholder="Min Price"
              value={tempMinPrice}
              onChange={(e) => setTempMinPrice(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={tempMaxPrice}
              onChange={(e) => setTempMaxPrice(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={handlePriceFilterApply}
              disabled={!tempMinPrice && !tempMaxPrice}
              className="px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Apply
            </button>
          </div>

          <div className="flex gap-2 col-span-1">
            <select
              value={category}
              onChange={(e) => handleSetCategory(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
            >
              <option value="">All Categories</option>
              {productCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <button
              onClick={handleResetFilters}
              disabled={!isAnyFilterActive}
              className="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reset All
            </button>
          </div>
        </div>
        {isLoading || isFetching ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {generateArray(5).map((index) => (
              <ProductCardSkeleton key={index} />
            ))}{" "}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product: any) => (
              <ProductCard
                key={product._id}
                product={product}
                isLoading={isLoading}
              />
            ))}
          </div>
        )}

        {
          products?.length === 0 &&  <NoDataFound />
        }
     
        <div className="my-5"></div>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="border-t border-gray-200 p-4">
            {/* Pagination component */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
};

export default Shop;
