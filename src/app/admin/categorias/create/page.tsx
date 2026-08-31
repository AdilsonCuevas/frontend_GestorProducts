"use client";

import { useRouter } from "next/navigation";
import { CategoryForm } from "@/components/categories/CategoryForm";

export default function CreateCategoryPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/admin/categorias");
    router.refresh();
  };

  return (
    <CategoryForm
      onSuccess={handleSuccess}
    />
  );
}