import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

interface Order {
  id: number;
  product: string;
  quantity: number;
  status: string;
}

const Order = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      const fakeOrders: Order[] = [
        { id: 1, product: "Laptop", quantity: 1, status: "Shipped" },
        { id: 2, product: "Headphones", quantity: 2, status: "Processing" },
        { id: 3, product: "Smartphone", quantity: 1, status: "Delivered" },
      ];
      setOrders(fakeOrders);
    };

    fetchOrders();
  }, []);

  const handleDelete = (orderId: number) => {
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.id !== orderId)
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="p-4">
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden bg-gray-800 text-white p-2 rounded-md"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Table Section */}
        <h1 className="text-2xl font-bold mb-4 mt-4">User Orders Dashboard</h1>

        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white border text-sm md:text-base">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 border">Order ID</th>
                  <th className="py-2 px-4 border">Product</th>
                  <th className="py-2 px-4 border">Quantity</th>
                  <th className="py-2 px-4 border">Status</th>
                  <th className="py-2 px-4 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="py-2 px-4 border">{order.id}</td>
                    <td className="py-2 px-4 border">{order.product}</td>
                    <td className="py-2 px-4 border">{order.quantity}</td>
                    <td className="py-2 px-4 border">{order.status}</td>
                    <td className="py-2 px-4 border">
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
