import React, { createContext, useContext, useState, ReactNode } from "react";

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
