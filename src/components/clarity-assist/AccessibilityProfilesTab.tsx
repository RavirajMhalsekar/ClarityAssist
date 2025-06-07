
"use client";

import React from "react";
import type { LucideIcon } from "lucide-react";
import { Keyboard, EyeOff, Palette, ZoomIn, ZapOff, Users } from "lucide-react";
import ProfileToggleCard from "./ProfileToggleCard";

interface Profile {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const profilesData: Profile[] = [
  {
    id: "motor-impaired",
    icon: Keyboard,
    title: "Motor Impaired",
    description: "Keyboard navigation and voice control.",
  },
  {
    id: "blind",
    icon: EyeOff,
    title: "Blind",
    description: "Screen reader support and audio feedback.",
  },
  {
    id: "color-blind",
    icon: Palette,
    title: "Color Blind",
    description: "Adjusted contrast and color filters.",
  },
  {
    id: "low-vision",
    icon: ZoomIn,
    title: "Low Vision",
    description: "Larger text, high contrast mode.",
  },
  {
    id: "seizure-learning",
    icon: ZapOff,
    title: "Seizure & Learning",
    description: "Remove flashing and reduces brightness.",
  },
  {
    id: "elderly",
    icon: Users,
    title: "Elderly",
    description: "Larger text, high contrast mode, easier navigation.",
  },
];

interface AccessibilityProfilesTabProps {
  enabledProfiles: Record<string, boolean>;
  setEnabledProfiles: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

export default function AccessibilityProfilesTab({
  enabledProfiles,
  setEnabledProfiles,
}: AccessibilityProfilesTabProps) {
  const handleToggleProfile = (profileId: string, checked: boolean) => {
    setEnabledProfiles((prev) => ({ ...prev, [profileId]: checked }));
  };

  return (
    <div className="space-y-4">
      {profilesData.map((profile) => (
        <ProfileToggleCard
          key={profile.id}
          icon={profile.icon}
          title={profile.title}
          description={profile.description}
          enabled={!!enabledProfiles[profile.id]}
          onToggle={(checked) => handleToggleProfile(profile.id, checked)}
        />
      ))}
    </div>
  );
}
