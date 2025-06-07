"use client";

import React, { useState, useEffect } from "react";
import AdjustmentControl from "./AdjustmentControl";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function CustomizeTab() {
  const [fontSize, setFontSize] = useState(100);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [wordSpacing, setWordSpacing] = useState(0);
  const [lineSpacing, setLineSpacing] = useState(100);
  const [colorSaturation, setColorSaturation] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [invertColors, setInvertColors] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check initial dark mode state from system preference or localStorage
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const localDarkMode = localStorage.getItem('clarity-assist-dark-mode');
    
    if (localDarkMode !== null) {
      setDarkMode(localDarkMode === 'true');
      if (localDarkMode === 'true') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      setDarkMode(prefersDark);
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  const handleDarkModeChange = (checked: boolean) => {
    setDarkMode(checked);
    if (checked) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('clarity-assist-dark-mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('clarity-assist-dark-mode', 'false');
    }
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
      />
      <AdjustmentControl
        label="Letter Spacing"
        value={letterSpacing}
        setValue={setLetterSpacing}
        min={-2} // Adjusted min for better usability
        max={10}
        step={0.5} // Finer control
        unit="px"
      />
      <AdjustmentControl
        label="Word Spacing"
        value={wordSpacing}
        setValue={setWordSpacing}
        min={-2} // Adjusted min
        max={20}
        step={0.5} // Finer control
        unit="px"
      />
      <AdjustmentControl
        label="Line Spacing"
        value={lineSpacing}
        setValue={setLineSpacing}
        min={80}
        max={200}
        step={5}
        unit="%"
      />
      <AdjustmentControl
        label="Color Saturation"
        value={colorSaturation}
        setValue={setColorSaturation}
        min={0}
        max={200}
        step={10}
        unit="%"
      />
      <AdjustmentControl
        label="Contrast"
        value={contrast}
        setValue={setContrast}
        min={50}
        max={200}
        step={10}
        unit="%"
      />

      <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-background shadow-sm">
        <Label htmlFor="invert-colors-switch" className="font-medium text-foreground cursor-pointer">
          Invert Colors
        </Label>
        <Switch
          id="invert-colors-switch"
          checked={invertColors}
          onCheckedChange={setInvertColors}
          aria-label="Toggle invert colors"
        />
      </div>

      <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-background shadow-sm">
        <Label htmlFor="dark-mode-switch" className="font-medium text-foreground cursor-pointer">
          Dark Mode
        </Label>
        <Switch
          id="dark-mode-switch"
          checked={darkMode}
          onCheckedChange={handleDarkModeChange}
          aria-label="Toggle dark mode"
        />
      </div>
    </div>
  );
}
