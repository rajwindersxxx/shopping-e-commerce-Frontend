import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../api/order";
import Spinner from "./ui/Spinner";
import SelectInput from "./ui/SelectInput";
import { useState } from "react";
import OrderListing from "./OrderListing";

const ProductOrders = () => {
  const [status, setStatus] = useState("");
  const { data: orderData, isLoading } = useQuery({
    queryKey: ["allOrders", status],
    queryFn: () => getAllOrders(status),
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="py-4 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Order History</h2>
        <SelectInput
          className="max-w-55"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Filter By Status</option>
          <option value="PENDING">PENDING</option>
          <option value="DISPATCHED">DISPATCHED</option>
          <option value="PAID">PAID</option>
        </SelectInput>
      </div>
      {isLoading && <Spinner />}
      {orderData && <OrderListing orderData={orderData.data} />}
    </div>
  );
};

export default ProductOrders;
