
"use client";

import React from "react";
import AdjustmentControl from "./AdjustmentControl";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ALargeSmall, StretchHorizontal, WrapText, Baseline, Droplets, Contrast } from "lucide-react";

export interface CustomizeSettings {
  fontSize: number;
  letterSpacing: number;
  wordSpacing: number;
  lineSpacing: number;
  colorSaturation: number;
  contrastValue: number;
  invertColors: boolean;
  websiteDarkMode: boolean;
}

interface CustomizeTabProps {
  settings: CustomizeSettings;
  setSettings: React.Dispatch<React.SetStateAction<CustomizeSettings>>;
}

export default function CustomizeTab({ settings, setSettings }: CustomizeTabProps) {
  const updateSetting = <K extends keyof CustomizeSettings>(key: K, value: CustomizeSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <AdjustmentControl
        label="Font Sizing"
        value={settings.fontSize}
        setValue={(value) => updateSetting("fontSize", value)}
        min={50}
        max={200}
        step={5}
        unit="%"
        icon={ALargeSmall}
      />
      <AdjustmentControl
        label="Letter Spacing"
        value={settings.letterSpacing}
        setValue={(value) => updateSetting("letterSpacing", value)}
        min={-2}
        max={10}
        step={0.5}
        unit="px"
        icon={StretchHorizontal}
      />
      <AdjustmentControl
        label="Word Spacing"
        value={settings.wordSpacing}
        setValue={(value) => updateSetting("wordSpacing", value)}
        min={-2}
        max={20}
        step={0.5}
        unit="px"
        icon={WrapText}
      />
      <AdjustmentControl
        label="Line Spacing"
        value={settings.lineSpacing}
        setValue={(value) => updateSetting("lineSpacing", value)}
        min={80}
        max={200}
        step={5}
        unit="%"
        icon={Baseline}
      />
      <AdjustmentControl
        label="Color Saturation"
        value={settings.colorSaturation}
        setValue={(value) => updateSetting("colorSaturation", value)}
        min={0}
        max={200}
        step={10}
        unit="%"
        icon={Droplets}
      />
      <AdjustmentControl
        label="Contrast"
        value={settings.contrastValue}
        setValue={(value) => updateSetting("contrastValue", value)}
        min={50}
        max={200}
        step={10}
        unit="%"
        icon={Contrast}
      />

      <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-background shadow-sm">
        <Label htmlFor="invert-colors-switch" className="font-medium text-foreground cursor-pointer">
          Invert Colors (Simulated)
        </Label>
        <Switch
          id="invert-colors-switch"
          checked={settings.invertColors}
          onCheckedChange={(checked) => updateSetting("invertColors", checked)}
          aria-label="Toggle invert colors for website simulation"
        />
      </div>

      <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-background shadow-sm">
        <Label htmlFor="website-dark-mode-switch" className="font-medium text-foreground cursor-pointer">
          Website Dark Mode (Simulated)
        </Label>
        <Switch
          id="website-dark-mode-switch"
          checked={settings.websiteDarkMode}
          onCheckedChange={(checked) => updateSetting("websiteDarkMode", checked)}
          aria-label="Toggle dark mode for website simulation"
        />
      </div>
    </div>
  );
}
