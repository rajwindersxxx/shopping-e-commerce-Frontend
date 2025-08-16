import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import ProfilePic from "./ui/ProfilePic";

const UserPanel = () => {
  const { userData } = useAuthContext();

  return (
    <Link
      to={userData?.role === "ADMIN" ? "/admin" : "user"}
      className="flex items-center gap-8"
    >
      <div className="grid grid-cols-[auto_1fr] grid-rows-2 items-center gap-x-4">
        <ProfilePic image={undefined} />
        <p className="text-sm">
          <span className="font-semibold text-orange-400">
            {" "}
            {userData?.name}
          </span>
        </p>
        <p className="text-sm text-gray-500">{userData?.email}</p>
      </div>
    </Link>
  );
};

export default UserPanel;
