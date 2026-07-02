import type { Activity } from "../types/activity";
import ActivityCard from "./ActivityCard";

interface ActivityListProps {
  activities: Activity[];
}

export default function ActivityList({
  activities,
}: ActivityListProps) {
  if (activities.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
        <h2 className="text-xl font-semibold">
          No activity yet
        </h2>

        <p className="mt-2 text-slate-500">
          Browse a few websites using the DevTrace extension,
          then refresh this page.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <ActivityCard
          key={activity.id}
          activity={activity}
        />
      ))}
    </div>
  );
}