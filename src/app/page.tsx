import { getProducts } from "@/services/product.service";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductGrid } from "@/components/ProductGrid";
import { ErrorMessage } from "@/components/ErrorMessage";

export default async function Home() {
  let products: Awaited<ReturnType<typeof getProducts>> = [];
  let error = "";

  try {
    products = await getProducts();
  } catch {
    error = "No fue posible cargar los productos.";
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />

      <main className="flex-1 w-full">
        {error ? (
          <ErrorMessage message={error} />
        ) : (
          <>
            <section className="mx-auto max-w-7xl px-6 py-10">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Productos</h2>
                <p className="text-sm text-gray-500">{products.length} productos encontrados</p>
              </div>
              <ProductGrid products={products} />
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}