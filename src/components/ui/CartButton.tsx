import { HiOutlineShoppingCart } from "react-icons/hi";
import { Link } from "react-router-dom";
import useCartStore from "../../store/useCartStore";

const CartButton = () => {
  const { totalCartItems } = useCartStore();
  return (
    <Link to={"/cart"} className="relative">
      <HiOutlineShoppingCart className="h-5 w-5" />
      <>
        <span className="bg-natural-cream absolute -right-2 -bottom-2 flex min-h-4 min-w-4 items-center justify-center rounded-full bg-gray-200 text-xs">
          {totalCartItems()}
        </span>
      </>
    </Link>
  );
};

export default CartButton;
