import toast from "react-hot-toast";
import useProduct from "../hooks/useProduct";
import useCartStore from "../store/useCartStore";
import { PrimaryButton } from "./ui/PrimaryButton";
import ProductCard from "./ui/ProductCard";
import { useAuthContext } from "../context/AuthContext";
interface props {
  offset: number;
}
const ProductList = ({ offset }: props) => {
  const { products } = useProduct({ offset });
  const { role } = useAuthContext();
  const { addToCart } = useCartStore();

  return (
    <>
      {products?.data.map((item) => (
        <ProductCard details={item} key={item.id}>
          {role !== "ADMIN" && (
            <PrimaryButton
              className="h-12"
              onClick={() => {
                addToCart(item);
                toast.success("Item added to cart ");
              }}
            >
              Add to Cart
            </PrimaryButton>
          )}
        </ProductCard>
      ))}
    </>
  );
};

export default ProductList;
