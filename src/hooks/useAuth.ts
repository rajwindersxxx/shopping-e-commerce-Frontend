import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAuthDetails, loginUser, logoutUser } from "../api/auth"; // your API function
import { useNavigate } from "react-router-dom";
import type { Login } from "../types/auth.type";
import { useState } from "react";

const useAuth = () => {
 const [isLoggedIn , setIsLoggedIn] =  useState(false)
  const {
    data: userData,
    isFetching: isVerifying,
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
    onSuccess: async (data) => {
      setIsLoggedIn(true)
      if (data.role === "ADMIN") navigation("/admin");
      else navigation("/user");
      await queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const { mutate: logout} = useMutation({
    mutationFn: logoutUser,
    onSuccess: async () => {
      setIsLoggedIn(false)
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
