import Database from "better-sqlite3";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database will be created in the project root
const dbPath = path.resolve(__dirname, "../../../devtrace.db");

export const db = new Database(dbPath);

// Helpful SQLite settings
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");