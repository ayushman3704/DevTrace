export default function LoadingState() {
  return (
    <div className="flex min-h-[300px] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-blue-600" />

        <h2 className="mt-4 text-xl font-semibold">
          Loading DevTrace...
        </h2>

        <p className="mt-2 text-slate-500">
          Fetching your browsing history.
        </p>
      </div>
    </div>
  );
}