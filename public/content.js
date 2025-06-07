// This content script will run on web pages.
// You'll implement logic here to:
// 1. Listen for settings changes from chrome.storage (updated by the popup).
// 2. Apply accessibility modifications to the page's DOM and styles.
console.log("ClarityAssist content.js loaded.");

// --- Constants for styling ---
const CLARITY_ASSIST_STYLE_ID = 'clarity-assist-dynamic-styles';
const CLARITY_ASSIST_PROFILE_CLASS_PREFIX = 'clarity-assist-profile-';

// --- Helper function to apply styles ---
function applyDynamicStyles(settings) {
  let styleElement = document.getElementById(CLARITY_ASSIST_STYLE_ID);
  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.id = CLARITY_ASSIST_STYLE_ID;
    document.head.appendChild(styleElement);
  }

  let filterStyle = '';
  if (settings.invertColors) {
    filterStyle += 'invert(1) ';
  } else if (settings.websiteDarkMode) {
    // This is a common technique for a "smart" dark mode.
    // It inverts colors and then corrects hue for images/videos.
    filterStyle += 'invert(1) hue-rotate(180deg) ';
  }
  filterStyle += `saturate(${settings.colorSaturation}%) contrast(${settings.contrastValue}%)`;

  // Apply styles to the html element for broad impact.
  // Using !important can be necessary to override existing site styles, but use cautiously.
  styleElement.textContent = `
    html {
      font-size: ${settings.fontSize}% !important;
      letter-spacing: ${settings.letterSpacing}px !important;
      word-spacing: ${settings.wordSpacing}px !important;
      line-height: ${settings.lineSpacing}% !important;
      filter: ${filterStyle.trim() || 'none'} !important;
    }
    /* If websiteDarkMode or invertColors is active, ensure images/videos are not double-inverted or hue-rotated badly */
    ${(settings.websiteDarkMode || settings.invertColors) ? `
    html img, html video, html iframe {
      filter: invert(1) hue-rotate(180deg); /* Counter-act the main filter */
    }` : ''}
  `;
}

// --- Helper function to manage profile-specific body classes ---
function updateProfileClasses(profiles) {
  // Remove any existing profile classes
  document.body.className = document.body.className
    .split(' ')
    .filter(cls => !cls.startsWith(CLARITY_ASSIST_PROFILE_CLASS_PREFIX))
    .join(' ');

  // Add new profile classes
  Object.keys(profiles).forEach(profileId => {
    if (profiles[profileId]) {
      document.body.classList.add(`${CLARITY_ASSIST_PROFILE_CLASS_PREFIX}${profileId}`);
    }
  });
  // You would then have CSS in content_styles.css that targets these classes.
  // e.g., .clarity-assist-profile-motor-impaired { /* specific styles */ }
}


// --- Load settings from storage and apply ---
function loadAndApplySettings() {
  chrome.storage.sync.get(['customizeSettings', 'enabledProfiles'], (data) => {
    if (chrome.runtime.lastError) {
      console.error(`Error retrieving settings: ${chrome.runtime.lastError.message}`);
      return;
    }

    const defaultCustomizeSettings = {
      fontSize: 100, letterSpacing: 0, wordSpacing: 0, lineSpacing: 100,
      colorSaturation: 100, contrastValue: 100, invertColors: false, websiteDarkMode: false,
    };
    const defaultEnabledProfiles = {};

    const customizeSettings = data.customizeSettings || defaultCustomizeSettings;
    const enabledProfiles = data.enabledProfiles || defaultEnabledProfiles;

    applyDynamicStyles(customizeSettings);
    updateProfileClasses(enabledProfiles);
  });
}

// --- Listen for changes in storage ---
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync' && (changes.customizeSettings || changes.enabledProfiles)) {
    console.log('ClarityAssist: Settings changed, reapplying.');
    loadAndApplySettings();
  }
});

// --- Initial application of settings when the content script loads ---
// Ensure the DOM is ready before applying styles, especially for body classes.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadAndApplySettings);
} else {
  loadAndApplySettings();
}
