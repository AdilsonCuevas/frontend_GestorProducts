"use client";

import { useEffect, useState } from "react";
import { getCategories } from "@/services/category.client";
import type { Category } from "@/types/category";

interface CategorySelectProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function CategorySelect({
  value,
  onChange,
  disabled = false,
}: CategorySelectProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getCategories();

        setCategories(data);
      } catch (error) {
        console.error("Error cargando categorías:", error);
        setError("No fue posible cargar las categorías.");
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  return (
    <div>
      <label
        htmlFor="category_id"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Categoría
      </label>

      <select
        id="category_id"
        name="category_id"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled || loading}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/20 disabled:bg-gray-100"
      >
        <option value="">
          {loading
            ? "Cargando categorías..."
            : "Seleccione una categoría"}
        </option>

        {categories.map((category) => (
          <option
            key={category.id}
            value={category.id}
          >
            {category.name}
          </option>
        ))}
      </select>

      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}