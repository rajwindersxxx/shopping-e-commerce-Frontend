import React, { createContext, useContext } from "react";
import useAuth from "../hooks/useAuth";
import type { Login } from "../types/auth.type";

interface AuthContextType {
  isVerifying: boolean;
  isLoggedIn: boolean;
  isLoggingIn: boolean;
  login: (
    vars: Login,
    opts?: {
      onSuccess?: (data: object) => void;
      onError?: (err: Error) => void;
    },
  ) => void;
  logout: () => void;
  userData: { email: string; id: number };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isLoggingIn, userData, login, logout, isVerifying } =
    useAuth();

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isLoggingIn, userData, login, logout, isVerifying }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;
