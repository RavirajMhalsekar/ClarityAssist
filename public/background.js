
// ClarityAssist Background Script
// This script runs in the background of the browser.

console.log("ClarityAssist background script loaded.");

// Listen for the extension being installed or updated
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    console.log("ClarityAssist installed for the first time!");
    // Initialize default settings in chrome.storage.sync here if needed
    const initialCustomizeSettings = {
      fontSize: 100,
      letterSpacing: 0,
      wordSpacing: 0,
      lineSpacing: 100,
      colorSaturation: 100,
      contrastValue: 100,
      invertColors: false,
      websiteDarkMode: false,
    };
    const initialEnabledProfiles = {};

    chrome.storage.sync.set({
      clarityAssistSettings: initialCustomizeSettings,
      clarityAssistEnabledProfiles: initialEnabledProfiles
    }, () => {
      console.log("Default settings initialized.");
    });

  } else if (details.reason === "update") {
    const previousVersion = details.previousVersion;
    console.log(`ClarityAssist updated from ${previousVersion} to ${chrome.runtime.getManifest().version}`);
    // Handle migrations or updates to settings if necessary
  }
});

// Example: Listen for messages from other parts of the extension (popup, content scripts)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Background script received message:", request, "from sender:", sender);

  if (request.type === "GET_SETTINGS") {
    chrome.storage.sync.get(['clarityAssistSettings', 'clarityAssistEnabledProfiles'], (data) => {
      sendResponse({ settings: data.clarityAssistSettings, profiles: data.clarityAssistEnabledProfiles });
    });
    return true; // Indicates that the response is sent asynchronously
  }

  // Add other message handlers as needed
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
