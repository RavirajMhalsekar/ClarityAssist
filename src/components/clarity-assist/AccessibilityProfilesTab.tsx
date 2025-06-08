"use client";

import React from "react";
import ProfileToggleCard from "./ProfileToggleCard";
import { useAccessibility } from "../../contexts/AccessibilityContext";

interface AccessibilityProfilesTabProps {
  enabledProfiles: Record<string, boolean>;
  setEnabledProfiles: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
}

interface AccessibilityProfile {
  id: string;
  title: string;
  description: string;
}

const accessibilityProfiles: AccessibilityProfile[] = [
  {
    id: "dyslexia",
    title: "Dyslexia-Friendly Mode",
    description: "Optimized text display and spacing for easier reading.",
  },
  {
    id: "reading-guide",
    title: "Reading Guide",
    description: "Focused line helper for easier text tracking.",
  },
  {
    id: "low-vision",
    title: "Low Vision",
    description: "Enhanced contrast and larger text for better visibility.",
  },
  {
    id: "color-blind",
    title: "Color Blind",
    description: "Optimized color contrast and patterns.",
  },
  {
    id: "elderly",
    title: "Elderly",
    description: "Simplified interface with larger text and better contrast.",
  },
  {
    id: "translate",
    title: "Language Support",
    description: "Translation and language assistance tools.",
  },
];

export default function AccessibilityProfilesTab({
  enabledProfiles,
  setEnabledProfiles,
}: AccessibilityProfilesTabProps) {
  const { toggleProfile } = useAccessibility();

  const handleProfileToggle = (profileId: string, enabled: boolean) => {
    toggleProfile(profileId, enabled);
  };

  return (
    <div className="space-y-3 md:space-y-4">
      {accessibilityProfiles.map((profile) => (
        <ProfileToggleCard
          key={profile.id}
          title={profile.title}
          description={profile.description}
          enabled={enabledProfiles[profile.id] || false}
          onToggle={(enabled) => handleProfileToggle(profile.id, enabled)}
        />
      ))}
    </div>
  );
}
