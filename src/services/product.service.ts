import { Product } from "@/types/product";
import { fetchApi } from "@/lib/api";

export async function getProducts(): Promise<Product[]> {
  const data = await fetchApi<{ message: Product[] } | Product[]>("/api/public/productos");

  if (Array.isArray(data)) {
    return data;
  }

  if (data && Array.isArray(data.message)) {
    return data.message;
  }

  return [];
}

export async function getProductById(id: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((p) => p.id === id) ?? null;
}