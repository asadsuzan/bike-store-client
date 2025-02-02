/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router";
import {
  useDeleteOrderMutation,
  useGetOrdersQuery,
  useGetOrderSummaryQuery,
} from "../redux/features/order/orderApi";
import { X, Trash } from "lucide-react";
import {
  Key,
  ReactElement,
  ReactNode,
  JSXElementConstructor,
  ReactPortal,
  useState,
} from "react";
import clsx from "clsx";
import { toast } from "sonner";

const Order = () => {
  const [statusFilter, setStatusFilter] = useState("");
  const [deleteOrder] = useDeleteOrderMutation();

  const { isLoading, data, refetch } = useGetOrdersQuery(
    { status: statusFilter }, // Pass status filter here
    {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );

  const { isLoading: summaryLoading, data: oderSummary } =
    useGetOrderSummaryQuery(undefined, {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    });
  const handleDelete = async (oderId: string) => {
    const id = toast.loading("please wait...");
    try {
      const response: any = await deleteOrder(oderId);
      if (response?.data?.data) {
        toast.success("Order deleted successfully", { id });
        // Refetch orders with the updated status
        refetch();
      }
    } catch (err) {
      console.error("Error deleting order:", err);
      toast.error("Error deleting order", { id });
    }
  };

  if (isLoading || summaryLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>

      {data && data?.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          {/* oder summary  */}

          <div>
            {oderSummary?.success ? (
              <div className="flex gap-5 my-3 overflow-x-auto">
                <p
                  className={clsx(
                    "text-sm font-bold cursor-pointer",
                    statusFilter === "" ? "text-green-500" : "text-gray-700"
                  )}
                  onClick={() => setStatusFilter("")}
                >
                  All Order ({oderSummary?.data?.summary?.allOrders})
                </p>
                <p
                  className={clsx(
                    "text-sm font-bold cursor-pointer",
                    statusFilter === "pending"
                      ? "text-green-500"
                      : "text-gray-700"
                  )}
                  onClick={() => setStatusFilter("pending")}
                >
                  Pending ({oderSummary?.data?.summary?.pending})
                </p>
                <p
                  className={clsx(
                    "text-sm font-bold cursor-pointer",
                    statusFilter === "paid" ? "text-green-500" : "text-gray-700"
                  )}
                  onClick={() => setStatusFilter("paid")}
                >
                  Paid ({oderSummary?.data?.summary?.paid})
                </p>
                <p
                  className={clsx(
                    "text-sm font-bold cursor-pointer",
                    statusFilter === "cancelled"
                      ? "text-green-500"
                      : "text-gray-700"
                  )}
                  onClick={() => setStatusFilter("cancelled")}
                >
                  Cancelled ({oderSummary?.data?.summary?.cancelled})
                </p>
                <p
                  className={clsx(
                    "text-sm font-bold cursor-pointer",
                    statusFilter === "completed"
                      ? "text-green-500"
                      : "text-gray-700"
                  )}
                  onClick={() => setStatusFilter("completed")}
                >
                  Completed ({oderSummary?.data?.summary?.completed})
                </p>
                <p
                  className={clsx(
                    "text-sm font-bold cursor-pointer",
                    statusFilter === "shipped"
                      ? "text-green-500"
                      : "text-gray-700"
                  )}
                  onClick={() => setStatusFilter("shipped")}
                >
                  Shipped ({oderSummary?.data?.summary?.shipped})
                </p>
              </div>
            ) : (
              "null"
            )}
          </div>

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
              {data.data.orders.map(
                (order: {
                  transaction: {
                    id:
                      | boolean
                      | ReactElement<any, string | JSXElementConstructor<any>>
                      | Iterable<ReactNode>
                      | Key
                      | null
                      | undefined;
                    date_time: string | number | Date;
                  };
                  items: any[];
                  totalPrice: number;
                  _id: string;
                  status:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | null
                    | undefined;
                }) => (
                  <tr
                    key={order.transaction.id?.toString() || undefined}
                    className="border-b hover:bg-gray-100"
                  >
                    <td className="py-3 px-4 text-blue-600 underline">
                      <Link
                        to={`/order/verify-order?order_id=${order.transaction.id}`}
                      >
                        #{order.transaction.id?.toString()}
                      </Link>
                    </td>
                    <td className="py-3 px-4">
                      {order?.items.map(
                        (item: {
                          productId: {
                            _id: Key | null | undefined;
                            name:
                              | string
                              | number
                              | boolean
                              | ReactElement<
                                  any,
                                  string | JSXElementConstructor<any>
                                >
                              | Iterable<ReactNode>
                              | ReactPortal
                              | null
                              | undefined;
                          };
                          quantity:
                            | string
                            | number
                            | boolean
                            | ReactElement<
                                any,
                                string | JSXElementConstructor<any>
                              >
                            | Iterable<ReactNode>
                            | ReactPortal
                            | null
                            | undefined;
                        }) => (
                          <div
                            key={item.productId._id}
                            className="flex items-center gap-2"
                          >
                            <Link
                              to={`/product/${item.productId._id}`}
                              className="underline text-blue-500"
                            >
                              {item.productId.name}
                            </Link>
                            <X size={15} className="text-red-500" />
                            <span className="text-[#00a86b] font-semibold">
                              {item.quantity}
                            </span>
                          </div>
                        )
                      )}
                    </td>
                    <td className="py-3 px-4">{order.items.length}</td>
                    <td className="py-3 px-4">
                      ${order.totalPrice.toFixed(2)}
                    </td>
                    <td className="py-3 px-4">
                      {new Date(order?.transaction?.date_time).toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      {/* 'Pending' | 'Paid' | 'Shipped' | 'Completed' | 'Cancelled'; */}
                      <span
                        className={`px-3 py-1 rounded-md text-white ${
                          order.status === "Shipped"
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
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        className=" p-1 rounded-md text-red-900 hover:bg-red-500 cursor-pointer"
                        onClick={() => handleDelete(order._id)}
                      >
                        <Trash size={18} />
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Order;
