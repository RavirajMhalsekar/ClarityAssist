
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccessibilityProfilesTab from "./AccessibilityProfilesTab";
import CustomizeTab, { type CustomizeSettings } from "./CustomizeTab";

interface ClarityAssistUIProps {
  enabledProfiles: Record<string, boolean>;
  setEnabledProfiles: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  customizeSettings: CustomizeSettings;
  setCustomizeSettings: React.Dispatch<React.SetStateAction<CustomizeSettings>>;
}

export default function ClarityAssistUI({
  enabledProfiles,
  setEnabledProfiles,
  customizeSettings,
  setCustomizeSettings,
}: ClarityAssistUIProps) {
  return (
    <Tabs defaultValue="profiles" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-4 bg-secondary">
        <TabsTrigger value="profiles" className="font-headline data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Accessibility Profiles</TabsTrigger>
        <TabsTrigger value="customize" className="font-headline data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Customize</TabsTrigger>
      </TabsList>
      <TabsContent value="profiles">
        <AccessibilityProfilesTab
          enabledProfiles={enabledProfiles}
          setEnabledProfiles={setEnabledProfiles}
        />
      </TabsContent>
      <TabsContent value="customize">
        <CustomizeTab
          settings={customizeSettings}
          setSettings={setCustomizeSettings}
        />
      </TabsContent>
    </Tabs>
  );
}
