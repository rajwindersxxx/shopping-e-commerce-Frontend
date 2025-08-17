import { Link } from "react-router-dom";
import { useModal } from "../context/ModalContext";
import CategoryFilter from "./CategoryFilter";
import CreateProductForm from "./forms/CreateProductForm";
import { SecondaryButton } from "./ui/SecondaryButton";
import { PrimaryButton } from "./ui/PrimaryButton";

const AdminControls = () => {
  const { openModal } = useModal();

  function openCreateForm() {
    openModal(<CreateProductForm />, "productForm");
  }
  return (
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
  );
};

export default AdminControls;
