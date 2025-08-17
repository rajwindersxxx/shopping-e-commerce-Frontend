import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Spinner from "./ui/Spinner";

interface ProtectedRouteProps {
  allowedRoles?: string[];
  redirectTo?: string;
}

const ProtectedRoute = ({ allowedRoles, redirectTo = "/login" }: ProtectedRouteProps) => {
  const { isLoggedIn, isVerifying, userData, isLoggingIn } = useAuthContext();

  // 1. Wait for context to initialize (token read)
  if (isLoggingIn && isVerifying) return <Spinner />;

  // 2. Redirect if not logged in
  if (!isLoggedIn) return <Navigate to="/login" />;

  // 3. Redirect if role not allowed
  if (allowedRoles && userData?.role && !allowedRoles.includes(userData.role)) {
    return <Navigate to={redirectTo} />;
  }

  // 4. All good, render nested routes
  return <Outlet />;
};

export default ProtectedRoute;
