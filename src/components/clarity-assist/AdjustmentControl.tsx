"use client";

import React from "react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Minus, Plus } from "lucide-react";

interface AdjustmentControlProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  IconComponent?: LucideIcon;
  unit?: string;
}

export const AdjustmentControl: React.FC<AdjustmentControlProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  IconComponent,
  unit,
}: AdjustmentControlProps) => {
  const sliderId = `slider-${label.toLowerCase().replace(/\s+/g, "-")}`;

  const handleSliderChange = (newValue: number[]) => {
    onChange(newValue[0]);
  };

  const increment = () => {
    onChange(Math.min(max, parseFloat((value + 1).toFixed(2))));
  };

  const decrement = () => {
    onChange(Math.max(min, parseFloat((value - 1).toFixed(2))));
  };

  return (
    <div className="p-2.5 mb-2 border border-border rounded-md bg-background shadow-sm space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {IconComponent && (
            <IconComponent
              className="h-3.5 w-3.5 text-primary flex-shrink-0"
              aria-hidden="true"
            />
          )}
          <Label
            htmlFor={sliderId}
            className="text-sm font-medium text-foreground"
          >
            {label}
          </Label>
        </div>
        <span className="text-xs text-muted-foreground">
          {value.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}
          {unit}
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <Button
          variant="outline"
          size="icon"
          onClick={decrement}
          aria-label={`Decrease ${label}`}
          className="h-6 w-6 shrink-0"
        >
          <Minus className="h-3 w-3" />
        </Button>
        <Slider
          id={sliderId}
          value={[value]}
          onValueChange={handleSliderChange}
          min={min}
          max={max}
          step={1}
          className="flex-1"
          aria-label={label}
        />
        <Button
          variant="outline"
          size="icon"
          onClick={increment}
          aria-label={`Increase ${label}`}
          className="h-6 w-6 shrink-0"
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};
