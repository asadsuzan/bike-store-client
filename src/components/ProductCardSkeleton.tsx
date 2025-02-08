import React from 'react';

const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 animate-pulse">
      <div className="w-full h-48 bg-gray-300"></div>
      <div className="p-6">
        <div className="h-6 bg-gray-300 rounded-md mb-2 w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded-md mb-4 w-5/6"></div>
        <div className="flex items-center justify-between">
          <div className="h-6 bg-gray-300 rounded-md w-1/4"></div>
          <div className="h-8 bg-gray-300 rounded-lg w-28"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
