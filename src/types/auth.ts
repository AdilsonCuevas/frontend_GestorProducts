export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nit: string;
  password: string;
}

export interface AuthResponse {
  data?: {
    token?: string;
    user?: {
      id: string;
      email: string;
    };
  };
  
  message?: string;
}