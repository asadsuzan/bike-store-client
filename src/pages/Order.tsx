/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Link } from "react-router";
import {
  useDeleteOrderMutation,
  useGetOrdersQuery,
  useGetOrderSummaryQuery,
} from "../redux/features/order/orderApi";
import { X, Trash, History } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
import { toast } from "sonner";
import NoDataFound from "../components/Shared/NoDataFound";

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
        <div className="overflow-x-auto">
          <table className="w-full bg-white text-sm md:text-base rounded-lg shadow-md">
            <thead className="bg-gray-200 text-left">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Quantity</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.orders.map((order: Order) => (
                <tr
                  key={order?.transaction?.id?.toString()}
                  className="border-b hover:bg-gray-100"
                >
                  <td className="py-3 px-4 text-blue-600 underline">
                    <Link
                      to={`/order/verify-order?order_id=${order?.transaction?.id}`}
                    >
                      #{order?.transaction?.id?.toString()}
                    </Link>
                  </td>
                  <td className="py-3 px-4">
                    {order?.items?.map((item: OrderItem) => (
                      <div
                        key={item?.productId?._id}
                        className="flex items-center gap-2"
                      >
                        <Link
                          to={`/product/${item?.productId?._id}`}
                          className="underline text-blue-500"
                        >
                          {item?.productId?.name}
                        </Link>
                        <X size={15} className="text-red-500" />
                        <span className="text-[#00a86b] font-semibold">
                          {item?.quantity}
                        </span>
                      </div>
                    ))}
                  </td>
                  <td className="py-3 px-4">{order?.items?.length}</td>
                  <td className="py-3 px-4">
                    ${order?.totalPrice?.toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    {new Date(order?.transaction?.date_time)?.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-md text-white ${
                        order?.status === "Shipped"
                          ? "bg-[#007bff]"
                          : order.status === "Pending"
                          ? "bg-[#FFA500]"
                          : order.status === "Paid"
                          ? "bg-[#28a745]"
                          : order.status === "Completed"
                          ? "bg-[#6c757d]"
                          : "bg-red-500"
                      }`}
                    >
                      {order?.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      className="p-1 rounded-md text-red-900 hover:bg-red-500 cursor-pointer"
                      onClick={() => handleDelete(order?._id)}
                    >
                      <Trash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Order;
