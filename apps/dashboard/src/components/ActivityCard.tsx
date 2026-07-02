import type { Activity } from "../types/activity";
import { getDomain } from "../utils/getDomain";

interface ActivityCardProps {
  activity: Activity;
}

export default function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <a
      href={activity.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
        <h2 className="text-lg font-semibold text-slate-900">
          📄 {activity.title}
        </h2>

        <a
          href={activity.url}
          target="_blank"
          rel="noopener noreferrer"
          title={activity.url}
          className="mt-3 min-w-0 flex-1 flex items-center gap-2 text-blue-600 hover:underline"
        >
          🌐
          <span className="truncate">{getDomain(activity.url)}</span>
        </a>

        <p className="mt-4 text-sm text-slate-500">
          🕒 {new Date(activity.visitedAt).toLocaleString()}
        </p>
      </article>
    </a>
  );
}
