import { HiOutlineShoppingCart } from "react-icons/hi";
import { Link } from "react-router-dom";
import useCartStore from "../../store/useCartStore";

const CartButton = () => {
  const { totalCartItems } = useCartStore();
  if (totalCartItems() > 0)
    return (
      <Link to={"/user"} className="relative">
        <HiOutlineShoppingCart className="h-8 w-8 rounded-full border p-1 text-orange-400" />
        <>
          <span className="bg-natural-cream absolute -right-1 -bottom-1 flex min-h-4 min-w-4 items-center justify-center rounded-full bg-white text-xs text-orange-400 shadow-xs">
            {totalCartItems()}
          </span>
        </>
      </Link>
    );
};

export default CartButton;
