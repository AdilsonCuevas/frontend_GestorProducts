"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ProductForm } from "@/components/products/ProductForm";
import { getProductById } from "@/services/product.service";
import { ProductFormData } from "@/types/product";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  const [initialData, setInitialData] = useState<ProductFormData | null>(null);
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getProductById(productId);
        if (product) {
          const data: ProductFormData = {
            nombre: product.nombre,
            description: product.description ?? "",
            price: Number(product.price),
            stock: product.stock,
            category_id: product.category_id ?? "",
            isActive: product.isActive,
            image_url: product.image_url ?? "",
          };
          setInitialData(data);
          setFormKey((k) => k + 1); // Force remount of ProductForm with new data
        }
      } catch {
        // Error handled in form
      }
    };

    fetchProduct();
  }, [productId]);

  const handleSuccess = () => {
    router.push("/products");
    router.refresh();
  };

  return (
    <ProductForm
      key={formKey}
      initialData={initialData ?? undefined}
      productId={productId}
      onSuccess={handleSuccess}
    />
  );
}