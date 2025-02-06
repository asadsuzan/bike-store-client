import { Trash, X } from "lucide-react";

import { Link } from "react-router";
import NoDataFound from "./NoDataFound";

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
  handleDelete: (id: string) => void;
}

const OrderTable: React.FC<OrderTableProps> = ({ orderDta, handleDelete }) => {
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

      {
        // Display a message if no orders found
        orderDta.length === 0 && <NoDataFound />
      }
    </div>
  );
};

export default OrderTable;
