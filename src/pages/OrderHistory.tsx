import { Link } from "react-router-dom";
import ErrorMessage from "../components/ui/ErrorMessage";
import OrdersCard from "../components/ui/OrderCard";
import useOrder from "../hooks/useOrder";

const OrderHistory = () => {
  const { MyOrderData } = useOrder();
  return (
    <div className="flex gap-4 flex-col">
      <div className="py-4">
        <h2 className="text-2xl font-semibold">Order History</h2>
      </div>
      {MyOrderData && MyOrderData?.data.length < 1 && <ErrorMessage> No order  yet <Link to="/user" className="text-orange-400 underline cursor-pointer">Browser here</Link> </ErrorMessage> }
      {MyOrderData &&
        MyOrderData.data.map((item) => <OrdersCard order={item} />)}
    </div>
  );
};

export default OrderHistory;
