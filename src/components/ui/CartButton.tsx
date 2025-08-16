import { HiOutlineShoppingCart } from "react-icons/hi";
import { Link } from "react-router-dom";
import useCartStore from "../../store/useCartStore";

const CartButton = () => {
  const { totalCartItems } = useCartStore();
  return (
    <Link to={"/user"} className="relative">
      <HiOutlineShoppingCart className="h-8 w-8 text-orange-400 border rounded-full p-1" />
      <>
        <span className="bg-natural-cream absolute -right-1 -bottom-1 flex min-h-4 min-w-4 items-center justify-center rounded-full text-orange-400 bg-white text-xs shadow-xs">
          {totalCartItems()}
        </span>
      </>
    </Link>
  );
};

export default CartButton;
