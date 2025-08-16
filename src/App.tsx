import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/signupPage";
import { ModalProvider } from "./context/ModalContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "./context/AuthContext";
import Footer from "./components/ui/Footer";
import { UIProvider } from "./context/UIContext";
import HomePage from "./pages/HomePage";
import ProductDetails from "./pages/ProductDetails";
import UserPage from "./pages/UserPage";
import OrderDetails from "./pages/OrderDetails";
import OrderHistory from "./pages/OrderHistory";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminPage from "./pages/AdminPage";
import ProductOrders from "./components/ProductOrders";
const queryClient = new QueryClient();
function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <UIProvider>
            <AuthProvider>
              <ModalProvider>
                <Header />
                <div className="flex-1 p-4">
                  <Routes>
                    {/* Public route */}
                    <Route path="/" index element={<HomePage />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    {/* only for user */}
                    <Route path="/user" element={<UserPage />}></Route>
                    <Route element={<ProtectedRoute allowedRoles={["USER"]} />}>
                      <Route path="/user/history" element={<OrderHistory />} />
                      <Route path="/order/:id" element={<OrderDetails />} />
                    </Route>
                    {/* only for admin  */}
                    <Route
                      element={<ProtectedRoute allowedRoles={["ADMIN"]} />}
                    >
                      <Route path="/admin" element={<AdminPage />} />
                      <Route path="/admin/order" element={<ProductOrders />} />
                    </Route>
                  </Routes>
                </div>
                <Footer />
                <Toaster position="bottom-center" reverseOrder={false} />
              </ModalProvider>
              <ReactQueryDevtools initialIsOpen={false} />
            </AuthProvider>
          </UIProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
