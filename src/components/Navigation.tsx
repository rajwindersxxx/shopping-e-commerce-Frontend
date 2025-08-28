import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import CartButton from "./ui/CartButton";
import { HiOutlineLogin, HiOutlineLogout } from "react-icons/hi";
import UserPanel from "./UserPanel";
import useCartStore from "../store/useCartStore";

const Navigation = () => {
  const { logout, role } = useAuthContext();
  const { totalCartItems } = useCartStore();
  return (
    <nav className="flex-1">
      <ul className="flex flex-1 items-center justify-end gap-4">
        {role && <UserPanel />}
        {role !== "ADMIN" && <CartButton totalCartItems={totalCartItems} />}
        <li>
          {role ? (
            <button
              className="flex cursor-pointer items-center gap-2 rounded-full border p-2"
              onClick={() => logout()}
            >
              Logout <HiOutlineLogout size={20} />
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 rounded-full border p-2"
            >
              Login <HiOutlineLogin size={20} />
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
