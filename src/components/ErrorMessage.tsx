interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message = "No fue posible cargar los productos.", onRetry }: ErrorMessageProps) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="rounded-lg border border-red-200 bg-red-50 p-5 text-red-700 text-center">
        <p>{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Reintentar
          </button>
        )}
      </div>
    </div>
  );
}