import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PieChart, Pie, Cell } from "recharts";
import { ShoppingCart, PackageCheck, Users, DollarSign } from "lucide-react";
import {
  useGetOderRevenueQuery,
  useGetOrderSummaryQuery,
  useGetRecentOrdersQuery,
  useGetSellsOverviewQuery,
} from "../redux/features/order/orderApi";
import { useGetCustomerCountQuery } from "../redux/features/auth/authApi";
import OrderTable from "../components/Shared/OrderTable";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const COLORS = ["#FFBF00", "#4CAF50", "#2196F3", "#8BC34A", "#F44336"];

const AdminDashboard = () => {
  const { isLoading, data } = useGetOderRevenueQuery("", {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const { isLoading: isCustomerCountLoading, data: customerData } =
    useGetCustomerCountQuery("", {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    });
  const { isLoading: isOderQueryLoading, data: orderData } =
    useGetOrderSummaryQuery("", {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    });
  const { isLoading: isSellsQueryLoading, data: sellsData } =
    useGetSellsOverviewQuery("", {
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
  const oderSummary = orderData?.data?.summary || {};
  const formattedOrderStatistics = Object.entries(oderSummary)
    .filter(([key]) => key !== "allOrders")
    .map(([key, value]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value,
    }));

  const renderCustomLabel = ({ name }: { name: string }) => name;

  const isLoadingData =
    isLoading ||
    isCustomerCountLoading ||
    isOderQueryLoading ||
    isSellsQueryLoading ||
    isRecentOrdersLoading;

  if (isLoadingData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Skeleton width={100} height={100} />
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-lg font-semibold mb-4">Summary</h2>
      {/* Analytics Summary */}
      <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
          <ShoppingCart className="text-[#FFBF00] w-8 h-8" />
          <div className="text-right">
            <h2 className="text-xl font-semibold">
              {orderData?.data?.summary?.allOrders}
            </h2>
            <p className="text-gray-600">Total Orders</p>
          </div>
        </div>
        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
          <PackageCheck className="text-[#4CAF50] w-8 h-8" />
          <div className="text-right">
            <h2 className="text-xl font-semibold">
              {orderData?.data?.summary?.shipped}
            </h2>
            <p className="text-gray-600">Delivered Orders</p>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
          <Users className="text-[#2196F3] w-8 h-8" />
          <div className="text-right">
            <h2 className="text-xl font-semibold">
              {customerData?.data?.totalCustomers}
            </h2>
            <p className="text-gray-600">Total Customers</p>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
          <DollarSign className="text-[#8BC34A] w-8 h-8" />
          <div className="text-right">
            <h2 className="text-xl font-semibold">{data?.data?.revenue}</h2>
            <p className="text-gray-600">Total Revenue</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-between mt-6 gap-6">
        <div className="flex-1 bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
          {isSellsQueryLoading ? (
            <Skeleton height={250} />
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={sellsData?.data?.salesOverview}>
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip />
                <Bar dataKey="sales" fill="#FFBF00" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="flex-1 bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-semibold mb-4">Order Statistics</h2>
          {isOderQueryLoading ? (
            <Skeleton height={250} />
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={formattedOrderStatistics}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label={renderCustomLabel}
                >
                  {formattedOrderStatistics.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
      <div className="lg:col-span-3 mt-6 bg-white rounded-lg shadow-sm p-4">
        {isRecentOrdersLoading ? (
          <Skeleton count={5} height={40} />
        ) : (
          <div>
            <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
            <OrderTable orderDta={recentOrders} role="admin" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;