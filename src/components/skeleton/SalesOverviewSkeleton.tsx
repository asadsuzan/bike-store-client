import React from "react";

const SalesOverviewSkeleton: React.FC = () => {
  return (
    <div className="flex-1 bg-white rounded-lg shadow-sm p-4 animate-pulse">
      <div className="h-6 w-32 bg-gray-300 rounded mb-4"></div>
      <div className="h-64 bg-gray-200 rounded"></div>
    </div>
  );
};

export default SalesOverviewSkeleton;
