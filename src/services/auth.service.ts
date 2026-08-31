import { fetchApi } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import type { LoginRequest, RegisterRequest, AuthResponse } from "@/types/auth";

async function fetchAuthApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = getAuthToken();
  return fetchApi<T>(endpoint, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });
}

export async function login(credentials: LoginRequest): Promise<AuthResponse> {
  return fetchAuthApi<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export async function register(data: RegisterRequest): Promise<AuthResponse> {
  return fetchAuthApi<AuthResponse>("/api/auth/registro", {
    method: "POST",
    body: JSON.stringify(data),
  });
}