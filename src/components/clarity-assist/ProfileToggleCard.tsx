"use client";

import React from "react";
import type { LucideIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ProfileToggleCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export default function ProfileToggleCard({
  icon: IconComponent,
  title,
  description,
  enabled,
  onToggle,
}: ProfileToggleCardProps) {
  const switchId = `profile-toggle-${title.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <div className="flex items-center justify-between p-4 border border-border rounded-lg shadow-sm bg-background hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start space-x-3 mr-4">
        <IconComponent className="h-6 w-6 text-primary mt-1 flex-shrink-0" aria-hidden="true" />
        <div>
          <Label htmlFor={switchId} className="font-semibold font-headline text-foreground cursor-pointer">
            {title}
          </Label>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <Switch id={switchId} checked={enabled} onCheckedChange={onToggle} aria-label={`Toggle ${title} profile`} />
    </div>
  );
}
