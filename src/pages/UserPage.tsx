import { Link, useNavigate } from "react-router-dom";
import CartItemsList from "../components/CartItmsList";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { SecondaryButton } from "../components/ui/SecondaryButton";
import { useAuthContext } from "../context/AuthContext";
import useOrder from "../hooks/useOrder";
import useCartStore from "../store/useCartStore";

const UserPage = () => {
  const { cartItems } = useCartStore();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthContext();
  const { createOrderMutate, isOrdering } = useOrder();
  function handleOrder() {
    if (!isLoggedIn) return navigate("/login");
    createOrderMutate();
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
