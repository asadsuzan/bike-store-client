/* eslint-disable @typescript-eslint/no-explicit-any */
import { Trash, } from "lucide-react";
import { Link } from "react-router";
import NoDataFound from "./NoDataFound";
import { useDeleteOrderMutation, useUpdateOrderStatusMutation } from "../../redux/features/order/orderApi";
import { toast } from "sonner";
import { useState } from "react";
// import LoadingSpinner from "../shared/LoadingSpinner";

interface Order {
  transaction: {
    id: string;
    date_time: string;
  };
  user: {
    _id: string;
    name: string;
  };
  items: {
    productId: {
      _id: string;
      name: string;
    };
    quantity: number;
  }[];
  totalPrice: number;
  status: string;
  _id: string;
}

interface OrderTableProps {
  orderDta: Order[];
  role: "admin" | "customer";
}

const getStatusColorClass = (status: string) => {
  const statusColors = {
    Pending: "bg-[#FFA500]",
    Paid: "bg-[#28a745]",
    Shipped: "bg-[#007bff]",
    Completed: "bg-[#6c757d]",
    Cancelled: "bg-red-500"
  };
  return statusColors[status as keyof typeof statusColors] || "bg-gray-200";
};

const OrderTable: React.FC<OrderTableProps> = ({ orderDta, role }) => {
  const [updateOrderStatus, { isLoading: isUpdating }] = useUpdateOrderStatusMutation();
  const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    const toastId = toast.loading("Updating order status...");
    try {
      const response = await updateOrderStatus({ orderId, status: newStatus }).unwrap();
      if (response?.success) {
        toast.success("Order status updated successfully", { id: toastId });
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update status", { id: toastId });
    }
  };

  const handleDelete = async (orderId: string) => {
    setDeletingId(orderId);
    const id = toast.loading("Deleting order...");
    try {
      const response: any = await deleteOrder(orderId);
      if (response?.data?.data) {
        toast.success("Order deleted successfully", { id });
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to deleting Order", { id: id });
    } finally {
      setDeletingId(null);
    }
  };

  const StatusBadge = ({ status }: { status: string }) => (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColorClass(status)} text-white`}
    >
      {status}
    </span>
  );

  return (
    <div className="overflow-x-auto rounded-lg border shadow-sm">
      <table className="w-full min-w-[800px] md:min-w-0">
        <thead className="bg-gray-50">
          <tr className="text-left">
            <th className="p-4 font-medium">Order ID</th>
            <th className="p-4 font-medium">Products</th>
            <th className="p-4 font-medium hidden sm:table-cell">Qty</th>
            <th className="p-4 font-medium">Total</th>
            <th className="p-4 font-medium hidden md:table-cell">Time</th>
            {role === 'admin' && <th className="p-4 font-medium hidden lg:table-cell">Customer</th>}
            <th className="p-4 font-medium">Status</th>
            <th className="p-4 font-medium">Actions</th>
          </tr>
        </thead>
        
        <tbody className="divide-y">
          {orderDta?.map((order) => (
            <tr key={order._id} className="hover:bg-gray-50 transition-colors">
              {/* Order ID */}
              <td className="p-4 text-blue-600 font-medium">
                <Link
                  to={`/order/verify-order?order_id=${order.transaction.id}`}
                  className="hover:underline"
                >
                  #{order.transaction.id.slice(0, 8)}
                </Link>
              </td>

              {/* Products */}
              <td className="p-4 space-y-2">
                {order.items.map((item) => (
                  <div key={item.productId._id} className="flex items-center gap-2">
                    <Link
                      to={`/product/${item.productId._id}`}
                      className="text-blue-500 hover:underline line-clamp-1"
                    >
                      {item.productId.name}
                    </Link>
                    <span className="text-gray-500">×</span>
                    <span className="text-green-600 font-medium">
                      {item.quantity}
                    </span>
                  </div>
                ))}
              </td>

              {/* Quantity */}
              <td className="p-4 hidden sm:table-cell">
                {order.items.length}
              </td>

              {/* Total */}
              <td className="p-4 font-medium">
                ${order.totalPrice.toFixed(2)}
              </td>

              {/* Time */}
              <td className="p-4 hidden md:table-cell">
                {new Date(order.transaction.date_time).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </td>

              {/* Customer (Admin only) */}
              {role === 'admin' && (
                <td className="p-4 hidden lg:table-cell">
                  <span className="line-clamp-1" title={order.user.name}>
                    {order.user.name}
                  </span>
                </td>
              )}

              {/* Status */}
              <td className="p-4">
                {role === "customer" ? (
                  <StatusBadge status={order.status} />
                ) : (
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getStatusColorClass(order.status)} cursor-pointer appearance-none focus:ring-2 focus:ring-opacity-50`}
                    disabled={isUpdating}
                  >
                    {["Pending", "Paid", "Shipped", "Completed", "Cancelled"].map((status) => (
                      <option
                        key={status}
                        value={status}
                        className={`${getStatusColorClass(status)} text-white`}
                      >
                        {status}
                      </option>
                    ))}
                  </select>
                )}
              </td>

              {/* Actions */}
              <td className="p-4">
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this order?")) {
                      handleDelete(order._id);
                    }
                  }}
                  disabled={isDeleting && deletingId === order._id}
                  className="p-2 hover:bg-red-100 rounded-full transition-colors text-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Delete order"
                >
                  {isDeleting && deletingId === order._id ? (
                   <>loading</>
                  ) : (
                    <Trash size={18} />
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {orderDta?.length === 0 && <NoDataFound  />}
    </div>
  );
};

export default OrderTable;