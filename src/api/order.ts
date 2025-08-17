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
    path: "/order/me?sortby=id&&sortOrder=desc",
  });
}
export async function getAllOrders(status?: string | null) {
  let url = `/order?sortby=id&&sortOrder=desc`
  if(status) url+=`&&status=${status}`
  return await getRequestMany<OrderData>({
    path: url,
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
    path: `/order/dispatch/${orderId}`,
  });
}
