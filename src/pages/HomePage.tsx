import SearchForm from "../components/forms/SearchForm";
import AllProductListing from "../components/AllProductListing";
import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import CategoryFilter from "../components/CategoryFilter";

const HomePage = () => {
  const { userData } = useAuthContext();

  if (userData?.role === "ADMIN") return <Navigate to="/admin" />;
  return (
    <div>
      <div className="flex w-full items-center justify-between py-8">
        <SearchForm />
        <CategoryFilter />
      </div>
      <AllProductListing />
    </div>
  );
};

export default HomePage;
