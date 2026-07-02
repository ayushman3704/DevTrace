import type { PageVisit } from "./types"

import { sendPageVisit } from "../networking/apiClient"

let lastVisit: PageVisit | null = null

export async function processActivity(page: PageVisit) {
  if (!page.url || !page.title) {
    return
  }

  if (
    lastVisit &&
    lastVisit.url === page.url
  ) {
    return
  }

  lastVisit = page

  console.log("✅ New Page")

  await sendPageVisit(page)
}