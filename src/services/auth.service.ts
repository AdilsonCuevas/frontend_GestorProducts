import { fetchApi } from "@/lib/api";
import type { LoginRequest, RegisterRequest, AuthResponse } from "@/types/auth";

export async function login(credentials: LoginRequest): Promise<AuthResponse> {
  return fetchApi<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export async function register(data: RegisterRequest): Promise<AuthResponse> {
  return fetchApi<AuthResponse>("/api/auth/registro", {
    method: "POST",
    body: JSON.stringify(data),
  });
}