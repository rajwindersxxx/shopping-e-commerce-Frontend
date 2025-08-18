import type { ReactNode } from "react";
import type { OrderData } from "../../types/order.types";
interface props {
  order: OrderData;
  children: ReactNode;
}
const OrdersCard = ({ order, children }: props) => {
  console.log(order)
  return (
    <>
      <div
        key={order.id}
        className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-800">
            Order #{order.id}
          </span>
          <span
            className={`rounded-full px-2 py-1 text-xs font-medium ${
              order.status === "PENDING"
                ? "bg-yellow-100 text-yellow-700"
                : order.status === "PAID"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600"
            }`}
          >
            {order.status === "PENDING" ? "Pending Checkout" : order.status}
          </span>
        </div>

        {/* Summary */}
        <div className="mb-4 grid grid-cols-3 text-sm text-gray-600">
          <div>
            <span className="block font-medium text-gray-500">Total Items</span>
            <span className="text-gray-800">{order.totalItems}</span>
          </div>
          <div className="text-right">
            <span className="block font-medium text-gray-500">
              Total Amount
            </span>
            <span className="font-semibold text-gray-800">
              ${order.totalAmount.toFixed(2)}
            </span>
          </div>
          <div className="text-right">
            <span className="block font-medium text-gray-500">Created At</span>
            <span className="text-gray-800">
              {new Date(order.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Items */}
        {order.items.length > 0 && (
          <div>
            <h4 className="mb-2 font-medium text-gray-700">Items</h4>
            <ul className="divide-y divide-gray-200 rounded-lg border border-gray-100">
              {order.items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between px-3 py-2"
                >
                  <span className="flex-1 text-gray-700">
                    {item.product.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    {item.quantity} × ${item.product.price.toFixed(2)}
                  </span>
                  <span className="flex-1 text-end font-medium text-gray-800">
                    ${item.price.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {children}
      </div>
    </>
  );
};

export default OrdersCard;
