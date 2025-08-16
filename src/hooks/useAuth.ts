import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAuthDetails, loginUser, logoutUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import type { Login } from "../types/auth.type";

const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch current user
  const { data: userData, isFetching: isVerifying } = useQuery({
    queryKey: ["auth"],
    queryFn: getAuthDetails,
    retry: false,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });

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
      await queryClient.invalidateQueries({ queryKey: ["auth"] });
      if (data.role === "ADMIN") navigate("/admin");
      if (data.role === "USER") navigate("/user");
    },
    onError: (error) => console.log(error),
  });

  // Logout mutation
  const { mutate: logout } = useMutation({
    mutationFn: logoutUser,
    onSuccess: async () => {
      queryClient.setQueryData(["auth"], null); // immediately clear cached auth
      navigate("/");
    },
    onError: (error) => console.log(error),
  });

  return {
    userData,
    isLoggedIn,
    isVerifying,
    isLoggingIn,
    login,
    logout,
    loginError,
  };
};

export default useAuth;
