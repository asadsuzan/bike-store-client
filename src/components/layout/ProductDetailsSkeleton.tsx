const ProductDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8 animate-pulse">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Skeleton */}
        <div className="w-full bg-gray-300 rounded-lg h-[400px]" />

        {/* Product Details Skeleton */}
        <div className="flex flex-col justify-between">
          {/* Title and Price Skeleton */}
          <div>
            <div className="h-6 bg-gray-300 rounded-md w-3/4 mb-4" />
            <div className="h-5 bg-green-300 rounded-md w-1/3 mb-2" />
            <div className="h-4 bg-gray-200 rounded-md w-1/2" />
          </div>

          {/* In Stock Skeleton */}
          <div className="h-4 bg-gray-300 w-1/4 mt-4 rounded-md" />

          {/* Quantity Selector Skeleton */}
          <div className="flex items-center mt-6">
            <div className="h-10 w-10 bg-gray-300 rounded-full" />
            <div className="mx-4 h-6 w-10 bg-gray-300 rounded-md" />
            <div className="h-10 w-10 bg-gray-300 rounded-full" />
          </div>

          {/* Pickup Info Skeleton */}
          <div className="mt-6">
            <div className="h-5 bg-gray-300 w-1/2 rounded-md mb-2" />
            <div className="flex items-start mt-2">
              <div className="w-5 h-5 bg-gray-300 rounded-full mt-1" />
              <div className="ml-2 space-y-1 w-3/4">
                <div className="h-4 bg-gray-200 rounded-md" />
                <div className="h-4 bg-gray-200 rounded-md w-2/3" />
                <div className="h-4 bg-gray-200 rounded-md w-1/2" />
                <div className="h-4 bg-gray-200 rounded-md w-1/3" />
              </div>
            </div>
          </div>

          {/* Button Skeleton */}
          <div className="h-12 w-full bg-green-300 rounded-lg mt-6" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
