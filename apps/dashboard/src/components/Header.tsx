interface HeaderProps {
  activityCount: number;
  filteredCount: number;
  backendConnected: boolean;
}

export default function Header({
  activityCount,
  filteredCount,
  backendConnected,
}: HeaderProps) {
  return (
    <header className="mb-8 border-b border-slate-200 pb-6">
      <div className="flex items-start justify-between">
        {/* Left Section */}
        <div>
          <h1 className="text-4xl font-bold tracking-tight">🧠 DevTrace</h1>

          <p className="mt-2 text-slate-600">
            Local-first Developer Research Retrieval Engine
          </p>
        </div>

        {/* Right Section */}
        <div className="text-right">
          <div className="flex items-center justify-end gap-2">
            <span
              className={`h-3 w-3 rounded-full ${
                backendConnected ? "bg-green-500" : "bg-red-500"
              }`}
            />

            <span className="text-sm font-medium">
              {backendConnected ? "Backend Connected" : "Backend Offline"}
            </span>
          </div>

          <p className="mt-2 text-sm text-slate-500">
            {filteredCount === activityCount
              ? `${activityCount} Activities`
              : `Showing ${filteredCount} of ${activityCount}`}
          </p>
        </div>
      </div>
    </header>
  );
}
