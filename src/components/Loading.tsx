export function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <article key={i} className="rounded-xl border border-gray-200 bg-white p-5 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-2" />
            <div className="h-8 bg-gray-200 rounded w-2/3 mt-auto pt-6" />
          </article>
        ))}
      </div>
    </div>
  );
}