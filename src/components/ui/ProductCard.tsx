import { Link } from "react-router-dom";
import type { ProductData } from "../../types/product.type";
import type { ReactNode } from "react";

interface props {
  details: ProductData;
  children: ReactNode;
}

const ProductCard = ({ details, children }: props) => {
  const { name, description, inventoryCount, images, price, id } = details;
  return (
    <div className="flex max-w-sm flex-col justify-between gap-2 overflow-hidden rounded-md bg-white shadow-lg transition-all duration-300 hover:scale-[101%] hover:shadow-xl">
      <img
        className="h-48 w-full object-cover brightness-75"
        src={images[0]}
        alt={name}
      />
      <div className="px-6 py-4">
        <Link
          to={`/product/${id}`}
          className="mb-2 inline-block cursor-pointer text-xl font-bold hover:underline"
        >
          {name}
        </Link>
        <p className="text-base text-gray-700">{description}</p>
      </div>
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex flex-col">
          <span className="font-semibold text-gray-800">Cost: $ {price}</span>
          <span className="font-semibold text-gray-800">
            Available: {inventoryCount}
          </span>
        </div>
        <div className="flex gap-2 items-end">{children}</div>
      </div>
    </div>
  );
};

export default ProductCard;
