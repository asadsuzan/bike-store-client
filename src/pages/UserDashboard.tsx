/* eslint-disable @typescript-eslint/no-explicit-any */

import { ShoppingCart, PackageCheck, DollarSign } from "lucide-react";
import {
  useDeleteOrderMutation,
  useGetOderRevenueQuery,
  useGetOrderSummaryQuery,
  useGetRecentOrdersQuery,
} from "../redux/features/order/orderApi";

import { toast } from "sonner";
import OrderTable from "../components/Shared/OrderTable";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import React from "react";

const UserDashboard = () => {
  const { isLoading, data } = useGetOderRevenueQuery("", {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const [deleteOrder] = useDeleteOrderMutation();

  const { isLoading: isOderQueryLoading, data: orderData } =
    useGetOrderSummaryQuery("", {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    });

  const {
    isLoading: isRecentOrdersLoading,
    data: recentOrderData,
    refetch,
  } = useGetRecentOrdersQuery("", {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const handleDelete = async (orderId: string) => {
    const id = toast.loading("Deleting order...");
    try {
      const response: any = await deleteOrder(orderId);
      if (response?.data?.data) {
        toast.success("Order deleted successfully", { id });
        refetch();
      }
    } catch (err) {
      console.error("Error deleting order:", err);
      toast.error("Error deleting order", { id });
    }
  };

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
            <OrderTable orderDta={recentOrders} handleDelete={handleDelete} />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
