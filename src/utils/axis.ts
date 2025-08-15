import axios, { type AxiosRequestConfig } from "axios";
import { apiUrl } from "../config/apiConfig";
import type { ApiResponse, PaginateResponse } from "./genetic";
import { ApiError } from "./ApiEror";

type FilterOptions = {
  limit?: number;
  offset?: number;
  sorting?: { sortby: string; sortOrder?: "asc" | "desc" };
  filter?: Record<string, string | number>;
  fields?: string[];
};

type RequestOptions = {
  path: string;
  data?: object | null;
  filterOptions?: FilterOptions;
  headers?: Record<string, string>;
  options?: AxiosRequestConfig;
};

// Single Axios instance for all requests
export const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true, // cookies are sent automatically
  headers: { "Content-Type": "application/json" },
});

// POST request
export async function postRequest<T>({
  path,
  data,
  options,
}: RequestOptions): Promise<T> {
  return await catchError(async () => {
    const res = await api.post<ApiResponse<T>>(path, data ?? {}, options);
    if (res.data.status === "fail") throw new Error(res.data.message);
    return res.data.data;
  });
}

// GET single resource
export async function getRequest<T>({
  path,
  filterOptions,
  options,
}: RequestOptions): Promise<T> {
  return await catchError(async () => {
    const query = filterOptions ? buildQuery(filterOptions) : "";
    const res = await api.get<ApiResponse<T>>(
      `${path}${query ? `?${query}` : ""}`,
      options,
    );
    if (res.data.status === "fail") throw new Error(res.data.message);
    return res.data.data;
  });
}

// GET multiple resources with pagination
export async function getRequestMany<T>({
  path,
  filterOptions,
  options,
}: RequestOptions): Promise<PaginateResponse<T>> {
  return await catchError(async () => {
    const query = filterOptions ? buildQuery(filterOptions) : "";
    const res = await api.get<PaginateResponse<T>>(
      `${path}${query ? `?${query}` : ""}`,
      options,
    );
    if (res.data.status === "fail") throw new Error(res.data.message);
    return res.data;
  });
}

// PATCH request
export async function patchRequest<T>({
  path,
  data,
  options,
}: RequestOptions): Promise<T> {
  return await catchError(async () => {
    const res = await api.patch<ApiResponse<T>>(path, data ?? {}, options);
    if (res.data.status === "fail") throw new Error(res.data.message);
    return res.data.data;
  });
}

// DELETE request
export async function deleteRequest<T>({
  path,
  filterOptions,
  options,
}: RequestOptions): Promise<T> {
  return await catchError(async () => {
    const query = filterOptions ? buildQuery(filterOptions) : "";
    const res = await api.delete<ApiResponse<T>>(
      `${path}${query ? `?${query}` : ""}`,
      options,
    );
    if (res.data.status === "fail") throw new Error(res.data.message);
    return res.data.data;
  });
}

export function buildQuery(input: Record<string, unknown>): string {
  const parts: string[] = [];
  for (const [key, value] of Object.entries(input)) {
    if (Array.isArray(value)) parts.push(`${key}=${value.join(",")}`);
    else if (typeof value === "object" && value !== null) {
      for (const [subKey, subValue] of Object.entries(value)) {
        parts.push(`${subKey}=${subValue}`);
      }
    } else {
      parts.push(`${key}=${value}`);
    }
  }
  return parts.join("&");
}

// Centralized error handling
export async function catchError<T>(callback: () => Promise<T>): Promise<T> {
  try {
    return await callback();
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new ApiError(
        err.response?.data?.message || err.message,
        err.response?.data?.code || "UNKNOWN",
      );
    }
    throw new ApiError("Unknown error occurred", "UNKNOWN");
  }
}
