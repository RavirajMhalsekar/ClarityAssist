// ClarityAssist content script
console.log("ClarityAssist content script loaded.");

let currentSettings = {};
let currentProfiles = {};
let styleElement = null;

// Function to create and inject styles
function createStyleElement() {
  if (styleElement) {
    styleElement.remove();
  }
  styleElement = document.createElement("style");
  styleElement.id = "clarity-assist-styles";
  document.head.appendChild(styleElement);
  return styleElement;
}

// Function to apply styles based on settings
function applyAccessibilitySettings(settings, profiles) {
  console.log("Applying settings:", settings);
  console.log("Applying profiles:", profiles);

  const style = createStyleElement();

  // Build CSS custom properties
  let cssVars = "";
  let filterStyle = "";

  // Handle color and contrast settings
  if (settings.invertColors) {
    filterStyle += "invert(1) ";
  } else if (settings.websiteDarkMode) {
    cssVars += `
      html {
        background-color: #1a1a1a !important;
      }
      html body,
      html div,
      html section,
      html article,
      html aside,
      html nav,
      html header,
      html footer,
      html main {
        background-color: #1a1a1a !important;
        color: #ffffff !important;
      }
      html a {
        color: #66b3ff !important;
      }
      html input,
      html textarea,
      html select {
        background-color: #333333 !important;
        color: #ffffff !important;
        border-color: #666666 !important;
      }
      html button {
        background-color: #333333 !important;
        color: #ffffff !important;
        border: 1px solid #666666 !important;
      }
    `;
  }

  // Apply color saturation and contrast settings if defined
  if (settings.colorSaturation !== undefined) {
    filterStyle += `saturate(${settings.colorSaturation}%) `;
  }
  if (settings.contrastValue !== undefined) {
    filterStyle += `contrast(${settings.contrastValue}%) `;
  }

  // Base styles for all elements
  style.textContent = `
    /* Root level filters */
    html {
      ${filterStyle ? `filter: ${filterStyle.trim()} !important;` : ""}
    }

    /* Text adjustments - apply to all text elements */
    html body,
    html button,
    html input,
    html select,
    html textarea,
    html a,
    html p,
    html span,
    html div,
    html h1,
    html h2,
    html h3,
    html h4,
    html h5,
    html h6,
    html li,
    html td,
    html th,
    html label {
      font-size: ${settings.fontSize}% !important;
      letter-spacing: ${settings.letterSpacing}px !important;
      word-spacing: ${settings.wordSpacing}px !important;
      line-height: ${settings.lineSpacing / 100} !important;
    }

    /* Profile-specific styles */
    ${
      profiles["dyslexia"]
        ? `
      @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600&display=swap');
      html * {
        font-family: 'Lexend', sans-serif !important;
        line-height: 1.5 !important;
        letter-spacing: 0.5px !important;
        word-spacing: 3px !important;
      }
      html p {
        max-width: 80ch !important;
      }
    `
        : ""
    }

    ${
      profiles["reading-guide"]
        ? `
      .clarity-reading-guide {
        position: fixed;
        left: 0;
        right: 0;
        height: 30px;
        background: rgba(255, 255, 0, 0.1);
        pointer-events: none;
        z-index: 999999;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }
    `
        : ""
    }

    ${
      profiles["readable-font"]
        ? `
      html * {
        font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif !important;
        line-height: 1.6 !important;
      }
      html p, html li {
        font-size: 18px !important;
        max-width: 70ch !important;
      }
    `
        : ""
    }

    ${
      profiles["keyboard-nav"]
        ? `
      html *:focus {
        outline: 3px solid #0066cc !important;
        outline-offset: 2px !important;
      }
      html button,
      html a,
      html input,
      html select,
      html [role="button"] {
        cursor: pointer !important;
      }
      html [data-focus-visible] {
        box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.5) !important;
      }
    `
        : ""
    }

    ${
      profiles["translate"]
        ? `
      .clarity-translate-btn {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #0066cc;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 8px 16px;
        font-size: 14px;
        cursor: pointer;
        z-index: 999999;
      }
    `
        : ""
    }

    ${
      profiles["color-blind"]
        ? `
      html {
        filter: ${filterStyle} 
          ${
            settings.colorDeficiencyType === "protanopia"
              ? "url(#protanopia-filter)"
              : settings.colorDeficiencyType === "deuteranopia"
              ? "url(#deuteranopia-filter)"
              : settings.colorDeficiencyType === "tritanopia"
              ? "url(#tritanopia-filter)"
              : ""
          } !important;
      }
      html [role="img"],
      html [role="graphics-symbol"] {
        border: 1px solid currentColor !important;
      }
      html [data-color-primitive] {
        border: 1px solid currentColor !important;
        position: relative !important;
      }
      html [data-color-primitive]::after {
        content: attr(data-color-primitive);
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        background: #000;
        color: #fff;
        padding: 2px 4px;
        border-radius: 2px;
        font-size: 12px;
        white-space: nowrap;
        display: none;
      }
      html [data-color-primitive]:hover::after {
        display: block;
      }
    `
        : ""
    }

    /* Dark mode overrides */
    ${cssVars}
  `;

  // Add SVG filters for color blindness simulation if needed
  if (profiles["color-blind"]) {
    let svgFilters = document.querySelector("#clarity-color-filters");
    if (!svgFilters) {
      svgFilters = document.createElement("div");
      svgFilters.id = "clarity-color-filters";
      svgFilters.innerHTML = `
        <svg style="display:none">
          <defs>
            <filter id="protanopia-filter">
              <feColorMatrix
                in="SourceGraphic"
                type="matrix"
                values="0.567, 0.433, 0,     0, 0
                        0.558, 0.442, 0,     0, 0
                        0,     0.242, 0.758, 0, 0
                        0,     0,     0,     1, 0"/>
            </filter>
            <filter id="deuteranopia-filter">
              <feColorMatrix
                in="SourceGraphic"
                type="matrix"
                values="0.625, 0.375, 0,   0, 0
                        0.7,   0.3,   0,   0, 0
                        0,     0.3,   0.7, 0, 0
                        0,     0,     0,   1, 0"/>
            </filter>
            <filter id="tritanopia-filter">
              <feColorMatrix
                in="SourceGraphic"
                type="matrix"
                values="0.95, 0.05,  0,     0, 0
                        0,    0.433, 0.567, 0, 0
                        0,    0.475, 0.525, 0, 0
                        0,    0,     0,     1, 0"/>
            </filter>
          </defs>
        </svg>
      `;
      document.body.appendChild(svgFilters);
    }
  } else {
    const svgFilters = document.querySelector("#clarity-color-filters");
    if (svgFilters) svgFilters.remove();
  }

  // Add reading guide if enabled
  if (profiles["reading-guide"]) {
    let guide = document.querySelector(".clarity-reading-guide");
    if (!guide) {
      guide = document.createElement("div");
      guide.className = "clarity-reading-guide";
      document.body.appendChild(guide);
      document.addEventListener("mousemove", (e) => {
        guide.style.top = `${e.clientY - 15}px`;
      });
    }
  } else {
    const guide = document.querySelector(".clarity-reading-guide");
    if (guide) guide.remove();
  }

  // Add translation button if enabled
  if (profiles["translate"]) {
    let translateBtn = document.querySelector(".clarity-translate-btn");
    if (!translateBtn) {
      translateBtn = document.createElement("button");
      translateBtn.className = "clarity-translate-btn";
      translateBtn.textContent = "Translate";
      translateBtn.addEventListener("click", () => {
        const selection = window.getSelection().toString();
        if (selection) {
          window.open(
            `https://translate.google.com/?text=${encodeURIComponent(
              selection
            )}`,
            "_blank"
          );
        }
      });
      document.body.appendChild(translateBtn);
    }
  } else {
    const translateBtn = document.querySelector(".clarity-translate-btn");
    if (translateBtn) translateBtn.remove();
  }
}

// Initialize settings from storage
chrome.storage.sync.get(
  ["clarityAssistSettings", "clarityAssistEnabledProfiles"],
  (data) => {
    currentSettings = data.clarityAssistSettings || getDefaultSettings();
    currentProfiles = data.clarityAssistEnabledProfiles || {};
    applyAccessibilitySettings(currentSettings, currentProfiles);
  }
);

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "PING") {
    // Respond to ping to confirm content script is loaded
    sendResponse({ status: "ok" });
    return true;
  }

  if (request.type === "SETTINGS_UPDATED") {
    currentSettings = request.settings || currentSettings;
    currentProfiles = request.profiles || currentProfiles;
    applyAccessibilitySettings(currentSettings, currentProfiles);
    sendResponse({ status: "Settings applied successfully" });
  }
  return true; // Required for async response
});

// Default settings
function getDefaultSettings() {
  return {
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
}
