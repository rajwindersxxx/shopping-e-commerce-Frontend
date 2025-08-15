import SearchForm from "../components/forms/SearchForm";
import AllProductListing from "../components/AllProductListing";
import SelectInput from "../components/ui/SelectInput";
import { useQuery } from "@tanstack/react-query";
import { getAvailableCategories } from "../api/product";
import useProductStore from "../store/useProductStore";

const HomePage = () => {
  const { setCategory } = useProductStore();
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: getAvailableCategories,
  });
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
