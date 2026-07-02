// src/tracking/tabTracker.ts

import { processActivity } from "./activityProcessor"

async function logTab(tab: chrome.tabs.Tab) {
  if (!tab.url || !tab.title) {
    return
  }


  await processActivity({
        url: tab.url,
        title: tab.title,
        timestamp: Date.now()
    })

//   console.clear()

//   console.log("==============")

//   console.log("URL:")
//   console.log(tab.url)

//   console.log("")

//   console.log("TITLE:")
//   console.log(tab.title)

//   console.log("==============")
}

chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  const tab = await chrome.tabs.get(tabId)

  await logTab(tab)
})

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status !== "complete") {
    return
  }

  await logTab(tab)
})