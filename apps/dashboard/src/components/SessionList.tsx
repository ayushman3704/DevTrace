import SessionCard from "./SessionCard";

import type { SessionSummary } from "../types/session";

interface SessionListProps {
  sessions: SessionSummary[];
  selectedSessionId: string | null;
  onSelect: (sessionId: string) => void;
}

export default function SessionList({
  sessions,
  selectedSessionId,
  onSelect,
}: SessionListProps) {
  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <SessionCard
          key={session.id}
          session={session}
          selected={session.id === selectedSessionId}
          onClick={onSelect}
        />
      ))}
    </div>
  );
}