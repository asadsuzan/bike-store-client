import { Plus, Minus, Trash, Edit } from "lucide-react";

const CartPageSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
      {/* Cart Items Section */}
      <div className="lg:col-span-2">
        <h1 className="text-4xl font-extrabold mb-8">Your cart</h1>

        {/* Placeholder for Cart Item */}
        <div className="flex items-start gap-6 border-b pb-8 mb-2 animate-pulse">
          <div className="bg-gray-300 rounded-sm w-36 h-24"></div>
          <div className="flex-1">
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
          <div className="font-bold bg-gray-300 h-6 w-16"></div>
          <div className="flex items-center gap-4">
            <div className="border border-gray-300 rounded-full px-4 py-2">
              <Minus size={16} />
            </div>
            <div className="h-6 w-8 bg-gray-300 rounded"></div>
            <div className="border border-gray-300 rounded-full px-4 py-2">
              <Plus size={16} />
            </div>
            <div className="text-red-600">
              <Trash size={18} />
            </div>
          </div>
        </div>

        {/* Placeholder Buttons */}
        <div className="flex flex-col gap-4">
          <div className="bg-gray-300 py-3 px-6 rounded-md"></div>
          <div className="bg-red-100 py-3 px-6 rounded-md"></div>
        </div>
      </div>

      {/* Order Summary Section */}
      <div className="lg:col-span-1">
        <h2 className="text-2xl font-semibold mb-4 flex items-center justify-between">
          How to get it
          <div className="text-blue-600">
            <Edit size={16} />
          </div>
        </h2>

        <div className="bg-gray-50 p-6 rounded-md mb-6">
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-1"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>

        {/* Placeholder Coupon Section */}
        <div className="border-b pb-4 mb-4">
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div className="relative w-full">
            <div className="bg-gray-300 py-3 px-4 rounded-md w-full"></div>
          </div>
        </div>

        {/* Placeholder Order Summary */}
        <div className="border-t pt-4">
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  );
};

export default CartPageSkeleton;
