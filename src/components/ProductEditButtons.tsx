import {  HiPencil, HiTrash } from "react-icons/hi";
import useProduct from "../hooks/useProduct";
import { useModal } from "../context/ModalContext";
import type { ProductData } from "../types/product.type";
import ConfirmModel from "./ui/ConfirmModel";
import EditProductForm from "./forms/EditProductForm";
import { useNavigate } from "react-router-dom";
interface props {
  productData: ProductData;
  className?: string;
  size?: number;
}
const ProductEditButtons = ({ productData, className, size = 22 }: props) => {
  const { deleteProductMutate } = useProduct();
 const navigate =  useNavigate();
  const { openModal } = useModal();
  function handleDelete(item: ProductData) {
    openModal(
      <ConfirmModel
        message={`Do you want to delete "${item.name}" `}
        type={"confirm"}
        confirmDelete={() => deleteProductMutate(item.id, {
          onSuccess: () => {
            navigate("/admin")
          }
        })}
      />,
      "deleteProduct",
    );
  }
  function handleEdit(item: ProductData) {
    openModal(<EditProductForm productDetails={item} />, "edit product");
  }
  return (
    <div className={`flex gap-1 ${className}`}>
      <button
        className="cursor-pointer"
        onClick={() => handleEdit(productData)}
      >
        <HiPencil size={size} className="text-orange-400" />
      </button>
      <button
        className="cursor-pointer"
        onClick={() => handleDelete(productData)}
      >
        <HiTrash size={size} className="text-orange-400" />
      </button>
    </div>
  );
};

export default ProductEditButtons;
