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

  // Apply zoom and enhanced contrast for Elderly profile
  if (profiles["elderly"]) {
    document.body.style.zoom = "150%";
    filterStyle += "contrast(120%) brightness(105%) ";
  }
  // Apply zoom for Low Vision profile
  else if (profiles["low-vision"]) {
    document.body.style.zoom = "175%";
  } else {
    document.body.style.zoom = "100%";
  }

  // Handle color and contrast settings
  if (settings.invertColors) {
    filterStyle += "invert(1) ";
  }

  // Apply color blind adjustments
  if (profiles["color-blind"]) {
    switch (settings.colorDeficiencyType) {
      case "protanopia":
        // Enhance reds and greens for red-blind
        filterStyle += "sepia(20%) hue-rotate(330deg) ";
        cssVars += `
          html {
            --color-blind-red: #FF8C8C;
            --color-blind-green: #B4D98C;
          }
          html [style*="color: red"],
          html [style*="background: red"],
          html [style*="background-color: red"] {
            color: var(--color-blind-red) !important;
            background-color: var(--color-blind-red) !important;
          }
          html [style*="color: green"],
          html [style*="background: green"],
          html [style*="background-color: green"] {
            color: var(--color-blind-green) !important;
            background-color: var(--color-blind-green) !important;
          }
        `;
        break;
      case "deuteranopia":
        // Enhance greens and reds for green-blind
        filterStyle += "sepia(20%) hue-rotate(30deg) ";
        cssVars += `
          html {
            --color-blind-green: #D4E576;
            --color-blind-red: #FF9E9E;
          }
          html [style*="color: green"],
          html [style*="background: green"],
          html [style*="background-color: green"] {
            color: var(--color-blind-green) !important;
            background-color: var(--color-blind-green) !important;
          }
          html [style*="color: red"],
          html [style*="background: red"],
          html [style*="background-color: red"] {
            color: var(--color-blind-red) !important;
            background-color: var(--color-blind-red) !important;
          }
        `;
        break;
      case "tritanopia":
        // Enhance blues and yellows for blue-blind
        filterStyle += "sepia(20%) hue-rotate(200deg) ";
        cssVars += `
          html {
            --color-blind-blue: #99CCFF;
            --color-blind-yellow: #FFEB99;
          }
          html [style*="color: blue"],
          html [style*="background: blue"],
          html [style*="background-color: blue"] {
            color: var(--color-blind-blue) !important;
            background-color: var(--color-blind-blue) !important;
          }
          html [style*="color: yellow"],
          html [style*="background: yellow"],
          html [style*="background-color: yellow"] {
            color: var(--color-blind-yellow) !important;
            background-color: var(--color-blind-yellow) !important;
          }
        `;
        break;
    }

    // Add general color blind enhancements
    cssVars += `
      html {
        /* Enhanced color contrast for common UI elements */
        --cb-link-color: #0077CC;
        --cb-button-bg: #2B5BA1;
        --cb-button-text: #FFFFFF;
        --cb-error: #CC4444;
        --cb-success: #44AA44;
        --cb-warning: #FF9900;
      }

      /* Apply enhanced colors to common elements */
      html a {
        color: var(--cb-link-color) !important;
      }

      html button:not([class*="clarity-"]),
      html input[type="submit"],
      html input[type="button"] {
        background-color: var(--cb-button-bg) !important;
        color: var(--cb-button-text) !important;
        border: 2px solid var(--cb-button-text) !important;
      }

      /* Enhanced error/success/warning colors */
      html [class*="error"],
      html [class*="danger"] {
        color: var(--cb-error) !important;
      }

      html [class*="success"] {
        color: var(--cb-success) !important;
      }

      html [class*="warning"] {
        color: var(--cb-warning) !important;
      }

      /* Improve text contrast */
      html {
        --text-main: #000000;
        --text-secondary: #333333;
        --background-main: #FFFFFF;
        --background-secondary: #F5F5F5;
      }

      html body,
      html p,
      html h1,
      html h2,
      html h3,
      html h4,
      html h5,
      html h6 {
        color: var(--text-main) !important;
      }

      html body {
        background-color: var(--background-main) !important;
      }
    `;
  }

  // Apply color saturation and contrast settings
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
