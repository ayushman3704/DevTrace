import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { Activity } from "../types/activity";

import Header from "../components/Header";
import ActivityList from "../components/ActivityList";
import SearchBar from "../components/SearchBar";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";
import RefreshButton from "../components/RefreshButton";


import type { SessionSummary } from "../types/session";
import { getSessions } from "../services/session.service";

import SessionList from "../components/SessionList";

import { getSessionDetails } from "../services/session.service";

export default function Dashboard() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [displayedActivities, setDisplayedActivities] = useState<Activity[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const [debouncedQuery, setDebouncedQuery] = useState("");

  const [sessions, setSessions] = useState<SessionSummary[]>([]);

  const [selectedSessionId, setSelectedSessionId] =
  useState<string | null>(null);

  const [sessionActivities, setSessionActivities] =
  useState<Activity[]>([]);


  const loadActivities = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/activity/page");

      setActivities(response.data.data);
      setDisplayedActivities(response.data.data);
    } catch {
      setError("Unable to connect to the backend.");
    } finally {
      setLoading(false);
    }
  };

  const loadSessions = async () => {
  try {
    const data = await getSessions();

    setSessions(data);

    if (data.length > 0) {

    setSelectedSessionId(data[0].id);

    await loadSessionDetails(data[0].id);

}
  } catch {
    setError("Unable to load research sessions.");
  }
};

  useEffect(() => {
  loadActivities();
  loadSessions();
}, []);

  const searchActivities = async (query: string) => {
    const keyword = query.trim();

    if (keyword === "") {
      setDisplayedActivities(activities);
      return;
    }

    try {
      const response = await api.get("/activity/page/search", {
        params: {
          q: keyword,
        },
      });

      setDisplayedActivities(response.data.data);
    } catch {
      setError("Unable to search activities.");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);


  useEffect(() => {
    searchActivities(debouncedQuery);
  }, [debouncedQuery, activities]);


  const loadSessionDetails = async (
  sessionId: string
) => {
  try {
    const details =
      await getSessionDetails(sessionId);

    setSessionActivities(details.pages);
  } catch {
    setError("Unable to load session.");
  }
};

const handleSessionSelect = async (
  sessionId: string
) => {

  setSelectedSessionId(sessionId);

  await loadSessionDetails(sessionId);

};

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={loadActivities} />;
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-6xl p-8">
        <Header
    activityCount={activities.length}
    filteredCount={activities.length}
    backendConnected={!error}
/>

        <div className="sticky top-0 z-20 mb-8 bg-slate-100 py-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>

            <RefreshButton
  loading={loading}
  onRefresh={async () => {
    await loadActivities();
    await loadSessions();
  }}
/>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">

  {/* Left Panel */}
  <section className="lg:col-span-1">
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-6 text-xl font-semibold">
        📚 Research Sessions
      </h2>

      {sessions.length === 0 ? (
        <EmptyState
          title="No Research Sessions"
          description="Start browsing to create your first research session."
        />
      ) : (
        <SessionList
          sessions={sessions}
          selectedSessionId={selectedSessionId}
          onSelect={handleSessionSelect}
        />
      )}

    </div>
  </section>

  {/* Right Panel */}
  <section className="lg:col-span-2">
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-6 text-xl font-semibold">
        Session Activity
      </h2>

      {selectedSessionId === null ? (
        <EmptyState
          title="No Session Selected"
          description="Select a research session to view its pages."
        />
      ) : sessionActivities.length === 0 ? (
        <EmptyState
          title="No Pages"
          description="This session has no recorded pages."
        />
      ) : (
        <ActivityList
          activities={sessionActivities}
        />
      )}

    </div>
  </section>

</div>
        {/* <section>
          <h2 className="mb-4 text-2xl font-semibold">Recent Activity</h2>

          {activities.map((activity) => (
            <div
              key={activity.id}
              className="mb-4 rounded-lg bg-white p-4 shadow"
            >
              <h3 className="font-semibold">{activity.title}</h3>

              <p className="text-blue-600">{activity.url}</p>

              <small className="text-slate-500">
                {new Date(activity.visitedAt).toLocaleString()}
              </small>
            </div>
          ))}
        </section> */}
      </div>
    </main>
  );
}
