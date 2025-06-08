import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "@/components/ui/toaster";
import { ClarityAssistUI } from "./components/clarity-assist/ClarityAssistUI";
import { AccessibilityProvider } from "./contexts/AccessibilityContext";
import { type CustomizeSettings } from "./components/clarity-assist/CustomizeTab";
import "./app/globals.css";

const initialCustomizeSettings: CustomizeSettings = {
  fontSize: 100,
  letterSpacing: 0,
  wordSpacing: 0,
  lineSpacing: 100,
  colorSaturation: 100,
  contrastValue: 100,
  invertColors: false,
  websiteDarkMode: false,
};

function PopupContent() {
  const [enabledProfiles, setEnabledProfiles] = useState<
    Record<string, boolean>
  >({});
  const [customizeSettings, setCustomizeSettings] = useState<CustomizeSettings>(
    initialCustomizeSettings
  );

  useEffect(() => {
    // Load saved settings from chrome.storage.sync when component mounts
    chrome.storage.sync.get(
      ["clarityAssistSettings", "clarityAssistEnabledProfiles"],
      (data) => {
        if (data.clarityAssistSettings) {
          setCustomizeSettings(data.clarityAssistSettings);
        }
        if (data.clarityAssistEnabledProfiles) {
          setEnabledProfiles(data.clarityAssistEnabledProfiles);
        }
      }
    );
  }, []);

  useEffect(() => {
    // Save settings to chrome.storage.sync whenever they change
    chrome.storage.sync.set({
      clarityAssistSettings: customizeSettings,
      clarityAssistEnabledProfiles: enabledProfiles,
    });

    // Notify content script of settings changes
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      if (tabs[0]?.id && tabs[0].url?.startsWith("http")) {
        try {
          // Check if we can connect to the tab
          await new Promise((resolve, reject) => {
            chrome.tabs.sendMessage(
              tabs[0].id!,
              { type: "PING" },
              (response) => {
                if (chrome.runtime.lastError) {
                  // Content script not ready, inject it
                  chrome.scripting
                    .executeScript({
                      target: { tabId: tabs[0].id! },
                      files: ["content.js"],
                    })
                    .then(() => {
                      // Now send the actual settings
                      chrome.tabs.sendMessage(tabs[0].id!, {
                        type: "SETTINGS_UPDATED",
                        settings: customizeSettings,
                        profiles: enabledProfiles,
                      });
                    })
                    .catch(console.error);
                } else {
                  // Content script is ready, send settings
                  chrome.tabs.sendMessage(tabs[0].id!, {
                    type: "SETTINGS_UPDATED",
                    settings: customizeSettings,
                    profiles: enabledProfiles,
                  });
                }
              }
            );
          });
        } catch (error) {
          console.warn(
            "Could not establish connection with content script:",
            error
          );
        }
      }
    });
  }, [customizeSettings, enabledProfiles]);

  return (
    <>
      <ClarityAssistUI
        enabledProfiles={enabledProfiles}
        setEnabledProfiles={setEnabledProfiles}
        customizeSettings={customizeSettings}
        setCustomizeSettings={setCustomizeSettings}
      />
      <Toaster />
    </>
  );
}

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <AccessibilityProvider>
      <PopupContent />
    </AccessibilityProvider>
  </React.StrictMode>
);
