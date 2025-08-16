import toast from "react-hot-toast";
import useCartStore from "../store/useCartStore";
import ErrorMessage from "./ui/ErrorMessage";
import { PrimaryButton } from "./ui/PrimaryButton";
import Image from "./ui/Image";

const CartItemsList = () => {
  const { cartItems, removeCartItem, addToCart } = useCartStore();

  // Calculate totals
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  if (cartItems.length === 0)
    return <ErrorMessage>No items in Cart </ErrorMessage>;
  return (
    <div
      className="min-w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md"
      role="table"
    >
      {/* Table Header */}
      <div className="bg-gray-100 text-gray-700" role="rowgroup">
        <div className="flex" role="row">
          <div
            className="flex-1 px-4 py-3 text-left font-semibold"
            role="columnheader"
          >
            Product
          </div>
          <div
            className="flex-1 px-4 py-3 text-left font-semibold"
            role="columnheader"
          >
            Category
          </div>
          <div
            className="flex-1 px-4 py-3 text-left font-semibold"
            role="columnheader"
          >
            Price
          </div>
          <div
            className="flex-1 px-4 py-3 text-left font-semibold"
            role="columnheader"
          >
            Quantity
          </div>
          <div
            className="flex-1 px-4 py-3 text-left font-semibold"
            role="columnheader"
          >
            Stock
          </div>
          <div
            className="flex-1 px-4 py-3 text-left font-semibold"
            role="columnheader"
          >
            Actions
          </div>
        </div>
      </div>

      {/* Table Body */}
      <div role="rowgroup">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex min-h-[80px] border-b transition-colors duration-150 hover:bg-gray-50"
            role="row"
          >
            <div
              className="flex flex-1 items-center gap-3 px-4 py-3"
              role="cell"
            >
              {item.images[0] && (
                <Image
                  src={item.images[0]}
                  alt={item.name}
                  className="h-12 w-12 flex-shrink-0 rounded object-cover"
                />
              )}
              <span className="font-medium">{item.name}</span>
            </div>
            <div className="flex flex-1 items-center px-4 py-3" role="cell">
              {item.category}
            </div>
            <div className="flex flex-1 items-center px-4 py-3" role="cell">
              ${item.price}
            </div>
            <div className="flex flex-1 items-center px-4 py-3" role="cell">
              {item.quantity}
            </div>
            <div className="flex flex-1 items-center px-4 py-3" role="cell">
              {item.inventoryCount}
            </div>
            <div
              className="flex flex-1 items-center justify-end gap-4 px-4 py-3"
              role="cell"
            >
              <PrimaryButton
                onClick={() => {
                  addToCart(item);
                  toast.success("Quantify updated successfully");
                }}
                className="m-0"
              >
                Add
              </PrimaryButton>
              <PrimaryButton
                onClick={() => {
                  removeCartItem(item.id);
                  toast.success("Item Removed successfully");
                }}
                className="bg-red-500 px-3 py-1 text-white transition hover:bg-red-600"
              >
                Delete
              </PrimaryButton>
            </div>
          </div>
        ))}
      </div>

      {/* Table Footer */}
      <div className="bg-gray-100 font-semibold" role="rowgroup">
        <div className="flex" role="row">
          <div className="flex-1 px-4 py-3" role="cell" aria-colspan={3}>
            Total
          </div>
          <div className="flex-1 px-4 py-3" role="cell">
            ${Math.floor(totalCost)}
          </div>
          <div className="flex-1 px-4 py-3" role="cell">
            {totalItems} Items
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemsList;
