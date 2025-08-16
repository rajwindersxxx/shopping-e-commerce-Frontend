import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  checkoutOrder,
  createOrder,
  dispatchOrder,
  getMyOrders,
} from "../api/order";
import useCartStore from "../store/useCartStore";
import toast from "react-hot-toast";

const useOrder = () => {
  const queryclient = useQueryClient();
  const { cartItems, clearCart } = useCartStore();
  const { data: MyOrderData, isLoading: isLoadingMyOrders } = useQuery({
    queryFn: getMyOrders,
    queryKey: ["myOrders"],
  });
  const { data: AllOrderData, isLoading: isLoadingAllOrders } = useQuery({
    queryFn: getMyOrders,
    queryKey: ["Orders"],
  });
  const { mutate: createOrderMutate, isPending: isOrdering } = useMutation({
    mutationFn: async () => {
      const OrderData = cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));
      return await createOrder({ items: OrderData });
    },
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["myOrders"] });
      clearCart();
      toast.success("Order place successfully ");
    },
  });
  const { mutate: checkoutOrderMutate, isPending: isCheckingOut } = useMutation(
    {
      mutationFn: (orderId: number) => checkoutOrder(orderId),
      onSuccess: () => {
        queryclient.invalidateQueries({ queryKey: ["myOrders"] });
        toast.success("Order checkout successfully ");
      },
    },
  );
  const { mutate: dispatchOrderMutate, isPending: isDispatching } = useMutation(
    {
      mutationFn: (orderId: number) => dispatchOrder(orderId),
      onSuccess: () => {
        queryclient.invalidateQueries({ queryKey: ["myOrders"] });
        toast.success("Order dispatch successfully ");
      },
    },
  );
  return {
    MyOrderData,
    isLoadingMyOrders,
    createOrderMutate,
    isOrdering,
    AllOrderData,
    isLoadingAllOrders,
    checkoutOrderMutate,
    isCheckingOut,
    dispatchOrderMutate,
    isDispatching,
  };
};

export default useOrder;
