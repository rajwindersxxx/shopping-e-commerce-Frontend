import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

interface ProtectedRouteProps {
  allowedRoles?: string[];
  redirectTo?: string;
}

const ProtectedRoute = ({ allowedRoles, redirectTo = "/login" }: ProtectedRouteProps) => {
  const { isLoggedIn, isVerifying, userData } = useAuthContext();

  if (!isLoggedIn && !isVerifying) return <Navigate to="/login" />;

  if (allowedRoles && userData?.role && !allowedRoles.includes(userData.role)) {
    return <Navigate to={redirectTo} />;
  }

  return <Outlet />; //  nested routes render
};

export default ProtectedRoute;
