"use client";

import { Product, ProductFormData } from "@/types/product";
import { fetchAuthApi } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";

const BASE_PATH = "/api/auth/producto";

export async function createProduct(data: ProductFormData): Promise<Product> {
  const token = getAuthToken();
  if (!token) {
    throw new Error("No hay token de autenticación");
  }
  return fetchAuthApi<Product>(`${BASE_PATH}/create`, token, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateProduct(id: string, data: ProductFormData): Promise<Product> {
  const token = getAuthToken();
  console.log("token", token);
  if (!token) {
    throw new Error("No hay token de autenticación");
  }
  return fetchAuthApi<Product>(`${BASE_PATH}/${id}`, token, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteProduct(id: string): Promise<void> {
  const token = getAuthToken();
  if (!token) {
    throw new Error("No hay token de autenticación");
  }
  await fetchAuthApi<void>(`${BASE_PATH}/${id}`, token, {
    method: "DELETE",
  });
}

export async function getProductByIdAuth(id: string): Promise<Product | null> {
  const token = getAuthToken();
  if (!token) {
    throw new Error("No hay token de autenticación");
  }
  try {
    return await fetchAuthApi<Product>(`${BASE_PATH}/${id}`, token);
  } catch {
    return null;
  }
}