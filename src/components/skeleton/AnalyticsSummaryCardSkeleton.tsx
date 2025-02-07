import React from "react";

const AnalyticsSummaryCardSkeleton: React.FC = () => {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg shadow-sm bg-gray-100 animate-pulse">
      <div className="w-8 h-8 bg-gray-300 rounded-full" />
      <div className="text-right">
        <div className="w-16 h-6 bg-gray-300 rounded-md mb-2" />
        <div className="w-24 h-4 bg-gray-300 rounded-md" />
      </div>
    </div>
  );
};

export default AnalyticsSummaryCardSkeleton;
