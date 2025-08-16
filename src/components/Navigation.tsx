import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import CartButton from "./ui/CartButton";
import { HiOutlineLogin, HiOutlineLogout } from "react-icons/hi";
import UserPanel from "./UserPanel";

const Navigation = () => {
  const { isLoggedIn, logout, userData } = useAuthContext();
  return (
    <nav className="flex-1">
      <ul className="flex flex-1 items-center justify-end gap-4">
        {isLoggedIn && <UserPanel />}
        {userData?.role !== "ADMIN" && <CartButton />}
        <li>
          {isLoggedIn ? (
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
