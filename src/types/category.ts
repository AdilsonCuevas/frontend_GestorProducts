export interface Category {
  id: string;
  name: string;
  description: string | null;
}

export interface CategoryFormData {
  name: string;
  description: string;
}

export interface CategoryResponse {
  success: boolean,
  message: []
}

export interface CategoryResponses {
  success: boolean,
  message: Category
}