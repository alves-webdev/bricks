"use client";

import React from "react";
import { Card } from "./ui/card";

const LandingSkeleton: React.FC = () => {
  return (
    <div className="p-8 space-y-8 animate-pulse">
      {/* Hero Section Skeleton */}
      <div className="space-y-4">
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4 mx-auto" />
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/2 mx-auto" />
      </div>

      {/* Feature Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="p-6 space-y-4">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-2/3" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-full" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-5/6" />
          </Card>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="p-4">
            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/2" />
            </div>
          </Card>
        ))}
      </div>

      {/* CTA Section */}
      <div className="text-center space-y-4">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/3 mx-auto" />
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-48 mx-auto" />
      </div>
    </div>
  );
};

export default LandingSkeleton;
