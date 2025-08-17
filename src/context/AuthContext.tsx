import React, { createContext, useContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import type { Login, UserData } from "../types/auth.type";

interface AuthContextType {
  isVerifying: boolean;
  isLoggedIn: boolean;
  isLoggingIn: boolean;
  isInitializing: boolean
  login: (
    vars: Login,
    opts?: {
      onSuccess?: (data: unknown) => void;
      onError?: (err: Error) => void;
    },
  ) => void;

  logout: () => void;
  userData: UserData | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isInitializing, setInitializing] = useState(true);

useEffect(() => {
  setInitializing(false);
}, []);
  const { isLoggedIn, isLoggingIn, userData, login, logout, isVerifying } =
    useAuth();

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isLoggingIn, userData, login, logout, isVerifying, isInitializing }}
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
