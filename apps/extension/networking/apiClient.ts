// networking/apiClient.ts

import type { PageVisit } from "../tracking/types"

const API_BASE = "http://localhost:3000"

export async function sendPageVisit(page: PageVisit) {
  try {
    const response = await fetch(`${API_BASE}/activity/page`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        url: page.url,
        title: page.title
      })
    })

    if (!response.ok) {
      throw new Error("Failed to send page")
    }

    console.log("📤 Sent:", page.title)

  } catch (error) {
    console.error("Backend Error:", error)
  }
}