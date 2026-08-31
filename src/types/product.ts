export interface Product {
  id: string;
  nombre: string;
  description: string | null;
  price: number;
  stock: number;
  isActive: boolean;
  code: string;
  category_id: string | null;
}

export interface ProductFormData {
  nombre: string;
  description: string;
  price: number;
  stock: number;
  isActive: boolean;
  code: string;
  category_id: string;
}