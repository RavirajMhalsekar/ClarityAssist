"use client";

import React, { useState } from "react";
import { AdjustmentControl } from "./AdjustmentControl";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  ALargeSmall,
  StretchHorizontal,
  WrapText,
  Baseline,
  Droplets,
  Contrast,
} from "lucide-react";

export interface CustomizeSettings {
  fontSize: number;
  letterSpacing: number;
  wordSpacing: number;
  lineSpacing: number;
  colorSaturation: number;
  contrastValue: number;
  invertColors: boolean;
  websiteDarkMode: boolean;
  colorDeficiencyType: "protanopia" | "deuteranopia" | "tritanopia" | null;
}

interface CustomizeTabProps {
  settings: CustomizeSettings;
  setSettings: React.Dispatch<React.SetStateAction<CustomizeSettings>>;
}

export default function CustomizeTab({
  settings,
  setSettings,
}: CustomizeTabProps) {
  const updateSetting = <K extends keyof CustomizeSettings>(
    key: K,
    value: CustomizeSettings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6 px-1">
      <div className="space-y-4">
        <AdjustmentControl
          label="Font Sizing"
          value={settings.fontSize}
          onChange={(value: number) => updateSetting("fontSize", value)}
          min={50}
          max={200}
          IconComponent={ALargeSmall}
          unit="%"
        />
        <AdjustmentControl
          label="Letter Spacing"
          value={settings.letterSpacing}
          onChange={(value: number) => updateSetting("letterSpacing", value)}
          min={-2}
          max={10}
          IconComponent={StretchHorizontal}
          unit="px"
        />
        <AdjustmentControl
          label="Word Spacing"
          value={settings.wordSpacing}
          onChange={(value: number) => updateSetting("wordSpacing", value)}
          min={-2}
          max={20}
          IconComponent={WrapText}
          unit="px"
        />
        <AdjustmentControl
          label="Line Spacing"
          value={settings.lineSpacing}
          onChange={(value: number) => updateSetting("lineSpacing", value)}
          min={80}
          max={200}
          IconComponent={Baseline}
          unit="%"
        />
        <AdjustmentControl
          label="Color Saturation"
          value={settings.colorSaturation}
          onChange={(value: number) => updateSetting("colorSaturation", value)}
          min={0}
          max={200}
          IconComponent={Droplets}
          unit="%"
        />
        <AdjustmentControl
          label="Contrast"
          value={settings.contrastValue}
          onChange={(value: number) => updateSetting("contrastValue", value)}
          min={50}
          max={200}
          IconComponent={Contrast}
          unit="%"
        />

        <div className="p-3 border border-border rounded-lg bg-background shadow-sm space-y-3">
          <Label className="font-medium text-foreground">
            Color Vision Type
          </Label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => updateSetting("colorDeficiencyType", "protanopia")}
              className={`p-2 text-xs rounded-md transition-colors ${
                settings.colorDeficiencyType === "protanopia"
                  ? "bg-violet-600 text-white dark:bg-violet-500"
                  : "bg-secondary hover:bg-violet-600 hover:text-white"
              }`}
            >
              Protanopia
            </button>
            <button
              onClick={() =>
                updateSetting("colorDeficiencyType", "deuteranopia")
              }
              className={`p-2 text-xs rounded-md transition-colors ${
                settings.colorDeficiencyType === "deuteranopia"
                  ? "bg-violet-600 text-white dark:bg-violet-500"
                  : "bg-secondary hover:bg-violet-600 hover:text-white"
              }`}
            >
              Deuteranopia
            </button>
            <button
              onClick={() => updateSetting("colorDeficiencyType", "tritanopia")}
              className={`p-2 text-xs rounded-md transition-colors ${
                settings.colorDeficiencyType === "tritanopia"
                  ? "bg-violet-600 text-white dark:bg-violet-500"
                  : "bg-secondary hover:bg-violet-600 hover:text-white"
              }`}
            >
              Tritanopia
            </button>
          </div>
          {settings.colorDeficiencyType && (
            <button
              onClick={() => updateSetting("colorDeficiencyType", null)}
              className="text-xs text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
            >
              Reset to Normal Vision
            </button>
          )}
        </div>

        <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-background shadow-sm">
          <Label
            htmlFor="invert-colors-switch"
            className="font-medium text-foreground cursor-pointer"
          >
            Invert Colors (Simulated)
          </Label>
          <Switch
            id="invert-colors-switch"
            checked={settings.invertColors}
            onCheckedChange={(checked) =>
              updateSetting("invertColors", checked)
            }
          />
        </div>

        <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-background shadow-sm">
          <Label
            htmlFor="dark-mode-switch"
            className="font-medium text-foreground cursor-pointer"
          >
            Dark Mode
          </Label>
          <Switch
            id="dark-mode-switch"
            checked={settings.websiteDarkMode}
            onCheckedChange={(checked) =>
              updateSetting("websiteDarkMode", checked)
            }
          />
        </div>
      </div>
    </div>
  );
}
