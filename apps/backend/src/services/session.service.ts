import {
  createSession,
  getLatestSession,
  updateSessionEndTime,
} from "../repositories/session.repository.js";

import type { ResearchSession } from "../models/session.model.js";

const SESSION_TIMEOUT_MINUTES = 30;

function getMinutesSince(timestamp: string): number {
  const now = Date.now();
  const previous = new Date(timestamp).getTime();

  return (now - previous) / (1000 * 60);
}

export function assignSession(): ResearchSession {
  const latestSession = getLatestSession();

  // First page ever
  if (!latestSession) {
    return createSession();
  }

  const minutesSinceLastActivity = getMinutesSince(
    latestSession.endedAt
  );

  // Continue existing session
  if (minutesSinceLastActivity <= SESSION_TIMEOUT_MINUTES) {
    updateSessionEndTime(latestSession.id);

    return {
      ...latestSession,
      endedAt: new Date().toISOString(),
    };
  }

  // Start a new session
  return createSession();
}