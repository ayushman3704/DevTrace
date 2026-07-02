interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorState({
  message,
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="rounded-xl border border-red-300 bg-red-50 p-10 text-center">
      <div className="text-5xl">❌</div>

      <h2 className="mt-4 text-2xl font-semibold text-red-700">
        Something went wrong
      </h2>

      <p className="mt-3 text-red-600">
        {message}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 rounded-lg bg-red-600 px-5 py-2 text-white transition hover:bg-red-700"
        >
          Retry
        </button>
      )}
    </div>
  );
}