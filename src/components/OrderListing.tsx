import { useModal } from "../context/ModalContext";
import useOrder from "../hooks/useOrder";
import type { OrderData } from "../types/order.types";
import ConfirmModel from "./ui/ConfirmModel";
import ErrorMessage from "./ui/ErrorMessage";
import OrdersCard from "./ui/OrderCard";
import { PrimaryButton } from "./ui/PrimaryButton";

interface props {
  orderData: OrderData[];
}
const OrderListing = ({ orderData }: props) => {
  const { openModal } = useModal();
  const { dispatchOrderMutate } = useOrder();
  function handleOrder(id: number) {
    openModal(
      <ConfirmModel
        type="confirm"
        message={`Do you want to dispatch Order #${id}`}
        confirmDelete={() => dispatchOrderMutate(id)}
      />,
      "CheckoutModel",
    );
  }
  return (
    <>
      {orderData && orderData?.length < 1 && (
        <ErrorMessage> No order yet </ErrorMessage>
      )}
      {orderData &&
        orderData.map((item) => (
          <OrdersCard order={item} key={item.id}>
            {item.status === "PAID" && (
              <PrimaryButton
                className="float-end"
                onClick={() => handleOrder(item.id)}
              >
                Despatch
              </PrimaryButton>
            )}
          </OrdersCard>
        ))}
    </>
  );
};

export default OrderListing;
