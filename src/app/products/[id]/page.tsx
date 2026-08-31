import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductById } from "@/services/product.service";
import { Product } from "@/types/product";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);
  return {
    title: product?.nombre ?? "Producto no encontrado",
    description: product?.description ?? undefined,
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />

      <main className="flex-1 mx-auto max-w-7xl px-6 py-10 w-full">
        <nav className="mb-6 text-sm text-gray-500" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <a href="/" className="hover:underline">Inicio</a>
            </li>
            <li aria-current="page">
              <span className="mx-2">/</span>
              <span className="font-medium text-gray-900">{product.nombre}</span>
            </li>
          </ol>
        </nav>

        <article className="rounded-xl bg-white p-6 sm:p-8 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
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
            {product.category_id && (
              <span className="text-sm text-gray-500">Categoría: {product.category_id}</span>
            )}
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.nombre}</h1>

          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            {product.description ?? "Sin descripción disponible."}
          </p>

          <div className="flex items-center gap-4 mb-8">
            <span className="text-3xl font-bold text-gray-900">
              ${Number(product.price).toLocaleString("es-CO")}
            </span>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Detalles</h2>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-sm">
              <div>
                <dt className="text-gray-500">ID</dt>
                <dd className="font-medium text-gray-900 font-mono">{product.id}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Estado</dt>
                <dd className="font-medium text-gray-900">
                  {product.isActive ? "Activo" : "Inactivo"}
                </dd>
              </div>
              <div>
                <dt className="text-gray-500">Stock disponible</dt>
                <dd className="font-medium text-gray-900">{product.stock}</dd>
              </div>
              {product.category_id && (
                <div>
                  <dt className="text-gray-500">Categoría</dt>
                  <dd className="font-medium text-gray-900">{product.category_id}</dd>
                </div>
              )}
            </dl>
          </div>

          <div className="mt-8">
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              ← Volver a productos
            </a>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}