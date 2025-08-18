import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Spinner from "./ui/Spinner";

interface ProtectedRouteProps {
  allowedRoles?: string[];
  redirectTo?: string;
}

const ProtectedRoute = ({
  allowedRoles,
  redirectTo = "/login",
}: ProtectedRouteProps) => {
  const { isLoggingIn, role,  userData, isVerifying } = useAuthContext();
  if (isLoggingIn || isVerifying) return <Spinner />;
  // 2. Redirect I there is no role
  if (!userData?.role) return <Navigate to="/login" />;

  // 3. Redirect if role not allowed
  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return <Navigate to={redirectTo} />;
  }

  // 4. All good, render nested routes
  return <Outlet />;
};

export default ProtectedRoute;
