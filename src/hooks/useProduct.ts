import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../api/product";
import toast from "react-hot-toast";
import useProductStore from "../store/useProductStore";
import { useEffect } from "react";
import { useModal } from "../context/ModalContext";
interface props {
  offset?: number;
  limit?: number;
}
const useProduct = ({ limit, offset }: props = {}) => {
  const queryclient = useQueryClient();
  const { closeModal } = useModal();
  const { setTotalProducts, search, category } = useProductStore();
  const {
    data: products,
    isLoading: isProductsLoading,
    isError,
  } = useQuery({
    queryKey: ["products", limit, offset, search, category],
    queryFn: () =>
      getAllProducts({ limit, offset, search, searchBy: "name", category }),
  });
  useEffect(() => {
    setTotalProducts(products?.total || 0);
  }, [products?.total, setTotalProducts]);

  const { mutate: createProductMutate, isPending: isCreating } = useMutation({
    mutationFn: (input: FormData) => createProduct(input),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product created successfully ");
      closeModal()
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const { mutate: updateProductMutate, isPending: isUpdating } = useMutation({
    mutationFn: ({ input, id }: { input: FormData; id: number }) =>
      updateProduct(input, id),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["products"] });
      queryclient.invalidateQueries({ queryKey: ["product"] });
      toast.success("Product updated successfully");
      closeModal()
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const { mutate: deleteProductMutate, isPending: isDeleting } = useMutation({
    mutationFn: (productId: number) => deleteProduct(productId),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["products"] });
      queryclient.invalidateQueries({ queryKey: ["product"] });
      toast.success("Product deleted successfully");
      closeModal()
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    products,
    isProductsLoading,
    isCreating,
    updateProductMutate,
    deleteProductMutate,
    createProductMutate,
    isError,
    isUpdating,
    isDeleting,
  };
};

export default useProduct;
