import { randomUUID } from "node:crypto";

import { db } from "@devtrace/database";

import type { ResearchSession, SessionSummary } from "../models/session.model.js";
import type { PageActivity } from "../models/page.model.js";


const insertSession = db.prepare(`
INSERT INTO sessions (
    id,
    started_at,
    ended_at,
    created_at
)
VALUES (?, ?, ?, ?)
`);


const getLatestSessionStatement = db.prepare(`
SELECT
    id,
    started_at,
    ended_at,
    created_at
FROM sessions
ORDER BY ended_at DESC
LIMIT 1
`);


const updateSessionEndTimeStatement = db.prepare(`
UPDATE sessions
SET ended_at = ?
WHERE id = ?
`);

export function createSession(): ResearchSession {

    const now = new Date().toISOString();

    const session: ResearchSession = {
        id: randomUUID(),

        startedAt: now,

        endedAt: now,

        createdAt: now
    };

    insertSession.run(
        session.id,
        session.startedAt,
        session.endedAt,
        session.createdAt
    );

    return session;
}


export function getLatestSession():
    ResearchSession | null {

    const row =
        getLatestSessionStatement.get() as
        | {
              id: string;
              started_at: string;
              ended_at: string;
              created_at: string;
          }
        | undefined;

    if (!row) {
        return null;
    }

    return {
        id: row.id,

        startedAt: row.started_at,

        endedAt: row.ended_at,

        createdAt: row.created_at
    };
}


export function updateSessionEndTime(
  sessionId: string,
  endedAt: string = new Date().toISOString()
): void {
  updateSessionEndTimeStatement.run(endedAt, sessionId);
}



const getAllSessionsStatement = db.prepare(`
SELECT
    s.id,
    s.started_at,
    s.ended_at,
    COUNT(p.id) AS page_count
FROM sessions s
LEFT JOIN pages p
ON s.id = p.session_id
GROUP BY s.id
ORDER BY s.started_at DESC
`);

export function getAllSessions(): SessionSummary[] {

    const rows = getAllSessionsStatement.all() as {
        id: string;
        started_at: string;
        ended_at: string;
        page_count: number;
    }[];

    return rows.map(row => ({
        id: row.id,
        startedAt: row.started_at,
        endedAt: row.ended_at,
        pageCount: Number(row.page_count)
    }));
}


const getSessionByIdStatement = db.prepare(`
SELECT
    id,
    started_at,
    ended_at,
    created_at
FROM sessions
WHERE id = ?
`);

export function getSessionById(
    id: string
): ResearchSession | null {

    const row =
        getSessionByIdStatement.get(id) as
        | {
              id: string;
              started_at: string;
              ended_at: string;
              created_at: string;
          }
        | undefined;

    if (!row) {
        return null;
    }

    return {
        id: row.id,
        startedAt: row.started_at,
        endedAt: row.ended_at,
        createdAt: row.created_at
    };
}

const getPagesBySessionStatement = db.prepare(`
SELECT
    id,
    url,
    title,
    visited_at
FROM pages
WHERE session_id = ?
ORDER BY visited_at ASC
`);

export function getPagesBySession(
    sessionId: string
): PageActivity[] {

    const rows =
        getPagesBySessionStatement.all(sessionId) as {
            id: string;
            url: string;
            title: string;
            visited_at: string;
        }[];

    return rows.map(row => ({
        id: row.id,
        url: row.url,
        title: row.title,
        visitedAt: row.visited_at
    }));
}