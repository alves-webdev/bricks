"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { usePageStorage } from "@/store/page";

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
    <header className="bg-brick-light dark:bg-brick-dark shadow-sm border-b border-brick-border dark:border-brick-darkborder">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-8 py-4">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Bricks
          </h1>
          <button
            className={cn(
              "text-sm font-medium transition-colors",
              "text-white/90 hover:text-white",
              "dark:text-white/90 dark:hover:text-white",
              "border-b-2 border-brick-accent"
            )}
          >
            Home
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleDownload}
            disabled={!html}
            className={`
              bg-brick-accent hover:bg-brick-accent/90 
              text-white font-semibold 
              px-4 py-2 rounded-full 
              shadow 
              focus:outline-none focus:ring-2 focus:ring-brick-accent 
              transition
              ${!html ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            Download HTML
          </button>
          <button
            onClick={toggleDarkMode}
            className="text-sm font-medium text-white/90 hover:text-white transition-colors"
          >
            {isDark ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </nav>
    </header>
  );
}
