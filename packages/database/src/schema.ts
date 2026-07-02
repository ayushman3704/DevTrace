export const CREATE_SESSIONS_TABLE = `
CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    started_at TEXT NOT NULL,
    ended_at TEXT NOT NULL,
    created_at TEXT NOT NULL
);
`;

export const CREATE_PAGES_TABLE = `
CREATE TABLE IF NOT EXISTS pages (
    id TEXT PRIMARY KEY,
    session_id TEXT NOT NULL,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    visited_at TEXT NOT NULL,

    FOREIGN KEY(session_id)
        REFERENCES sessions(id)
);
`;

// export const CREATE_PAGES_TABLE = `
// CREATE TABLE IF NOT EXISTS pages (
//     id TEXT PRIMARY KEY,
//     url TEXT NOT NULL,
//     title TEXT NOT NULL,
//     visited_at TEXT NOT NULL
// );
// `;