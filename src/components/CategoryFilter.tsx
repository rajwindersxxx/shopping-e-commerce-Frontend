import { useQuery } from "@tanstack/react-query";
import SelectInput from "./ui/SelectInput";
import { getAvailableCategories } from "../api/product";
import useProductStore from "../store/useProductStore";

const CategoryFilter = () => {
  const { setCategory } = useProductStore();
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: getAvailableCategories,
  });
  return (
    <>
      <SelectInput
        className="max-w-55  block"
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select any Category</option>
        {data?.data.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </SelectInput>
    </>
  );
};

export default CategoryFilter;
