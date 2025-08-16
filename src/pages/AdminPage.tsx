import { PrimaryButton } from "../components/ui/PrimaryButton";
import MyProductListing from "../components/MyProductListing";
import useProductStore from "../store/useProductStore";
import useProduct from "../hooks/useProduct";
import { useEffect, useState } from "react";
import Spinner from "../components/ui/Spinner";
import ErrorMessage from "../components/ui/ErrorMessage";
import { useModal } from "../context/ModalContext";
import CreateProductForm from "../components/forms/CreateProductForm";
import { SecondaryButton } from "../components/ui/SecondaryButton";
import { Link } from "react-router-dom";
import CategoryFilter from "../components/CategoryFilter";

const AdminPage = () => {
  const { paginationLimit, totalProducts, search } = useProductStore();

  const { isProductsLoading } = useProduct();
  const { openModal } = useModal();
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
  function openCreateForm() {
    openModal(<CreateProductForm />, "productForm");
  }
  return (
    <div>
      <div className="flex items-center justify-between pt-4 pb-8">
        <h2 className="text-3xl font-semibold">Your Products</h2>
        <div className="flex items-center justify-between gap-4">
          <CategoryFilter />
          <Link to="/admin/order">
            <SecondaryButton>View Orders</SecondaryButton>
          </Link>
          <PrimaryButton onClick={openCreateForm}>Add Product</PrimaryButton>
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(18.75rem,1fr))] gap-8">
        {list.map((offset) => (
          <MyProductListing offset={offset} key={offset} />
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
    </div>
  );
};

export default AdminPage;
