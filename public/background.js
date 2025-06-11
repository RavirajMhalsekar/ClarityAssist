// ClarityAssist Background Script
// This script runs in the background of the browser.

console.log("ClarityAssist background script loaded.");

// Default settings
const defaultSettings = {
  fontSize: 100,
  letterSpacing: 0,
  wordSpacing: 0,
  lineSpacing: 100,
  colorSaturation: 100,
  contrastValue: 100,
  invertColors: false,
  websiteDarkMode: false,
  colorDeficiencyType: null,
};

// Initialize extension when installed
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    console.log("ClarityAssist installed.");
    // Initialize with default settings
    chrome.storage.sync.set({
      clarityAssistSettings: defaultSettings,
      clarityAssistEnabledProfiles: {},
    });
  }
});

// Listen for tab updates to reapply settings
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url?.startsWith("http")) {
    chrome.storage.sync.get(
      ["clarityAssistSettings", "clarityAssistEnabledProfiles"],
      (data) => {
        chrome.tabs.sendMessage(tabId, {
          type: "SETTINGS_UPDATED",
          settings: data.clarityAssistSettings || defaultSettings,
          profiles: data.clarityAssistEnabledProfiles || {},
        });
      }
    );
  }
});

// Listen for messages from popup or content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "GET_SETTINGS") {
    chrome.storage.sync.get(
      ["clarityAssistSettings", "clarityAssistEnabledProfiles"],
      (data) => {
        sendResponse({
          settings: data.clarityAssistSettings || defaultSettings,
          profiles: data.clarityAssistEnabledProfiles || {},
        });
      }
    );
    return true; // Will respond asynchronously
  }

  if (request.type === "SAVE_SETTINGS") {
    chrome.storage.sync.set(
      {
        clarityAssistSettings: request.settings,
        clarityAssistEnabledProfiles: request.profiles,
      },
      () => {
        // Notify all tabs of the settings change
        chrome.tabs.query({}, (tabs) => {
          tabs.forEach((tab) => {
            if (tab.id && tab.url?.startsWith("http")) {
              chrome.tabs.sendMessage(tab.id, {
                type: "SETTINGS_UPDATED",
                settings: request.settings,
                profiles: request.profiles,
              });
            }
          });
        });
        sendResponse({ status: "Settings saved successfully" });
      }
    );
    return true; // Will respond asynchronously
  }
});

// Example: Context menu item (right-click menu)
// chrome.contextMenus.create({
//   id: "clarity-assist-info",
//   title: "ClarityAssist Info",
//   contexts: ["page", "selection"]
// });

// chrome.contextMenus.onClicked.addListener((info, tab) => {
//   if (info.menuItemId === "clarity-assist-info") {
//     console.log("ClarityAssist context menu item clicked", info);
//     // You could open a page or send a message to a content script
//   }
// });
