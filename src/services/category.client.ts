"use client";

import { Category, CategoryFormData, CategoryResponse, CategoryResponses } from "@/types/category";
import { fetchAuthApi } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";

const BASE_PATH = "/api/auth/categorias";

export async function getCategories(): Promise<Category[]> {
  const token = getAuthToken();
  if (!token) {
    throw new Error("No hay token de autenticación");
  }
  try {
    const res = await fetchAuthApi<CategoryResponse>(BASE_PATH, token);
    return res.message;
  } catch {
    return [];
  }
}

export async function getCategoryById(id: string): Promise<Category | null> {
  const token = getAuthToken();
  if (!token) {
    throw new Error("No hay token de autenticación");
  }
  try {
    const res = await fetchAuthApi<CategoryResponses>(`${BASE_PATH}/${id}`, token);
    return res.message
  } catch {
    return null;
  }
}

export async function createCategory(data: CategoryFormData): Promise<Category> {
  const token = getAuthToken();
  if (!token) {
    throw new Error("No hay token de autenticación");
  }
  return fetchAuthApi<Category>(`${BASE_PATH}/create`, token, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateCategory(id: string, data: CategoryFormData): Promise<Category> {
  const token = getAuthToken();
  if (!token) {
    throw new Error("No hay token de autenticación");
  }
  return fetchAuthApi<Category>(`${BASE_PATH}/${id}`, token, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteCategory(id: string): Promise<void> {
  const token = getAuthToken();
  if (!token) {
    throw new Error("No hay token de autenticación");
  }
  await fetchAuthApi<void>(`${BASE_PATH}/${id}`, token, {
    method: "DELETE",
  });
}