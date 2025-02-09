import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PieChart, Pie, Cell } from "recharts";
import {
  ShoppingCart,
  PackageCheck,
  Users,
  DollarSign,
  XCircle,
} from "lucide-react";
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
import { useAppSelector } from "../redux/hooks";
import { useCurrentUser } from "../redux/features/auth/authSlice";
import AnalyticsSummaryCard from "../components/Shared/AnalyticsSummaryCard";
import AnalyticsSummaryCardSkeleton from "../components/skeleton/AnalyticsSummaryCardSkeleton";
import { generateArray } from "../utils";
import SalesOverviewSkeleton from "../components/skeleton/SalesOverviewSkeleton";
import OrderStatisticsSkeleton from "../components/skeleton/OrderStatisticsSkeleton";
import NoDataFound from "../components/Shared/NoDataFound";

const COLORS = ["#FFBF00", "#4CAF50", "#2196F3", "#8BC34A", "#F44336"];

const Dashboard = () => {
  const user = useAppSelector(useCurrentUser);
  const role = user?.role as "admin" | "customer";
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
  const { isLoading: isRecentOrdersLoading, data: recentOrderData } =
    useGetRecentOrdersQuery("", {
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

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-lg font-semibold mb-4">Summary</h2>
      {/* Analytics Summary */}
      <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoadingData ? (
          generateArray(4).map((index) => (
            <AnalyticsSummaryCardSkeleton key={index} />
          ))
        ) : (
          <>
            {" "}
            <AnalyticsSummaryCard
              icon={ShoppingCart}
              value={orderData?.data?.summary?.allOrders || 0}
              label="Total Orders"
              iconColor="#FFBF00"
            />
            <AnalyticsSummaryCard
              icon={PackageCheck}
              value={orderData?.data?.summary?.shipped || 0}
              label="Delivered Orders"
              iconColor="#4CAF50"
            />
            {role && role === "admin" && (
              <AnalyticsSummaryCard
                icon={Users}
                value={customerData?.data?.totalCustomers || 0}
                label="Total Customers"
                iconColor="#2196F3"
              />
            )}
            {role && role === "customer" && (
              <AnalyticsSummaryCard
                icon={XCircle}
                value={orderData?.data?.summary?.cancelled || 0}
                label="Cancelled Orders"
                iconColor="red"
              />
            )}
            <AnalyticsSummaryCard
              icon={DollarSign}
              value={(data?.data?.revenue ?? 0).toFixed(2)}
              label={`Total ${role === "admin" ? "Revenue" : "Expanse"}`}
              iconColor="#8BC34A"
            />
          </>
        )}
      </div>

      {/* charts  */}
      <div className="flex flex-col lg:flex-row justify-between mt-6 gap-6">
        {/* "Sales Overview" or "user Expense" Bar chart*/}
        {isLoadingData ? (
          <SalesOverviewSkeleton />
        ) : (
          <div className="flex-1 bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-4">
              {role && role === "admin" ? "Sales Overview" : "Your Expense"}
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={sellsData?.data?.salesOverview}>
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip />
                <Bar dataKey={"sales"} fill="#FFBF00" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
        {/* Order Statistics */}
        {isLoadingData ? (
          <OrderStatisticsSkeleton />
        ) : (
          <div className="flex-1 bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-4">Order Statistics</h2>
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
                  {formattedOrderStatistics.map((_entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* recent orders */}
      <div className="lg:col-span-3 mt-6 bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
        {isLoading ? (
          <Skeleton count={5} height={40} />
        ) : recentOrders?.length === 0 ? <NoDataFound/>:(
          <div>
           
            <OrderTable orderDta={recentOrders} role={role} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
