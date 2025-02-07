// src/components/LandingSkeleton.tsx
'use client'

import React from "react";

const LandingSkeleton: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      {/* Hero Section Skeleton */}
      <div className="w-full h-96 rounded-lg skeleton" />

      {/* Three-column feature section */}
      <div className="flex space-x-8">
        <div className="w-1/3 h-64 rounded-lg skeleton" />
        <div className="w-1/3 h-64 rounded-lg skeleton" />
        <div className="w-1/3 h-64 rounded-lg skeleton" />

      </div>

      {/* Grid of smaller content blocks */}
      <div className="grid grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="w-full h-32 rounded-lg skeleton" />
        ))}
      </div>

      <style jsx>{`
        .skeleton {
          background: linear-gradient(
            90deg,
            #e5e7eb 25%,
            #d1d5db 37%,
            #e5e7eb 63%
          );
          background-size: 400% 100%;
          animation: shimmer 1.4s ease infinite;
        }
        @keyframes shimmer {
          0% {
            background-position: -100% 0;
          }
          100% {
            background-position: 100% 0;
          }
        }
      `}</style>
    </div>
  );
};

export default LandingSkeleton;
