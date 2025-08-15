import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAuthDetails, loginUser, logoutUser } from "../api/auth"; // your API function
import { useNavigate } from "react-router-dom";
import type { Login } from "../types/auth.type";

const useAuth = () => {
  const {
    data: userData,
    isFetching: isVerifying,
    isSuccess: isLoggedIn,
  } = useQuery({
    queryKey: ["auth"],
    queryFn: getAuthDetails,
    retry: false,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });
  const navigation = useNavigate();
  const queryClient = useQueryClient();
  const {
    isPending: isLoggingIn,
    mutate: login,
    error: loginError,
  } = useMutation({
    mutationFn: (input: Login) => loginUser(input),
    onSuccess: async () => {
      navigation("/post");
      await queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });
  const { mutate: logout } = useMutation({
    mutationFn: logoutUser,
    onSuccess: async () => {
      navigation("/");
      await queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return {
    userData,
    isLoggedIn,
    isLoggingIn,
    loginError,
    isVerifying,
    login,
    logout,
  };
};
export default useAuth;
