/* eslint-disable @typescript-eslint/no-explicit-any */
import { Trash, X } from "lucide-react";

import { Link } from "react-router";
import NoDataFound from "./NoDataFound";
import { useDeleteOrderMutation, useUpdateOrderStatusMutation } from "../../redux/features/order/orderApi";
import { toast } from "sonner";

interface Order {
  transaction: {
    id: string;
    date_time: string;
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
  switch (status) {
    case "Pending":
      return "bg-[#FFA500] text-white";
    case "Paid":
      return "bg-[#28a745] text-white";
    case "Shipped":
      return "bg-[#007bff] text-white";
    case "Completed":
      return "bg-[#6c757d] text-white";
    case "Cancelled":
      return "bg-red-500 text-white";
    default:
      return "bg-gray-200";
  }
};

const OrderTable: React.FC<OrderTableProps> = ({
  orderDta,
  role,
}) => {
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    const toastId = toast.loading("Please wait...");
    try {
      const response = await updateOrderStatus({
        orderId,
        status: newStatus,
      }).unwrap();
      if (response?.success) {
        toast.success("Order status updated successfully", {
          id: toastId,
        });
  
      }
    } catch (err: any) {
      const message = err?.data?.message;
      toast.error(message || `Failed to update status`, {
        id: toastId,
      });
    }
  };
  const handleDelete = async (orderId: string) => {
    const id = toast.loading("Deleting order...");
    try {
      const response: any = await deleteOrder(orderId);
      if (response?.data?.data) {
        toast.success("Order deleted successfully", { id });
     
      }
    } catch (err) {
      console.error("Error deleting order:", err);
      toast.error("Error deleting order", { id });
    }
  };

  return (
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
          {orderDta?.map((order) => (
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
                {order?.items?.map((item) => (
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
              <td className="py-3 px-4">${order?.totalPrice?.toFixed(2)}</td>
              <td className="py-3 px-4">
                {new Date(order?.transaction?.date_time)?.toLocaleString()}
              </td>

              {role === "customer" && (
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-md text-white  ${getStatusColorClass(
                      order.status
                    )}`}
                  >
                    {order?.status}
                  </span>
                </td>
              )}

              {role === "admin" && (
                <td className="py-3 px-4">
                  <select
                    value={order.status}
                    className={`p-2 border rounded-md ${getStatusColorClass(
                      order.status
                    )}`}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                  >
                    <option value="Pending" className="text-black">
                      Pending
                    </option>
                    <option value="Paid" className="text-black">
                      Paid
                    </option>
                    <option value="Shipped" className="text-black">
                      Shipped
                    </option>
                    <option value="Completed" className="text-black">
                      Completed
                    </option>
                    <option value="Cancelled" className="text-black">
                      Cancelled
                    </option>
                  </select>
                </td>
              )}

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

      {
        // Display a message if no orders found
        orderDta?.length === 0 && <NoDataFound />
      }
    </div>
  );
};

export default OrderTable;
