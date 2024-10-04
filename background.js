let youtubeTabId = null;

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url && tab.url.includes("youtube.com/watch")) {
    youtubeTabId = tabId;
  }
});

chrome.windows.onFocusChanged.addListener((windowId) => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    // No window has focus
    if (youtubeTabId) {
      chrome.tabs.sendMessage(youtubeTabId, { action: "pause" });
    }
  } else {
    chrome.windows.get(windowId, { populate: true }, (window) => {
      if (window.focused && youtubeTabId) {
        chrome.tabs.query({ active: true, windowId: window.id }, (tabs) => {
          if (tabs[0].id === youtubeTabId) {
            chrome.tabs.sendMessage(youtubeTabId, { action: "play" });
          } else {
            chrome.tabs.sendMessage(youtubeTabId, { action: "pause" });
          }
        });
      }
    });
  }
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (tab.url && tab.url.includes("youtube.com/watch")) {
      chrome.tabs.sendMessage(tab.id, { action: "play" });
    } else if (youtubeTabId) {
      chrome.tabs.sendMessage(youtubeTabId, { action: "pause" });
    }
  });
});
