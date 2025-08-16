import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../api/product";
import Spinner from "../components/ui/Spinner";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { useAuthContext } from "../context/AuthContext";
import ProductEditButtons from "../components/ProductEditButtons";

const ProductDetails = () => {
  const { id } = useParams();
  const { userData } = useAuthContext();
  const { data: product, isLoading } = useQuery({
    queryFn: () => getProductDetails(Number(id)),
    queryKey: ["product", id],
  });
  if (!product || isLoading) return <Spinner />;
  return (
    <div className="mx-auto max-w-6xl p-4 md:p-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          {product.images[0] && (
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-64 w-full rounded object-cover shadow md:h-80"
            />
          )}
          {Boolean(product.images[0]) || (
            <div className="flex h-64 w-full items-center justify-center rounded bg-gray-200 md:h-80">
              No Image
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold md:text-4xl">
              {product.name}
            </h1>
            <p className="mb-4 text-gray-500">{product.category}</p>
            <p className="mb-6 text-gray-700">{product.description}</p>
            <p className="mb-4 text-2xl font-semibold">
              ${product.price.toFixed(2)}
            </p>
            <p
              className={`mb-4 font-medium ${
                product.inventoryCount > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.inventoryCount > 0
                ? `${product.inventoryCount} in stock`
                : "Out of stock"}
            </p>
          </div>

          {userData?.role === "ADMIN" ? (
            <ProductEditButtons productData={product} size={30} className="justify-end gap-4"/>
          ) : (
            <PrimaryButton
              type="button"
              className={` ${
                product.inventoryCount === 0
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
              disabled={product.inventoryCount === 0}
            >
              Add to Cart
            </PrimaryButton>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {product.images.length > 0 ? (
            product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={product.name}
                className="h-64 w-full rounded object-cover shadow brightness-50 md:h-80"
              />
            ))
          ) : (
            <div className="flex h-64 w-full items-center justify-center rounded bg-gray-200 md:h-80">
              No Image
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
