import SearchForm from "../components/forms/SearchForm";
import AllProductListing from "../components/AllProductListing";
import SelectInput from "../components/ui/SelectInput";
import { useQuery } from "@tanstack/react-query";
import { getAvailableCategories } from "../api/product";
import useProductStore from "../store/useProductStore";
import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const HomePage = () => {
  const { userData } = useAuthContext();
  const { setCategory } = useProductStore();
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: getAvailableCategories,
  });
  if (userData?.role === "ADMIN") return <Navigate to="/admin" />;
  return (
    <div>
      <div className="flex w-full items-center justify-between py-8">
        <SearchForm />
        <SelectInput
          className="max-w-55"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select any Category</option>
          {data?.data.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </SelectInput>
      </div>
      <AllProductListing />
    </div>
  );
};

export default HomePage;
