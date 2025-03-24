"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { usePageStorage } from "@/store/page";
import { Button } from "./ui/button";
import { Moon, Sun, Download } from "lucide-react";

export default function Header() {
  const [isDark, setIsDark] = useState(true);
  const { html } = usePageStorage();

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  const toggleDarkMode = () => setIsDark((prev) => !prev);

  const handleDownload = () => {
    if (!html) return;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "index.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brick-border dark:border-brick-darkborder bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              Bricks
            </h1>
            <Button
              variant="ghost"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              Home
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={handleDownload}
              disabled={!html}
              variant="outline"
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Download HTML
            </Button>
            <Button
              onClick={toggleDarkMode}
              variant="ghost"
              size="icon"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
