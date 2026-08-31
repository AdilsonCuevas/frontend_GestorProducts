export interface Product {
  id: string;
  nombre: string;
  description: string | null;
  price: number;
  stock: number;
  isActive: boolean;
  category_id: string | null;
}