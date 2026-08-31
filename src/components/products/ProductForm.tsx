"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProductFormData } from "@/types/product";
import { createProduct, updateProduct } from "@/services/product.client";
import { getProductById } from "@/services/product.service";
import { CategorySelect } from "@/components/categories/CategorySelect";

interface ProductFormProps {
  initialData?: ProductFormData;
  productId?: string;
  onSuccess: () => void;
}

const initialFormData: ProductFormData = {
  nombre: "",
  description: "",
  price: 0,
  stock: 0,
  category_id: "",
  isActive: true,
  code: "",
};

export function ProductForm({ initialData, productId, onSuccess }: ProductFormProps) {
  const router = useRouter();
  const isEditing = !!productId;

  const [formData, setFormData] = useState<ProductFormData>(initialData ?? initialFormData);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(isEditing && !initialData);
  const [submitting, setSubmitting] = useState(false);

  // Load product data in edit mode when productId is provided but no initialData
  useEffect(() => {
    if (isEditing && productId && !initialData) {
      let cancelled = false;
      const fetchProduct = async () => {
        try {
          const product = await getProductById(productId);
          if (!cancelled && product) {
            setFormData({
              nombre: product.nombre,
              description: product.description ?? "",
              price: Number(product.price),
              stock: product.stock,
              category_id: product.category_id ?? "",
              isActive: product.isActive,
              code: product.code ?? "",
            });
          } else if (!cancelled) {
            setError("Producto no encontrado");
          }
        } catch {
          if (!cancelled) {
            setError("Error al cargar el producto");
          }
        } finally {
          if (!cancelled) {
            setLoading(false);
          }
        }
      };

      fetchProduct();
      return () => { cancelled = true; };
    }
  }, [isEditing, productId, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? 0 : Number(value)) : value,
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.nombre.trim()) {
      setError("El nombre es obligatorio");
      return false;
    }
    if (formData.price <= 0) {
      setError("El precio debe ser mayor a 0");
      return false;
    }
    if (formData.stock < 0) {
      setError("El stock no puede ser negativo");
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
      if (isEditing && productId) {
        await updateProduct(productId, formData);
      } else {
        await createProduct(formData);
      }
      onSuccess();
    } catch {
      setError(`Error al ${isEditing ? "actualizar" : "crear"} el producto. Intente nuevamente.`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{isEditing ? "Editar producto" : "Crear producto"}</h1>
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
        <h1 className="text-3xl font-bold text-gray-900">{isEditing ? "Editar producto" : "Crear producto"}</h1>
        <p className="mt-2 text-gray-600">{isEditing ? "Actualice la información del producto" : "Complete el formulario para agregar un nuevo producto"}</p>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre *
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              required
              value={formData.nombre}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/20 transition"
              placeholder="Nombre del producto"
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
              placeholder="Descripción del producto"
              disabled={submitting}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Precio *
              </label>
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0.01"
                required
                value={formData.price}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/20 transition"
                placeholder="0.00"
                disabled={submitting}
              />
            </div>

            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                Stock *
              </label>
              <input
                id="stock"
                name="stock"
                type="number"
                min="0"
                required
                value={formData.stock}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/20 transition"
                placeholder="0"
                disabled={submitting}
              />
            </div>
          </div>

          <CategorySelect
            value={formData.category_id}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                category_id: value,
              }))
            }
            disabled={submitting}
          />

          <div>
            <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 mb-1">
              Codigo del producto
            </label>
            <input
              id="code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/20 transition"
              placeholder="-------"
              disabled={submitting}
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              id="isActive"
              name="isActive"
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData((prev) => ({ ...prev, isActive: e.target.checked }))}
              className="h-4 w-4 rounded border-gray-300 text-black focus:ring-2 focus:ring-black/20"
              disabled={submitting}
            />
            <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
              Activo
            </label>
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (isEditing ? "Guardando..." : "Creando...") : (isEditing ? "Guardar cambios" : "Crear producto")}
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