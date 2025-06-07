
console.log("ClarityAssist content script loaded.");

let currentSettings = {};
let currentProfiles = {};

// Function to apply styles based on settings
function applyAccessibilitySettings(settings, profiles) {
  console.log("Applying settings in content script:", settings);
  console.log("Applying profiles in content script:", profiles);

  // --- Apply CustomizeSettings ---
  let filterStyle = '';
  if (settings.invertColors) {
    filterStyle += 'invert(1) ';
  } else if (settings.websiteDarkMode) {
    // A common way to simulate dark mode is invert then hue-rotate
    filterStyle += 'invert(1) hue-rotate(180deg) ';
  }

  if (settings.colorSaturation !== undefined) {
    filterStyle += `saturate(${settings.colorSaturation}%) `;
  }
  if (settings.contrastValue !== undefined) {
    filterStyle += `contrast(${settings.contrastValue}%) `;
  }

  document.documentElement.style.setProperty('--clarity-assist-filter', filterStyle.trim() || 'none');
  
  if (settings.fontSize !== undefined) {
    document.documentElement.style.setProperty('--clarity-assist-font-size', `${settings.fontSize}%`);
  }
  if (settings.letterSpacing !== undefined) {
    document.documentElement.style.setProperty('--clarity-assist-letter-spacing', `${settings.letterSpacing}px`);
  }
  if (settings.wordSpacing !== undefined) {
    document.documentElement.style.setProperty('--clarity-assist-word-spacing', `${settings.wordSpacing}px`);
  }
  if (settings.lineSpacing !== undefined) {
    // Note: line-height in CSS is typically just 'lineHeight', not 'lineSpacing'
    document.documentElement.style.setProperty('--clarity-assist-line-height', `${settings.lineSpacing}%`);
  }


  // --- Apply AccessibilityProfiles (Conceptual) ---
  // This is where more complex logic for profiles would go.
  // For example, a "motor-impaired" profile might enhance focus indicators,
  // a "blind" profile might interact with ARIA attributes more explicitly (though much of this is browser-native).

  // Example: If "low-vision" profile is active, ensure high contrast and larger text
  // This might override or combine with individual customizeSettings.
  // For simplicity, we'll assume profiles primarily group sets of customizeSettings,
  // or enable specific JavaScript behaviors not covered by simple CSS.

  if (profiles && profiles['low-vision']) {
    // Example: force higher contrast if low-vision profile is on, overriding slider.
    // document.documentElement.style.setProperty('--clarity-assist-filter', `contrast(150%) ${filterStyle}`);
    // document.documentElement.style.setProperty('--clarity-assist-font-size', `120%`);
    console.log("Low Vision profile is active (simulated effects).");
  }
  
  // Inject or update a style tag for global page modifications
  let styleElement = document.getElementById('clarity-assist-styles');
  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.id = 'clarity-assist-styles';
    document.head.appendChild(styleElement);
  }

  styleElement.textContent = `
    :root {
      filter: var(--clarity-assist-filter, none) !important;
    }
    body {
      font-size: var(--clarity-assist-font-size, inherit) !important;
      letter-spacing: var(--clarity-assist-letter-spacing, inherit) !important;
      word-spacing: var(--clarity-assist-word-spacing, inherit) !important;
      line-height: var(--clarity-assist-line-height, inherit) !important;
    }
    /* Add more specific selectors if needed, e.g., p, div, span */
    /* Or target all elements: * { ... } but be very careful with performance. */
  `;
}


// Listen for messages from the popup or background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "SETTINGS_UPDATED") {
    currentSettings = request.settings || currentSettings;
    currentProfiles = request.profiles || currentProfiles;
    applyAccessibilitySettings(currentSettings, currentProfiles);
    sendResponse({ status: "Settings received and applied" });
  }
  return true; // Indicates that the response will be sent asynchronously
});

// Initial load of settings when the content script is injected
chrome.storage.sync.get(['clarityAssistSettings', 'clarityAssistEnabledProfiles'], (data) => {
  currentSettings = data.clarityAssistSettings || initialCustomizeSettingsFromSomewhere(); // Define or get initial settings
  currentProfiles = data.clarityAssistEnabledProfiles || {};
  applyAccessibilitySettings(currentSettings, currentProfiles);
});

// You'll need a way to define initial default settings if not found in storage.
// This could be hardcoded or fetched.
function initialCustomizeSettingsFromSomewhere() {
  return {
    fontSize: 100,
    letterSpacing: 0,
    wordSpacing: 0,
    lineSpacing: 100,
    colorSaturation: 100,
    contrastValue: 100,
    invertColors: false,
    websiteDarkMode: false,
  };
}
