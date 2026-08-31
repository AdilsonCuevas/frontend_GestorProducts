import { getProducts } from "@/services/product.service";
import { Product } from "@/types/product";

export default async function Home() {
  let products: Product[] = [];
  let error = "";

  try {
    products = await getProducts();
  } catch (e) {
    error = "No fue posible cargar los productos.";
  }

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Tienda
          </h1>

          <p className="mt-1 text-gray-500">
            Nuestros productos
          </p>
        </div>
      </header>

      {/* Contenido */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        {error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-5 text-red-700">
            {error}
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-lg bg-white p-10 text-center shadow-sm">
            <p className="text-gray-500">
              No hay productos disponibles.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Productos
              </h2>

              <p className="text-sm text-gray-500">
                {products.length} productos encontrados
              </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      {/* Sin imagen */}

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

        <span className="text-sm text-gray-500">
          Stock: {product.stock}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-gray-900">
        {product.nombre}
      </h3>

      <p className="mt-2 min-h-[48px] text-sm leading-6 text-gray-500">
        {product.description || "Sin descripción disponible."}
      </p>

      <div className="mt-auto pt-6">
        <p className="text-2xl font-bold text-gray-900">
          ${Number(product.price).toLocaleString("es-CO")}
        </p>

        <button
          type="button"
          className="mt-4 w-full rounded-lg bg-black px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Ver producto
        </button>
      </div>
    </article>
  );
}