"use client";

import { useRouter } from "next/navigation";
import { ProductForm } from "@/components/products/ProductForm";

export default function CreateProductPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/products");
    router.refresh();
  };

  return (
    <ProductForm
      onSuccess={handleSuccess}
    />
  );
}