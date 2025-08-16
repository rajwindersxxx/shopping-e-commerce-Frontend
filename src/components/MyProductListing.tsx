import useProduct from "../hooks/useProduct";
import ProductCard from "./ui/ProductCard";
import ProductEditButtons from "./ProductEditButtons";
interface props {
  offset: number;
}
const MyProductListing = ({ offset }: props) => {
  const { products } = useProduct({ offset });


  return (
    <>
      {products?.data.map((item) => (
        <ProductCard details={item} key={item.id}>
         <ProductEditButtons productData={item} />
        </ProductCard>
      ))}
    </>
  );
};

export default MyProductListing;
