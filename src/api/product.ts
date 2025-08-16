import { type ProductData } from "../types/product.type";
import {
  deleteRequest,
  getRequest,
  getRequestMany,
  patchRequest,
  postRequest,
} from "../utils/axis";
interface paginationInput {
  limit?: number;
  offset?: number;
  searchBy?: string;
  search?: string;
  category?: string;
}
export async function getAvailableCategories() {
  return await getRequestMany<string>({
    path: "/product/categories",
  });
}
export async function getAllProducts({
  limit = 10,
  offset = 0,
  search,
  category,
}: paginationInput = {}) {
  let url = `product?limit=${limit}&&offset=${offset}&&sortby=id&&sortOrder=desc`;
  if (category) url += `&&category=${category}`;
  if (search) url += `&&searchBy=name&&search=${search}`;
  return await getRequestMany<ProductData>({
    path: url,
  });
}
export async function createProduct(input: FormData) {
  return await postRequest<ProductData>({
    path: "/product",
    data: input,
  });
}
export async function updateProduct(input: FormData, id: number) {
  return await patchRequest<ProductData>({
    path: `/product/${id}`,
    data: input,
  });
}
export async function deleteProduct(id: number) {
  return await deleteRequest({
    path: `/product/${id}`,
    data: null,
  });
}
export async function getProductDetails(id: number) {
  return await getRequest<ProductData>({
    path: `/product/${id}`,
  });
}
