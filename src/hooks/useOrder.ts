import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  checkoutOrder,
  createOrder,
  dispatchOrder,

} from "../api/order";
import useCartStore from "../store/useCartStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useModal } from "../context/ModalContext";


const useOrder = () => {
  const queryclient = useQueryClient();

  const navigate = useNavigate();
  const { closeModal } = useModal();
  const { cartItems, clearCart } = useCartStore();
  const { mutate: createOrderMutate, isPending: isOrdering } = useMutation({
    mutationFn: async () => {
      //* temp fix
      const OrderData = cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));
      return await createOrder({ items: OrderData });
    },
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["myOrders"] });
      clearCart();
      closeModal();
      toast.success("Order place successfully ");
      navigate("/user/history");
    },
  });
  const { mutate: checkoutOrderMutate, isPending: isCheckingOut } = useMutation(
    {
      mutationFn: (orderId: number) => checkoutOrder(orderId),
      onSuccess: () => {
        queryclient.invalidateQueries({ queryKey: ["myOrders"] });
        toast.success("Order checkout successfully ");
        closeModal();
      },
    },
  );
  const { mutate: dispatchOrderMutate, isPending: isDispatching } = useMutation(
    {
      mutationFn: (orderId: number) => dispatchOrder(orderId),
      onSuccess: () => {
        queryclient.invalidateQueries({ queryKey: ["Orders"] });
        toast.success("Order dispatch successfully ");
        closeModal();
      },
    },
  );
  return {
    createOrderMutate,
    isOrdering,
    checkoutOrderMutate,
    isCheckingOut,
    dispatchOrderMutate,
    isDispatching,
  };
};

export default useOrder;
