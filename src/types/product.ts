export interface Product {
  id: string;
  nombre: string;
  description: string | null;
  price: number;
  stock: number;
  isActive: boolean;
  category_id: string | null;
  image_url: string | null;
}

export interface ProductFormData {
  nombre: string;
  description: string;
  price: number;
  stock: number;
  category_id: string;
  isActive: boolean;
  image_url: string;
}