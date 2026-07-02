import { randomUUID } from "node:crypto";
import { db } from "@devtrace/database";
import type { PageActivity } from "../models/page.model.js";

const insertPage = db.prepare(`
INSERT INTO pages (
    id,
    session_id,
    url,
    title,
    visited_at
)
VALUES (?, ?, ?, ?, ?)
`);

export function createPage(
  sessionId: string,
  url: string,
  title: string,
): PageActivity {
  const page: PageActivity = {
    id: randomUUID(),
    url,
    title,
    visitedAt: new Date().toISOString(),
  };

  insertPage.run(page.id, sessionId, page.url, page.title, page.visitedAt);

  return page;
}

const getPagesStatement = db.prepare(`
SELECT
    id,
    url,
    title,
    visited_at
FROM pages
ORDER BY visited_at DESC
`);

const searchPagesStatement = db.prepare(`
SELECT
    id,
    url,
    title,
    visited_at
FROM pages
WHERE
    LOWER(title) LIKE LOWER(?)
    OR LOWER(url) LIKE LOWER(?)
ORDER BY visited_at DESC
`);

export function getAllPages(): PageActivity[] {
  const rows = getPagesStatement.all() as {
    id: string;
    url: string;
    title: string;
    visited_at: string;
  }[];

  return rows.map((row) => ({
    id: row.id,
    url: row.url,
    title: row.title,
    visitedAt: row.visited_at,
  }));
}

export function searchPages(query: string): PageActivity[] {
  const keyword = `%${query}%`;

  const rows = searchPagesStatement.all(keyword, keyword) as {
    id: string;
    url: string;
    title: string;
    visited_at: string;
  }[];

  return rows.map((row) => ({
    id: row.id,
    url: row.url,
    title: row.title,
    visitedAt: row.visited_at,
  }));
}
