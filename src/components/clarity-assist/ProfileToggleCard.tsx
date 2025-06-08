"use client";

import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ProfileToggleCardProps {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export default function ProfileToggleCard({
  title,
  description,
  enabled,
  onToggle,
}: ProfileToggleCardProps) {
  return (
    <div className="flex items-center justify-between p-2 rounded-lg bg-card hover:bg-accent/50 transition-colors">
      <div className="flex flex-col">
        <h3 className="text-sm font-medium">{title}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch
        checked={enabled}
        onCheckedChange={onToggle}
        aria-label={`Toggle ${title}`}
      />
    </div>
  );
}
