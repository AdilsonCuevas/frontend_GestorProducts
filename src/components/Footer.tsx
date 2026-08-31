export function Footer() {
  return (
    <footer className="border-t bg-white mt-auto">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <p className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Tienda. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}