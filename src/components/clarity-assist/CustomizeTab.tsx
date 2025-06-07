
"use client";

import React, { useState } from "react";
import AdjustmentControl from "./AdjustmentControl";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ALargeSmall, StretchHorizontal, WrapText, Baseline, Droplets, Contrast } from "lucide-react";

export default function CustomizeTab() {
  const [fontSize, setFontSize] = useState(100);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [wordSpacing, setWordSpacing] = useState(0);
  const [lineSpacing, setLineSpacing] = useState(100);
  const [colorSaturation, setColorSaturation] = useState(100);
  const [contrastValue, setContrastValue] = useState(100); // Renamed to avoid conflict with imported Contrast icon
  const [invertColors, setInvertColors] = useState(false);
  const [websiteDarkMode, setWebsiteDarkMode] = useState(false); // This state is for the simulated website dark mode

  const handleWebsiteDarkModeChange = (checked: boolean) => {
    setWebsiteDarkMode(checked);
    // This switch now only updates its own state for simulating website dark mode.
    // It does not affect the extension's theme.
  };

  return (
    <div className="space-y-6">
      <AdjustmentControl
        label="Font Sizing"
        value={fontSize}
        setValue={setFontSize}
        min={50}
        max={200}
        step={5}
        unit="%"
        icon={ALargeSmall}
      />
      <AdjustmentControl
        label="Letter Spacing"
        value={letterSpacing}
        setValue={setLetterSpacing}
        min={-2}
        max={10}
        step={0.5}
        unit="px"
        icon={StretchHorizontal}
      />
      <AdjustmentControl
        label="Word Spacing"
        value={wordSpacing}
        setValue={setWordSpacing}
        min={-2}
        max={20}
        step={0.5}
        unit="px"
        icon={WrapText}
      />
      <AdjustmentControl
        label="Line Spacing"
        value={lineSpacing}
        setValue={setLineSpacing}
        min={80}
        max={200}
        step={5}
        unit="%"
        icon={Baseline}
      />
      <AdjustmentControl
        label="Color Saturation"
        value={colorSaturation}
        setValue={setColorSaturation}
        min={0}
        max={200}
        step={10}
        unit="%"
        icon={Droplets}
      />
      <AdjustmentControl
        label="Contrast"
        value={contrastValue}
        setValue={setContrastValue}
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
          checked={invertColors}
          onCheckedChange={setInvertColors}
          aria-label="Toggle invert colors for website simulation"
        />
      </div>

      <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-background shadow-sm">
        <Label htmlFor="website-dark-mode-switch" className="font-medium text-foreground cursor-pointer">
          Website Dark Mode (Simulated)
        </Label>
        <Switch
          id="website-dark-mode-switch"
          checked={websiteDarkMode}
          onCheckedChange={handleWebsiteDarkModeChange}
          aria-label="Toggle dark mode for website simulation"
        />
      </div>
    </div>
  );
}
