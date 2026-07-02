interface RefreshButtonProps {
  onRefresh: () => void;
  loading: boolean;
}

export default function RefreshButton({
  onRefresh,
  loading,
}: RefreshButtonProps) {
  return (
    <button
      onClick={onRefresh}
      disabled={loading}
      className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
    >
      {loading ? "Refreshing..." : "↻ Refresh"}
    </button>
  );
}