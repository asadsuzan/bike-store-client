import React from 'react';

const CategoryCardSkeleton: React.FC = () => {
  return (
    <div className="bg-gray-50 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 animate-pulse">
      {/* Image Placeholder */}
      <div className="w-full h-48 bg-gray-300"></div>
      
      <div className="p-6">
        {/* Title Placeholder */}
        <div className="h-6 bg-gray-300 rounded-md mb-2 w-3/4"></div>
        
        {/* Link Placeholder */}
        <div className="inline-flex items-center space-x-2 mt-4">
          <div className="h-4 bg-gray-300 rounded-md w-24"></div>
          <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCardSkeleton;
