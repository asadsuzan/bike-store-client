import React, { useEffect, useState } from "react";
import { useGetProductsQuery } from "../redux/features/products/productsApi";

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
  const limit = 5;

  // Debounce search input for better performance
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1); // Reset to page 1 when searching
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);
  // Fetch products with current page and limit
  const { isLoading, data } = useGetProductsQuery(
    { page: currentPage, limit, search: debouncedSearchTerm },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  if (isLoading) return <div>Loading...</div>;

  const products: IProduct[] = data?.data || [];
  const { totalPages } = data?.meta || {};

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div>
      {/* Search Bar */}
      {/* Search Bar */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by product name"
        className="w-full px-4 py-2 rounded mb-4"
      />

      {/* Product Grid */}
      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product._id}>
            <img
              src={product?.imageUrl ? product.imageUrl : "./placeholder.webp"}
              alt={product.name}
            />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
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
      </div>
    </div>
  );
};

export default Shop;
