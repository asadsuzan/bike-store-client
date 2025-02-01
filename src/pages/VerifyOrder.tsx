import { Link, useLocation, useNavigate } from "react-router";
import { useVerifyOrderQuery } from "../redux/features/order/orderApi";

import { CheckCircle, TriangleAlert } from "lucide-react";
import clsx from "clsx";
const VerifyOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Extract the order_id from the query string
  const searchParams = new URLSearchParams(location.search);
  const order_id = searchParams.get("order_id");
  const { isLoading, data } = useVerifyOrderQuery(order_id, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true, // Fetch the order details again whenever the order_id changes
  });
  // const { isLoading, data } = useGetOrdersQuery("");
  if (isLoading) return <div>Loading...</div>;

  const paymentData = data?.data?.verifiedPayment[0];
  if (
    data?.data?.verifiedPayment[0]?.message === "Please check your order id" ||
    data?.data?.verifiedPayment[0]?.sp_code === "1011"
  ) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <TriangleAlert className="w-8 h-8 text-red-500" />
        <h1 className="text-2xl font-bold text-red-500 mt-4">
          Order Verification Failed
        </h1>
        <p className="text-sm text-gray-500">
          The order ID you provided is invalid or has already been verified.
          Please try again. <Link to="/dashboard/orders">view orders</Link>
        </p>
      </div>
    );
  }
  console.log(paymentData);

  return (
    <div className="container mx-auto p-6  min-h-screen flex justify-center items-center">
      <div className="w-full max-w-4xl p-6 border rounded-2xl shadow-xl bg-white">
        <h1 className="text-2xl font-semibold text-green-500 mb-4 text-center">
          Order Verification Success
        </h1>
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div className="border p-4 rounded-lg bg-gray-50">
            <h2 className="font-semibold mb-2">Order Details</h2>
            <p>
              <strong>Order ID:</strong> {paymentData && paymentData?.order_id}
            </p>
            <p>
              <strong>Amount:</strong> BDT{" "}
              {(paymentData && (paymentData?.amount as number)).toFixed(2)}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={clsx(
                  " text-white px-2 py-1 rounded-full",
                  paymentData?.bank_status == "Failed"
                    ? "bg-red-500"
                    : "bg-green-400"
                )}
              >
                {paymentData && paymentData?.bank_status}
              </span>
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(paymentData?.date_time)?.toLocaleString()}
            </p>
          </div>
          <div className="border p-4 rounded-lg bg-gray-50">
            <h2 className="font-semibold mb-2">Payment Information</h2>
            <p>
              <strong>Method:</strong> {paymentData?.method}
            </p>
            <p>
              <strong>Transaction ID:</strong>{" "}
              {paymentData?.bank_trx_id || "N/A"}
            </p>
            <p>
              <strong>Invoice No:</strong> {paymentData?.invoice_no}
            </p>
            <p>
              <strong>SP Code:</strong> {paymentData?.sp_code}
            </p>
            <p>
              <strong>SP Message:</strong> {paymentData?.sp_message}
            </p>
          </div>
          <div className="border p-4 rounded-lg bg-gray-50">
            <h2 className="font-semibold mb-2">Customer Information</h2>
            <p>
              <strong>Name:</strong> {paymentData?.name}
            </p>
            <p>
              <strong>Email:</strong> {paymentData?.email}
            </p>
            <p>
              <strong>Phone:</strong>
              {paymentData?.phone_no || "N/A"}
            </p>
            <p>
              <strong>Address:</strong> {paymentData?.address || "N/A"}
            </p>
            <p>
              <strong>City:</strong>
              {paymentData?.city || "N/A"}
            </p>
          </div>
          <div className="border p-4 rounded-lg bg-gray-50 flex flex-col items-center">
            <h2 className="font-semibold mb-2">Verification Status</h2>
            <div
              className={clsx(
                "flex items-center text-green-600 mb-2",
                paymentData?.bank_status == "Failed"
                  ? "text-red-600"
                  : "text-green-600"
              )}
            >
              {paymentData?.bank_status === "Failed" ? (
                <TriangleAlert className="w-5 h-5 mr-1" />
              ) : (
                <CheckCircle className="w-5 h-5 mr-1" />
              )}
              {paymentData?.bank_status}
            </div>
            <button
              onClick={() => navigate("/shop")}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOrder;
