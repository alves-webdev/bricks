// src/components/Header.tsx
"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const tabs = ["Profile", "Reports", "Analytics", "Notifications", "Help"];

export default function Header() {
  const [activeTab, setActiveTab] = useState("Profile");
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  const toggleDarkMode = () => setIsDark((prev) => !prev);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex space-x-8 py-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-white",
                activeTab === tab
                  ? "text-gray-900 dark:text-white border-b-2 border-indigo-500"
                  : "text-gray-500"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
        <button
          onClick={toggleDarkMode}
          className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-white"
        >
          {isDark ? "Light Mode" : "Dark Mode"}
        </button>
      </nav>
    </header>
  );
}
