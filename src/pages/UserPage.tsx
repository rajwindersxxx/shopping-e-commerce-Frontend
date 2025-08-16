import { Link } from "react-router-dom";
import CartItemsList from "../components/CartItmsList";
import ConfirmModel from "../components/ui/ConfirmModel";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { SecondaryButton } from "../components/ui/SecondaryButton";
import { useAuthContext } from "../context/AuthContext";
import { useModal } from "../context/ModalContext";
import useOrder from "../hooks/useOrder";
import useCartStore from "../store/useCartStore";

const UserPage = () => {
  const { cartItems } = useCartStore();
  const { openModal } = useModal();
  const { isLoggedIn } = useAuthContext();
  const { createOrderMutate, isOrdering } = useOrder();
  function handleOrder() {
    if (isLoggedIn) createOrderMutate();
    if (!isLoggedIn)
      return openModal(
        <ConfirmModel
          message="You need to login to place Order"
          type="message"
        />,
        "LoginMessage",
      );
  }
  return (
    <>
      <div className="flex items-center justify-between pr-4">
        <h2 className="p-4 text-2xl font-semibold">CART ITEMS</h2>
        <div className="flex items-center justify-center gap-4">
          {cartItems.length > 0 && (
            <PrimaryButton onClick={handleOrder} disabled={isOrdering}>
              Place Order
            </PrimaryButton>
          )}
          <Link to="/user/history">
            <SecondaryButton>Order history</SecondaryButton>
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto p-4">
        <CartItemsList />
      </div>
    </>
  );
};

export default UserPage;
