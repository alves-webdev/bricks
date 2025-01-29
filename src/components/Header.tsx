"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const tabs = ["Profile", "Reports", "Analytics", "Notifications", "Help Center"];

export default function Header() {
  const [activeTab, setActiveTab] = useState("Profile");

  return (
    <div className="bg-gradient-to-r from-gray-100 to-gray-300 text-gray-900 p-4 shadow-md rounded-b-lg">
      {/* Navigation Tabs */}
      <div className="flex space-x-10">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "text-gray-600 hover:text-gray-900 transition font-medium px-2",
              activeTab === tab && "text-gray-900 border-b-2 border-gray-900"
            )}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
