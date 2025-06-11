import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface AccessibilityContextType {
  enabledProfiles: Record<string, boolean>;
  toggleProfile: (profileId: string, enabled: boolean) => void;
}

const AccessibilityContext = createContext<
  AccessibilityContextType | undefined
>(undefined);

interface AccessibilityProviderProps {
  children: ReactNode;
  externalEnabledProfiles?: Record<string, boolean>;
  externalSetEnabledProfiles?: (profiles: Record<string, boolean>) => void;
}

export function AccessibilityProvider({
  children,
  externalEnabledProfiles,
  externalSetEnabledProfiles,
}: AccessibilityProviderProps) {
  const [internalEnabledProfiles, setInternalEnabledProfiles] = useState<
    Record<string, boolean>
  >({});

  const enabledProfiles = externalEnabledProfiles ?? internalEnabledProfiles;
  const setEnabledProfiles =
    externalSetEnabledProfiles ?? setInternalEnabledProfiles;

  // Monitor changes to color blind profile
  useEffect(() => {
    if (enabledProfiles["color-blind"]) {
      // When color blind profile is enabled, ensure colorDeficiencyType is set
      chrome.storage.sync.get(["clarityAssistSettings"], (result) => {
        const settings = result.clarityAssistSettings || {};
        if (!settings.colorDeficiencyType) {
          // Default to protanopia if no type is set
          chrome.storage.sync.set({
            clarityAssistSettings: {
              ...settings,
              colorDeficiencyType: "protanopia",
            },
          });
        }
      });
    } else {
      // When color blind profile is disabled, clear colorDeficiencyType
      chrome.storage.sync.get(["clarityAssistSettings"], (result) => {
        const settings = result.clarityAssistSettings || {};
        if (settings.colorDeficiencyType) {
          chrome.storage.sync.set({
            clarityAssistSettings: {
              ...settings,
              colorDeficiencyType: null,
            },
          });
        }
      });
    }
  }, [enabledProfiles["color-blind"]]);

  const toggleProfile = (profileId: string, enabled: boolean) => {
    const newProfiles = {
      ...enabledProfiles,
      [profileId]: enabled,
    };
    setEnabledProfiles(newProfiles);

    // Save to chrome.storage.sync
    chrome.storage.sync.set({
      clarityAssistEnabledProfiles: newProfiles,
    });
  };

  return (
    <AccessibilityContext.Provider value={{ enabledProfiles, toggleProfile }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error(
      "useAccessibility must be used within an AccessibilityProvider"
    );
  }
  return context;
}
