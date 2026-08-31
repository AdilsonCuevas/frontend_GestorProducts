"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { CategoryForm } from "@/components/categories/CategoryForm";
import { getCategoryById } from "@/services/category.client";
import { CategoryFormData } from "@/types/category";

export default function EditCategoryPage() {
  const params = useParams();
  const router = useRouter();
  const categoryId = params.id as string;

  const [initialData, setInitialData] = useState<CategoryFormData | null>(null);
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const category = await getCategoryById(categoryId);
        if (category) {
          const data: CategoryFormData = {
            name: category.name,
            description: category.description ?? "",
          };
          setInitialData(data);
          setFormKey((k) => k + 1);
        }
      } catch {
        // Error handled in form
      }
    };

    fetchCategory();
  }, [categoryId]);

  const handleSuccess = () => {
    router.push("/admin/categorias");
    router.refresh();
  };

  return (
    <CategoryForm
      key={formKey}
      initialData={initialData ?? undefined}
      categoryId={categoryId}
      onSuccess={handleSuccess}
    />
  );
}