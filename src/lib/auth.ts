import Cookies from "js-cookie";

const AUTH_TOKEN_KEY = "auth_token";

const isSecure = process.env.NODE_ENV === "production";

const cookieOptions = {
  secure: isSecure,
  sameSite: "lax" as const,
  path: "/",
};

export function setAuthToken(token: string): void {
  Cookies.set(AUTH_TOKEN_KEY, token, cookieOptions);
}

export function getAuthToken(): string | undefined {
  return Cookies.get(AUTH_TOKEN_KEY);
}

export function removeAuthToken(): void {
  Cookies.remove(AUTH_TOKEN_KEY, { path: "/" });
}

export function hasAuthToken(): boolean {
  return !!Cookies.get(AUTH_TOKEN_KEY);
}