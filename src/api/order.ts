import type { CreateOrder, OrderData, OrderItems } from "../types/order.types";
import { getRequestMany, postRequest } from "../utils/axis";

export async function createOrder(input: CreateOrder) {
  return await postRequest<OrderData>({
    path: "/order",
    data: input,
  });
}
export async function getMyOrders() {
  return await getRequestMany<OrderData>({
    path: "/order/me",
  });
}
export async function getAllOrders() {
  return await getRequestMany<OrderData>({
    path: "/order",
  });
}
export async function getOrderedItems(orderId: number) {
  return await getRequestMany<OrderItems>({
    path: `/order/${orderId}`,
  });
}


export async function deleteOrder() {}
export async function checkoutOrder(orderId: number) {
  return await postRequest<OrderData>({
    path: `/order/checkout/${orderId}`,
  });
}
export async function dispatchOrder(orderId: number) {
  return await postRequest<OrderData>({
    path: `/order/checkout/${orderId}`,
  });
}
