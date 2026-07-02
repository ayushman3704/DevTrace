import { db } from "./database.js";
import {
  CREATE_SESSIONS_TABLE,
  CREATE_PAGES_TABLE,
} from "./schema.js";

export function runMigrations() {

  console.log(CREATE_SESSIONS_TABLE);
  console.log(CREATE_PAGES_TABLE);

  
  db.exec(CREATE_SESSIONS_TABLE);
  db.exec(CREATE_PAGES_TABLE);

  console.log("✅ Database migrations completed");
}