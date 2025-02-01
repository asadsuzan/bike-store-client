import { useLocation } from "react-router";

const VerifyOrder = () => {
  const location = useLocation();

  // Extract the order_id from the query string
  const searchParams = new URLSearchParams(location.search);
  const order_id = searchParams.get("order_id");
  return <div>VerifyOrder order id :{order_id}</div>;
};

export default VerifyOrder;
