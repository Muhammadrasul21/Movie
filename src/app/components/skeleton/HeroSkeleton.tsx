import React from "react";

const HeroSkeleton = () => {
  return (
    <div className="max-w-full px-4">
      {/* Main Hero Skeleton */}
      <div className="relative h-[640px] rounded-xl bg-gray-400 animate-pulse mb-4">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl" />

        {/* Navigation buttons skeleton */}
        <div className="absolute top-4 left-4 w-14 h-14 bg-gray-300 rounded-xl animate-pulse" />
        <div className="absolute top-4 right-4 flex gap-2">
          <div className="w-14 h-14 bg-gray-300 rounded-xl animate-pulse" />
          <div className="w-14 h-14 bg-gray-300 rounded-xl animate-pulse" />
        </div>

        {/* Movie info skeleton */}
        <div className="absolute bottom-7 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4 text-center">
          <div className="h-8 bg-gray-300 rounded w-64 animate-pulse" />
          <div className="flex gap-4">
            <div className="h-4 bg-gray-300 rounded w-16 animate-pulse" />
            <div className="h-4 bg-gray-300 rounded w-8 animate-pulse" />
            <div className="h-4 bg-gray-300 rounded w-8 animate-pulse" />
            <div className="h-4 bg-gray-300 rounded w-12 animate-pulse" />
          </div>
          <div className="h-12 bg-gray-300 rounded w-48 animate-pulse" />
        </div>
      </div>

      {/* Thumbnail navigation skeleton */}
      <div className="flex items-center mt-1 container">
        <div className="hidden sm:flex w-12 h-12 rounded-full bg-gray-300 animate-pulse" />

        <div className="w-[432px] h-16 flex gap-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-16 w-24 bg-gray-300 rounded-md animate-pulse"
            />
          ))}
        </div>

        <div className="hidden sm:flex w-12 h-12 rounded-full bg-gray-300 animate-pulse" />
      </div>
    </div>
  );
};

export default HeroSkeleton;
