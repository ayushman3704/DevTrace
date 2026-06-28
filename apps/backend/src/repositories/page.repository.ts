import { randomUUID } from "node:crypto";

import { pageStore } from "../data/page.store.js";
import { PageActivity } from "../models/page.model.js";

export function createPage(
  url: string,
  title: string
): PageActivity {
  const page: PageActivity = {
    id: randomUUID(),
    url,
    title,
    visitedAt: new Date().toISOString(),
  };

  pageStore.push(page);

  return page;
}

export function getAllPages(): PageActivity[] {
  return pageStore;
}