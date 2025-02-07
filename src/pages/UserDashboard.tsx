/* eslint-disable @typescript-eslint/no-explicit-any */

import { ShoppingCart, PackageCheck, DollarSign } from "lucide-react";
import {

  useGetOderRevenueQuery,
  useGetOrderSummaryQuery,
  useGetRecentOrdersQuery,
} from "../redux/features/order/orderApi";


import OrderTable from "../components/Shared/OrderTable";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


const UserDashboard = () => {
  const { isLoading, data } = useGetOderRevenueQuery("", {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });


  const { isLoading: isOderQueryLoading, data: orderData } =
    useGetOrderSummaryQuery("", {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    });

  const {
    isLoading: isRecentOrdersLoading,
    data: recentOrderData,

  } = useGetRecentOrdersQuery("", {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });



  const recentOrders = recentOrderData?.data?.orders;

  const isLoadingData =
    isLoading || isOderQueryLoading || isRecentOrdersLoading;

  if (isLoadingData) {
    return <Skeleton count={5} />;
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-lg font-semibold mb-4">Summary</h2>

      {/* Analytics Summary */}
      <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex items-center justify-between p-4">
          <ShoppingCart className="text-[#dedee0] w-8 h-8" />
          <div className="text-right">
            <h2 className="text-xl font-semibold">
              {orderData?.data?.summary?.allOrders}
            </h2>
            <p>Total Orders</p>
          </div>
        </div>
        <div className="flex items-center justify-between p-4">
          <PackageCheck className="text-[#dedee0] w-8 h-8" />
          <div className="text-right">
            <h2 className="text-xl font-semibold">
              {orderData?.data?.summary?.shipped}
            </h2>
            <p>Delivered Orders</p>
          </div>
        </div>

        <div className="flex items-center justify-between p-4">
          <DollarSign className="text-[#dedee0] w-8 h-8" />
          <div className="text-right">
            <h2 className="text-xl font-semibold">{data?.data?.revenue}</h2>
            <p>Total Expense</p>
          </div>
        </div>
      </div>

      <div className="lg:col-span-3">
        {isRecentOrdersLoading ? (
          <Skeleton count={5} height={40} />
        ) : (
          <div>
            <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
            <OrderTable role='customer' orderDta={recentOrders}  />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
