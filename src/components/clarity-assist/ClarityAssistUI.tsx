"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Moon, RotateCcw, Sun } from "lucide-react";
import AccessibilityProfilesTab from "./AccessibilityProfilesTab";
import CustomizeTab, { type CustomizeSettings } from "./CustomizeTab";
import { AccessibilityProvider } from "../../contexts/AccessibilityContext";

interface ClarityAssistUIProps {
  enabledProfiles?: Record<string, boolean>;
  setEnabledProfiles?: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  customizeSettings?: CustomizeSettings;
  setCustomizeSettings?: React.Dispatch<
    React.SetStateAction<CustomizeSettings>
  >;
}

export function ClarityAssistUI({
  enabledProfiles: externalEnabledProfiles,
  setEnabledProfiles: externalSetEnabledProfiles,
  customizeSettings: externalCustomizeSettings,
  setCustomizeSettings: externalSetCustomizeSettings,
}: ClarityAssistUIProps = {}) {
  const [internalEnabledProfiles, setInternalEnabledProfiles] = useState<
    Record<string, boolean>
  >({});
  const [internalCustomizeSettings, setInternalCustomizeSettings] =
    useState<CustomizeSettings>({
      fontSize: 100,
      letterSpacing: 0,
      wordSpacing: 0,
      lineSpacing: 100,
      colorSaturation: 100,
      contrastValue: 100,
      invertColors: false,
      websiteDarkMode: false,
      colorDeficiencyType: null,
    });

  // Use either external or internal state
  const enabledProfiles = externalEnabledProfiles ?? internalEnabledProfiles;
  const setEnabledProfiles =
    externalSetEnabledProfiles ?? setInternalEnabledProfiles;
  const customizeSettings =
    externalCustomizeSettings ?? internalCustomizeSettings;
  const setCustomizeSettings =
    externalSetCustomizeSettings ?? setInternalCustomizeSettings;

  const [isExtensionDarkMode, setIsExtensionDarkMode] = useState(false);
  const { toast } = useToast();

  // Load saved settings from storage
  useEffect(() => {
    chrome.storage.sync.get(
      ["clarityAssistSettings", "clarityAssistEnabledProfiles"],
      (result) => {
        if (result.clarityAssistSettings) {
          setCustomizeSettings(result.clarityAssistSettings);
        }
        if (result.clarityAssistEnabledProfiles) {
          setEnabledProfiles(result.clarityAssistEnabledProfiles);
        }
      }
    );
  }, []);

  // Save customize settings to storage when they change
  useEffect(() => {
    chrome.storage.sync.set({
      clarityAssistSettings: customizeSettings,
    });
  }, [customizeSettings]);

  useEffect(() => {
    // Load theme from storage
    const storedTheme = localStorage.getItem("clarity-assist-extension-theme");
    const initialThemeIsDark =
      storedTheme === "dark" ||
      (!storedTheme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsExtensionDarkMode(initialThemeIsDark);
  }, []);

  useEffect(() => {
    if (isExtensionDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("clarity-assist-extension-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("clarity-assist-extension-theme", "light");
    }
  }, [isExtensionDarkMode]);

  const toggleTheme = () => {
    setIsExtensionDarkMode((prev) => !prev);
  };

  const handleReset = () => {
    setCustomizeSettings({
      fontSize: 100,
      letterSpacing: 0,
      wordSpacing: 0,
      lineSpacing: 100,
      colorSaturation: 100,
      contrastValue: 100,
      invertColors: false,
      websiteDarkMode: false,
      colorDeficiencyType: null,
    });
    setEnabledProfiles({});
    toast({
      title: "Settings Reset",
      description:
        "All accessibility profiles and customizations have been reset to their default values.",
    });
  };

  return (
    <AccessibilityProvider
      externalEnabledProfiles={enabledProfiles}
      externalSetEnabledProfiles={setEnabledProfiles}
    >
      <div className="flex flex-col h-full">
        <div className="sticky top-0 z-10 bg-background pt-1 pb-2">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-lg font-semibold text-primary">
              ClarityAssist
            </h1>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleReset}
                aria-label="Reset all settings"
                className="h-7 w-7 hover:bg-violet-600 hover:text-white dark:hover:bg-violet-500 dark:hover:text-white focus-visible:ring-2 focus-visible:ring-violet-500"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="h-7 w-7 hover:bg-violet-600 hover:text-white dark:hover:bg-violet-500 dark:hover:text-white focus-visible:ring-2 focus-visible:ring-violet-500"
              >
                {isExtensionDarkMode ? (
                  <Sun className="h-3.5 w-3.5" />
                ) : (
                  <Moon className="h-3.5 w-3.5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="profiles" className="flex-1">
          <TabsList className="grid w-full grid-cols-2 bg-secondary dark:bg-gray-800 mb-3 p-0.5 h-8 rounded-lg border-0">
            <TabsTrigger
              value="profiles"
              className="text-xs font-medium bg-transparent data-[state=active]:bg-violet-600 data-[state=active]:text-white dark:bg-gray-800 dark:data-[state=active]:bg-violet-500 dark:data-[state=active]:shadow-md dark:data-[state=active]:text-white dark:text-gray-400 dark:hover:bg-gray-700/50 dark:hover:text-white transition-colors rounded"
            >
              Accessibility Profiles
            </TabsTrigger>
            <TabsTrigger
              value="customize"
              className="text-xs font-medium bg-transparent data-[state=active]:bg-violet-600 data-[state=active]:text-white dark:bg-gray-800 dark:data-[state=active]:bg-violet-500 dark:data-[state=active]:shadow-md dark:data-[state=active]:text-white dark:text-gray-400 dark:hover:bg-gray-700/50 dark:hover:text-white transition-colors rounded"
            >
              Customize
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profiles" className="mt-0">
            <AccessibilityProfilesTab
              enabledProfiles={enabledProfiles}
              setEnabledProfiles={setEnabledProfiles}
            />
          </TabsContent>
          <TabsContent value="customize" className="mt-0">
            <CustomizeTab
              settings={customizeSettings}
              setSettings={setCustomizeSettings}
            />
          </TabsContent>
        </Tabs>
      </div>
    </AccessibilityProvider>
  );
}
