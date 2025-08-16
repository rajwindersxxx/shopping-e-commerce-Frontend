import { Link } from "react-router-dom";
import ErrorMessage from "../components/ui/ErrorMessage";
import OrdersCard from "../components/ui/OrderCard";
import useOrder from "../hooks/useOrder";
import { useModal } from "../context/ModalContext";
import ConfirmModel from "../components/ui/ConfirmModel";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { useQuery } from "@tanstack/react-query";
import { getMyOrders } from "../api/order";
import Spinner from "../components/ui/Spinner";

const OrderHistory = () => {
  const { checkoutOrderMutate } = useOrder();
  const { data: MyOrderData, isLoading: isLoadingMyOrders } = useQuery({
    queryFn: getMyOrders,
    queryKey: ["myOrders"],
  });
  const { openModal } = useModal();
  function handleOrder(id: number) {
    openModal(
      <ConfirmModel
        type="confirm"
        message={`Do you want to checkout Order #${id}`}
        confirmDelete={() => checkoutOrderMutate(id)}
      />,
      "CheckoutModel",
    );
  }
  if (isLoadingMyOrders) return <Spinner />;
  return (
    <div className="flex flex-col gap-4">
      <div className="py-4">
        <h2 className="text-2xl font-semibold">Order History</h2>
      </div>
      {MyOrderData && MyOrderData?.data.length < 1 && (
        <ErrorMessage>
          {" "}
          No order yet{" "}
          <Link to="/user" className="cursor-pointer text-orange-400 underline">
            Browser here
          </Link>{" "}
        </ErrorMessage>
      )}
      {MyOrderData &&
        MyOrderData.data.map((item) => (
          <OrdersCard order={item} key={item.id}>
            {item.status === "PENDING" && (
              <PrimaryButton
                className="float-end"
                onClick={() => handleOrder(item.id)}
              >
                Checkout
              </PrimaryButton>
            )}
          </OrdersCard>
        ))}
    </div>
  );
};

export default OrderHistory;
