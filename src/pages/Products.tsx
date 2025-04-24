import clsx from "clsx";
import { useDeleteProductMutation, useGetProductsQuery } from "../redux/features/products/productsApi";
import { CircleX, Edit, Eye, Trash2, Box, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";

import { toast } from "sonner";
import NoDataFound from "../components/Shared/NoDataFound";
import { productCategories } from "../constants/product";
import { Link, useNavigate } from "react-router";
import Pagination from "../components/Shared/Pagination";
import { IProduct } from "../types";

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [tempMinPrice, setTempMinPrice] = useState("");
  const [tempMaxPrice, setTempMaxPrice] = useState("");
  const [appliedMinPrice, setAppliedMinPrice] = useState("");
  const [appliedMaxPrice, setAppliedMaxPrice] = useState("");
  const [category, setCategory] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const navigate = useNavigate();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const { isLoading, data, isFetching, refetch } = useGetProductsQuery({
    page: currentPage,
    limit: 5,
    search: debouncedSearchTerm,
    minPrice: appliedMinPrice,
    maxPrice: appliedMaxPrice,
    category,
  }, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });

  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setDeletingId(productId);
      const toastId = toast.loading("Deleting product...");
      try {
        await deleteProduct(productId).unwrap();
        toast.success("Product deleted successfully", { id: toastId });
        refetch();
      } catch (error) {
        console.log(error)
        toast.error("Error deleting product", { id: toastId });
      } finally {
        setDeletingId(null);
      }
    }
  };

  const handlePriceFilterApply = () => {
    const min = parseFloat(tempMinPrice);
    const max = parseFloat(tempMaxPrice);

    if (tempMinPrice && tempMaxPrice && min > max) {
      toast.error("Minimum price cannot be greater than maximum price");
      return;
    }

    setAppliedMinPrice(tempMinPrice);
    setAppliedMaxPrice(tempMaxPrice);
    setCurrentPage(1);
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

  const products: IProduct[] = data?.data || [];
  const { totalPages = 0 } = data?.meta || {};

  const StatusIndicator = ({ quantity, inStock }: { quantity: number; inStock: boolean }) => (
    <div className="flex flex-col gap-1">
      <span className={clsx(
        "px-2 py-1 rounded-full text-xs font-medium w-fit",
        quantity <= 0 ? "bg-red-100 text-red-800" :
        quantity <= 10 ? "bg-amber-100 text-amber-800" :
        "bg-green-100 text-green-800"
      )}>
        {quantity <= 0 ? "Out of Stock" : quantity <= 10 ? "Low Stock" : "In Stock"}
      </span>
      <span className={clsx(
        "px-2 py-1 rounded-full text-xs font-medium w-fit",
        inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
      )}>
        {inStock ? "Active" : "Inactive"}
      </span>
    </div>
  );

  const ProductRowSkeleton = () => (
    <div className="animate-pulse grid grid-cols-3 md:grid-cols-9 gap-4 p-4 border-b">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="h-4 bg-gray-200 rounded col-span-1"></div>
      ))}
    </div>
  );

  // Check if any filters are active
  const isAnyFilterActive = !!searchTerm || !!category || !!appliedMinPrice || !!appliedMaxPrice;

  return (
    <div className="p-4 lg:p-8 bg-gray-50 min-h-screen">
    
      <div className="max-w-7xl mx-auto">
       <div className="flex justify-between items-center mb-4 lg:mb-6">
       <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Box className="w-6 h-6 text-green-600" />
          Product Inventory
        </h1>
      
            <Link
              to={`/insert-product`}
              className={clsx(
                "flex items-center gap-2 px-3 py-2 rounded-lg",
                "transition-colors duration-200 hover:bg-gray-100",
                "text-gray-600 hover:text-gray-900",
                "bg-green-100 text-green-700 font-medium",
                "group" // For group-hover effects
              )}
             
            >
              <span className={clsx(
                "text-lg transition-colors duration-200",
             "text-gray-500 group-hover:text-green-500"
              )}>
                <PlusCircle size={20} />
              </span>
              <span className="text-sm hidden sm:inline-block">
                Add New Product
              </span>
            </Link>
       </div>
         
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
              onChange={(e) => setCategory(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
            >
              <option value="">All Categories</option>
              {productCategories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
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

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="text-left text-sm font-medium text-gray-500">
                  <th className="p-4">Product</th>
                  <th className="p-4 hidden md:table-cell">Brand</th>
                  <th className="p-4 hidden lg:table-cell">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-gray-200">
                {(isLoading || isFetching) ? (
                  Array.from({ length: 5 }).map((_, i) => <ProductRowSkeleton key={i} />)
                ) : products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 truncate">{product.name}</p>
                            <p className="text-sm text-gray-500 truncate hidden md:block">
                              {product.description.replace(/<[^>]+>/g, '').slice(0, 40)}...
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 hidden md:table-cell">{product.brand}</td>
                      <td className="p-4 hidden lg:table-cell">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                          {product.category}
                        </span>
                      </td>
                      <td className="p-4 font-medium">${product.price.toFixed(2)}</td>
                      <td className="p-4">
                        <StatusIndicator 
                          quantity={product.quantity} 
                          inStock={product.inStock} 
                        />
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => navigate(`/product/${product._id}`)}
                            className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                            aria-label="View product"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => navigate(`/edit-product/${product._id}`)}
                            className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                            aria-label="Edit product"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            disabled={deletingId === product._id}
                            className="p-2 hover:bg-red-100 rounded-lg text-red-600 disabled:opacity-50"
                            aria-label="Delete product"
                          >
                            {deletingId === product._id ? (
                              <>please wait...</>
                            ) : (
                              <Trash2  />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-8">
                      <NoDataFound />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="border-t border-gray-200 p-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;