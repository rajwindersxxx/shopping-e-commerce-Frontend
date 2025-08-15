import { useEffect, useState } from "react";
import useProduct from "../hooks/useProduct";
import useProductStore from "../store/useProductStore";
import ProductList from "./ProductList";
import Spinner from "./ui/Spinner";
import ErrorMessage from "./ui/ErrorMessage";

const AllProductListing = () => {
  const { paginationLimit, totalProducts, search } = useProductStore();
  const { isProductsLoading } = useProduct();
  const [list, setList] = useState([0]);

  function handlePagination() {
    setList((prev) => [...prev, prev[prev.length - 1] + paginationLimit]);
  }
  useEffect(() => {
    setList([0]);
  }, [search]);
  const hasMore = list[list.length - 1] + paginationLimit < totalProducts;
  if (isProductsLoading) return <Spinner />;
  if (list.length === 0)
    return <ErrorMessage>No result found, try clear filters</ErrorMessage>;
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(18.75rem,1fr))] gap-8">
      {list.map((offset) => (
        <ProductList offset={offset} key={offset} />
      ))}
      {hasMore && (
        <button
          className="flex cursor-pointer items-center justify-center rounded bg-gray-200 px-4 py-2 text-xl font-semibold transition-transform duration-150 hover:bg-gray-300 active:scale-95"
          onClick={handlePagination}
        >
          SHOW MORE
        </button>
      )}
    </div>
  );
};

export default AllProductListing;
