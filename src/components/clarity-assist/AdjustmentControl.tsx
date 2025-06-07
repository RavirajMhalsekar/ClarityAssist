"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Minus, Plus } from "lucide-react";

interface AdjustmentControlProps {
  label: string;
  value: number;
  setValue: (value: number) => void;
  min: number;
  max: number;
  step: number;
  unit?: string;
}

export default function AdjustmentControl({
  label,
  value,
  setValue,
  min,
  max,
  step,
  unit = "",
}: AdjustmentControlProps) {
  const sliderId = `slider-${label.toLowerCase().replace(/\s+/g, "-")}`;

  const handleSliderChange = (newValue: number[]) => {
    setValue(newValue[0]);
  };

  const increment = () => {
    setValue(Math.min(max, parseFloat((value + step).toFixed(2)) )); // Handle potential floating point issues
  };

  const decrement = () => {
    setValue(Math.max(min, parseFloat((value - step).toFixed(2)) )); // Handle potential floating point issues
  };

  return (
    <div className="p-3 border border-border rounded-lg bg-background shadow-sm space-y-2">
      <Label htmlFor={sliderId} className="text-sm font-medium text-foreground">
        {label}
      </Label>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon" onClick={decrement} aria-label={`Decrease ${label}`} className="shrink-0">
          <Minus className="h-4 w-4" />
        </Button>
        <Slider
          id={sliderId}
          value={[value]}
          onValueChange={handleSliderChange}
          min={min}
          max={max}
          step={step}
          className="flex-1"
          aria-label={label}
        />
        <Button variant="outline" size="icon" onClick={increment} aria-label={`Increase ${label}`} className="shrink-0">
          <Plus className="h-4 w-4" />
        </Button>
        <span className="text-sm w-16 text-right tabular-nums text-muted-foreground shrink-0">
          {value.toLocaleString(undefined, { minimumFractionDigits: step % 1 === 0 ? 0 : 1, maximumFractionDigits: 2 })}{unit}
        </span>
      </div>
    </div>
  );
}
