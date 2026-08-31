export interface Category {
  id: string;
  name: string;
  description: string | null;
}

export interface CategoryFormData {
  name: string;
  description: string;
}