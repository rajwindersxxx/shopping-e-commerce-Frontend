import OrdersCard from "../components/ui/OrderCard";
import useOrder from "../hooks/useOrder";

const OrderHistory = () => {
  const { MyOrderData } = useOrder();
  return (
    <div className="flex gap-4 flex-col">
      <div className="py-4">
        <h2 className="text-2xl font-semibold">Order History</h2>
      </div>
      {MyOrderData &&
        MyOrderData.data.map((item) => <OrdersCard order={item} />)}
    </div>
  );
};

export default OrderHistory;
