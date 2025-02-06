/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import {
  useDeleteOrderMutation,
  useGetOrdersQuery,
  useGetOrderSummaryQuery,
} from "../redux/features/order/orderApi";
import { History } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
import { toast } from "sonner";
import NoDataFound from "../components/Shared/NoDataFound";
import OrderTable from "../components/Shared/OrderTable";

type OrderItem = {
  productId: {
    _id: string;
    name: string;
  };
  quantity: number;
};

type Order = {
  transaction: {
    id: string;
    date_time: string;
  };
  items: OrderItem[];
  totalPrice: number;
  status: string;
  _id: string;
};

const Order = () => {
  const [statusFilter, setStatusFilter] = useState("");
  const [deleteOrder] = useDeleteOrderMutation();

  const { isLoading, data, refetch, isFetching } = useGetOrdersQuery(
    { status: statusFilter },
    {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );

  const {
    isLoading: summaryLoading,
    data: oderSummary,
    isFetching: isSummaryDataFetching,
  } = useGetOrderSummaryQuery(undefined, {
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

  const renderSkeleton = (count: number) => (
    <div className="animate-pulse">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="h-6 my-2 bg-gray-300 rounded-md "></div>
      ))}
    </div>
  );

  return (
    <div className="bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-[#00283a] mb-4 flex items-center">
        <History className="mr-2" /> Order History
      </h1>

      {summaryLoading || isSummaryDataFetching ? (
        <div>{renderSkeleton(5)}</div>
      ) : (
        oderSummary?.success && (
          <div className="flex gap-5 my-3 overflow-x-auto">
            {[
              {
                label: "All Order",
                status: "",
                count: oderSummary?.data?.summary?.allOrders,
              },
              {
                label: "Pending",
                status: "pending",
                count: oderSummary?.data?.summary?.pending,
              },
              {
                label: "Paid",
                status: "paid",
                count: oderSummary?.data?.summary?.paid,
              },
              {
                label: "Cancelled",
                status: "cancelled",
                count: oderSummary?.data?.summary?.cancelled,
              },
              {
                label: "Completed",
                status: "completed",
                count: oderSummary?.data?.summary?.completed,
              },
              {
                label: "Shipped",
                status: "shipped",
                count: oderSummary?.data?.summary?.shipped,
              },
            ].map(({ label, status, count }) => (
              <p
                key={status}
                className={clsx(
                  "text-sm font-bold cursor-pointer",
                  statusFilter === status ? "text-green-500" : "text-gray-700"
                )}
                onClick={() => setStatusFilter(status)}
              >
                {label} ({count})
              </p>
            ))}
          </div>
        )
      )}

      {isLoading || isFetching ? (
        <div className="mt-4">{renderSkeleton(10)}</div>
      ) : data?.data?.orders?.length === 0 ? (
        <NoDataFound />
      ) : (
        <OrderTable orderDta={data?.data?.orders} handleDelete={handleDelete} />
      )}
    </div>
  );
};

export default Order;
