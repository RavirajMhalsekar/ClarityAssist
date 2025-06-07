"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccessibilityProfilesTab from "./AccessibilityProfilesTab";
import CustomizeTab from "./CustomizeTab";

export default function ClarityAssistUI() {
  return (
    <Tabs defaultValue="profiles" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-4 bg-secondary">
        <TabsTrigger value="profiles" className="font-headline data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Accessibility Profiles</TabsTrigger>
        <TabsTrigger value="customize" className="font-headline data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Customize</TabsTrigger>
      </TabsList>
      <TabsContent value="profiles">
        <AccessibilityProfilesTab />
      </TabsContent>
      <TabsContent value="customize">
        <CustomizeTab />
      </TabsContent>
    </Tabs>
  );
}
