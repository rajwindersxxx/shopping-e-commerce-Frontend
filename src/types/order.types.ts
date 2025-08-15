export type OrderItemInput = {
  productId: number;
  quantity: number;
};

export type OrderItems = {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  product?: {
    name: string;
    price: number;
  };
};

export type CreateOrder = {
  items: OrderItemInput[];
};

export type OrderData = {
  id: number;
  userId: number;
  totalAmount: number;
  totalItems: number;
  status: "PENDING" | "PAID" | "DISPATCHED";
  createdAt: string; // ISO
  updatedAt: string; // ISO
  items?: OrderItems[]; // included in "GET /me"
};



