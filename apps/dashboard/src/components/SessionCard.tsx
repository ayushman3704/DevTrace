import type { SessionSummary } from "../types/session";

interface SessionCardProps {
  session: SessionSummary;
  selected: boolean;
  onClick: (sessionId: string) => void;
}

export default function SessionCard({
  session,
  selected,
  onClick,
}: SessionCardProps) {
  return (
    <button
      onClick={() => onClick(session.id)}
      className={`w-full rounded-xl border p-4 text-left transition ${
        selected
          ? "border-blue-500 bg-blue-50"
          : "border-slate-200 bg-white hover:bg-slate-50"
      }`}
    >
      <h3 className="font-semibold">
        📚 Research Session
      </h3>

      <p className="mt-2 text-sm text-slate-600">
        {session.pageCount} Pages
      </p>

      <p className="mt-2 text-xs text-slate-500">
        {new Date(session.startedAt).toLocaleTimeString()}
        {" → "}
        {new Date(session.endedAt).toLocaleTimeString()}
      </p>
    </button>
  );
}