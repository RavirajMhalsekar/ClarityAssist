
"use client";

import { useState, useEffect } from 'react';
import ClarityAssistUI from '@/components/clarity-assist/ClarityAssistUI';
import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';

export default function Home() {
  const [isExtensionDarkMode, setIsExtensionDarkMode] = useState(false);

  useEffect(() => {
    // Determine initial theme for the extension and set it
    const storedTheme = localStorage.getItem('clarity-assist-extension-theme');
    let initialThemeIsDark;
    if (storedTheme) {
      initialThemeIsDark = storedTheme === 'dark';
    } else {
      initialThemeIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    setIsExtensionDarkMode(initialThemeIsDark);
  }, []);

  useEffect(() => {
    // Apply theme class to HTML element and save preference
    if (isExtensionDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('clarity-assist-extension-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('clarity-assist-extension-theme', 'light');
    }
  }, [isExtensionDarkMode]);

  const toggleExtensionTheme = () => {
    setIsExtensionDarkMode(prev => !prev);
  };

  return (
    <main className="flex flex-col items-center p-4 sm:p-6 md:p-8 min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="w-full max-w-lg mx-auto bg-card p-4 sm:p-6 rounded-xl shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="icon" onClick={toggleExtensionTheme} aria-label="Toggle extension theme">
            {isExtensionDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <h1 className="text-3xl font-headline font-bold text-primary">
            ClarityAssist
          </h1>
        </div>
        <ClarityAssistUI />
      </div>
    </main>
  );
}
