import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            product.isActive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {product.isActive ? "Disponible" : "Inactivo"}
        </span>

        <span className="text-sm text-gray-500">Stock: {product.stock}</span>
      </div>

      <h3 className="text-lg font-semibold text-gray-900">{product.nombre}</h3>

      <p className="mt-2 min-h-[48px] text-sm leading-6 text-gray-500">
        {product.description ?? "Sin descripción disponible."}
      </p>

      <div className="mt-auto pt-6">
        <p className="text-2xl font-bold text-gray-900">
          ${Number(product.price).toLocaleString("es-CO")}
        </p>

        <a
          href={`/products/${product.id}`}
          className="mt-4 w-full rounded-lg bg-black px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800 text-center block"
        >
          Ver producto
        </a>
      </div>
    </article>
  );
}