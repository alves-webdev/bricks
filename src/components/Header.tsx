"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const tabs = ["Profile", "Reports", "Analytics", "Notifications", "Help Center"];

export default function Header() {
  const [activeTab, setActiveTab] = useState("Profile");

  return (
    <div className="bg-black text-white p-6">
      {/* Navigation Tabs */}
      <div className="flex space-x-6 border-b border-gray-700 pb-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "text-gray-400 hover:text-white transition",
              activeTab === tab && "text-white border-b-2 border-white"
            )}
          >
            {tab}
          </button>
        ))}
      </div>
      
      {/* Project Info */}
      <div className="mt-6">
        <h1 className="text-3xl font-bold">Project Alpha</h1>
        <p className="text-gray-400 mt-1">
          Manage your project's details such as name, image, description and settings.
        </p>
      </div>
      
      {/* Action Buttons */}
      <div className="mt-4 flex space-x-3">
        <Button variant="outline" className="text-white border-gray-600">Share</Button>
        <Button variant="outline" className="text-white border-gray-600">View</Button>
        <Button variant="outline" className="text-white border-gray-600">Edit</Button>
        <Button className="bg-white text-black">Publish</Button>
      </div>
    </div>
  );
}
