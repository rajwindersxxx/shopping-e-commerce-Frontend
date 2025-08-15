import useProduct from "../hooks/useProduct";
import ProductCard from "./ui/ProductCard";
interface props {
  offset: number;
}
const ProductList = ({ offset }: props) => {
  const { products } = useProduct({ offset });
  return (
    <>
      {products?.data.map((item) => (
        <ProductCard details={item} key={item.id} />
      ))}
    </>
  );
};

export default ProductList;
