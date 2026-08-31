"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CategoryFormData } from "@/types/category";
import { createCategory, updateCategory } from "@/services/category.client";
import { getCategoryById } from "@/services/category.client";

interface CategoryFormProps {
  initialData?: CategoryFormData;
  categoryId?: string;
  onSuccess: () => void;
}

const initialFormData: CategoryFormData = {
  name: "",
  description: "",
};

export function CategoryForm({ initialData, categoryId, onSuccess }: CategoryFormProps) {
  const router = useRouter();
  const isEditing = !!categoryId;

  const [formData, setFormData] = useState<CategoryFormData>(initialData ?? initialFormData);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(isEditing && !initialData);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isEditing && categoryId && !initialData) {
      let cancelled = false;
      const fetchCategory = async () => {
        try {
          const category = await getCategoryById(categoryId);
          if (!cancelled && category) {
            setFormData({
              name: category.name,
              description: category.description ?? "",
            });
          } else if (!cancelled) {
            setError("Categoría no encontrada");
          }
        } catch {
          if (!cancelled) {
            setError("Error al cargar la categoría");
          }
        } finally {
          if (!cancelled) {
            setLoading(false);
          }
        }
      };

      fetchCategory();
      return () => { cancelled = true; };
    }
  }, [isEditing, categoryId, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError("El nombre es obligatorio");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setSubmitting(true);

    try {
      if (isEditing && categoryId) {
        await updateCategory(categoryId, formData);
      } else {
        await createCategory(formData);
      }
      onSuccess();
    } catch {
      setError(`Error al ${isEditing ? "actualizar" : "crear"} la categoría. Intente nuevamente.`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{isEditing ? "Editar categoría" : "Crear categoría"}</h1>
        </div>
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{isEditing ? "Editar categoría" : "Crear categoría"}</h1>
        <p className="mt-2 text-gray-600">{isEditing ? "Actualice la información de la categoría" : "Complete el formulario para agregar una nueva categoría"}</p>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/20 transition"
              placeholder="Nombre de la categoría"
              disabled={submitting}
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/20 transition"
              placeholder="Descripción de la categoría"
              disabled={submitting}
            />
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (isEditing ? "Guardando..." : "Creando...") : (isEditing ? "Guardar cambios" : "Crear categoría")}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              disabled={submitting}
              className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}