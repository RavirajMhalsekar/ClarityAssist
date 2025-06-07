// This is the service worker for the extension.
console.log("ClarityAssist background.js (service worker) loaded");

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

// Set default settings on installation
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    chrome.storage.sync.set({
      customizeSettings: initialCustomizeSettings,
      enabledProfiles: initialEnabledProfiles,
    }, () => {
      console.log("ClarityAssist: Default settings saved on installation.");
    });
  }
  // You could also handle updates here if needed:
  // else if (details.reason === "update") {
  //   // Logic to migrate settings or show update notes
  // }
});

// Example: Listen for messages from popup or content scripts (if needed)
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action === "getSettings") {
//     chrome.storage.sync.get(['customizeSettings', 'enabledProfiles'], (data) => {
//       sendResponse(data);
//     });
//     return true; // Indicates you wish to send a response asynchronously
//   }
// });

// Note: You'll also need to create the actual icon files (icon16.png, icon48.png, icon128.png)
// and place them in a `public/icons/` directory for the manifest references to work.
// Placeholder fonts directory for manifest
// Ensure you have a 'fonts' folder in 'public' if you plan to use web_accessible_resources for fonts
