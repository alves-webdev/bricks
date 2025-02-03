"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";

const tabs = ["Profile", "Reports", "Analytics", "Notifications", "Help"];

export default function Header() {
  const [activeTab, setActiveTab] = useState("Profile");

  return (
    <header className="bg-white shadow-sm border-b">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 py-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "text-sm font-medium transition-colors hover:text-gray-900",
                activeTab === tab
                  ? "text-gray-900 border-b-2 border-indigo-500"
                  : "text-gray-500"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}
