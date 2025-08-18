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
  product: {
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
  totalAmount?: number;
  totalItems?: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItems[];
};



