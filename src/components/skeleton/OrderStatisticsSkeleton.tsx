import React from "react";

const OrderStatisticsSkeleton: React.FC = () => {
  return (
    <div className="flex-1 bg-white rounded-lg shadow-sm p-4 animate-pulse">
      <div className="h-6 w-36 bg-gray-300 rounded mb-4"></div>
      <div className="h-64 w-full bg-gray-200 "></div>
    </div>
  );
};

export default OrderStatisticsSkeleton;
