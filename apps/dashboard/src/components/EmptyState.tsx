interface EmptyStateProps {
  title?: string;
  description?: string;
}

export default function EmptyState({
  title = "No Activity Found",
  description = "Browse a few developer websites using the DevTrace extension and refresh this page.",
}: EmptyStateProps) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
      <div className="text-6xl">📭</div>

      <h2 className="mt-4 text-2xl font-semibold">
        {title}
      </h2>

      <p className="mt-3 text-slate-500">
        {description}
      </p>
    </div>
  );
}