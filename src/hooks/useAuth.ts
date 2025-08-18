import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAuthDetails, loginUser, logoutUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import type { Login } from "../types/auth.type";
import { useEffect, useState } from "react";

const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [role, setRole] = useState<"ADMIN" | "USER" | null>(null);
  // Fetch current user
  const { data: userData, isFetching: isVerifying } = useQuery({
    queryKey: ["auth"],
    queryFn: getAuthDetails,
    retry: false,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });
  useEffect(() => {
    if (userData) setRole(userData.role);
  }, [userData]);
  // Derived login state
  const isLoggedIn = !!userData;

  // Login mutation
  const {
    isPending: isLoggingIn,
    mutate: login,
    error: loginError,
  } = useMutation({
    mutationFn: (input: Login) => loginUser(input),
    onSuccess: async (data) => {
      console.log(data);
      await queryClient.invalidateQueries({ queryKey: ["auth"] });
      setRole(data.role);
      if (data.role === "ADMIN") navigate("/admin");
      if (data.role === "USER") navigate("/user");
    },
    onError: (error) => console.log(error),
  });

  // Logout mutation
  const { mutate: logout } = useMutation({
    mutationFn: logoutUser,
    onSuccess: async () => {
      setRole(null);
      queryClient.setQueryData(["auth"], null);
      navigate("/");
    },
    onError: (error) => console.log(error),
  });

  return {
    userData,
    isLoggedIn,
    isVerifying,
    isLoggingIn,
    role,
    login,
    logout,
    loginError,
  };
};

export default useAuth;
