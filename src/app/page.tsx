"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClarityAssistUI } from "@/components/clarity-assist/ClarityAssistUI";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { Sun, Moon, Info, RotateCcw, Github, Linkedin } from "lucide-react";
import type { CustomizeSettings } from "@/components/clarity-assist/CustomizeTab";

const initialCustomizeSettings: CustomizeSettings = {
  fontSize: 100, // percentage
  letterSpacing: 0, // px
  wordSpacing: 0, // px
  lineSpacing: 100, // percentage
  colorSaturation: 100, // percentage
  contrastValue: 100, // percentage
  invertColors: false,
  websiteDarkMode: false,
  colorDeficiencyType: null,
};

const initialEnabledProfiles: Record<string, boolean> = {};

export default function Home() {
  const [isExtensionDarkMode, setIsExtensionDarkMode] = useState(false);
  const [customizeSettings, setCustomizeSettings] = useState<CustomizeSettings>(
    initialCustomizeSettings
  );
  const [enabledProfiles, setEnabledProfiles] = useState<
    Record<string, boolean>
  >(initialEnabledProfiles);
  const { toast } = useToast();

  useEffect(() => {
    const storedTheme = localStorage.getItem("clarity-assist-extension-theme");
    let initialThemeIsDark;
    if (storedTheme) {
      initialThemeIsDark = storedTheme === "dark";
    } else {
      initialThemeIsDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
    }
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

  const toggleExtensionTheme = () => {
    setIsExtensionDarkMode((prev) => !prev);
  };

  const handleResetAll = () => {
    setCustomizeSettings(initialCustomizeSettings);
    setEnabledProfiles(initialEnabledProfiles);
    toast({
      title: "Settings Reset",
      description:
        "All accessibility profiles and customizations have been reset to their default values.",
    });
  };

  const getPageStyles = () => {
    let filterStyle = "";
    if (customizeSettings.invertColors) {
      filterStyle += "invert(1) ";
    } else if (customizeSettings.websiteDarkMode) {
      filterStyle += "invert(1) hue-rotate(180deg) ";
    }
    filterStyle += `saturate(${customizeSettings.colorSaturation}%) contrast(${customizeSettings.contrastValue}%)`;

    return {
      fontSize: `${customizeSettings.fontSize}%`,
      letterSpacing: `${customizeSettings.letterSpacing}px`,
      wordSpacing: `${customizeSettings.wordSpacing}px`,
      lineHeight: `${customizeSettings.lineSpacing}%`,
      filter: filterStyle.trim() || "none",
    };
  };

  const activeProfileNames = Object.entries(enabledProfiles)
    .filter(([, isActive]) => isActive)
    .map(([profileId]) =>
      profileId
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    )
    .join(", ");

  return (
    <main
      className="flex flex-col items-center p-4 sm:p-6 md:p-8 min-h-screen bg-background text-foreground transition-colors duration-300"
      style={getPageStyles()}
    >
      <div className="w-full max-w-lg mx-auto bg-card p-4 sm:p-6 rounded-xl shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-headline font-bold text-primary">
            ClarityAssist
          </h1>
          <div className="flex items-center space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Developer Information"
                >
                  <Info className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">
                      Developer Information
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Developed by Raviraj Mhalsekar, Software Engineer.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <Linkedin className="h-4 w-4 text-primary" />
                      <Link
                        href="https://www.linkedin.com/in/ravirajmhalsekar"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        linkedin.com/in/ravirajmhalsekar
                      </Link>
                    </div>
                    <div className="flex items-center gap-2">
                      <Github className="h-4 w-4 text-primary" />
                      <Link
                        href="https://github.com/RavirajMhalsekar"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        github.com/RavirajMhalsekar
                      </Link>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Button
              variant="outline"
              size="icon"
              onClick={handleResetAll}
              aria-label="Reset all settings"
            >
              <RotateCcw className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleExtensionTheme}
              aria-label="Toggle extension theme"
            >
              {isExtensionDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
        <ClarityAssistUI
          enabledProfiles={enabledProfiles}
          setEnabledProfiles={setEnabledProfiles}
          customizeSettings={customizeSettings}
          setCustomizeSettings={setCustomizeSettings}
        />
        {activeProfileNames && (
          <div className="mt-4 p-3 border border-dashed border-primary rounded-md text-sm text-primary bg-primary/10">
            <p className="font-semibold">Active Profiles (Simulated):</p>
            <p>{activeProfileNames}</p>
            <p className="text-xs mt-1 text-muted-foreground">
              Full simulation of profile behaviors (e.g., keyboard navigation,
              screen reader enhancements) is not applied to this UI preview.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
