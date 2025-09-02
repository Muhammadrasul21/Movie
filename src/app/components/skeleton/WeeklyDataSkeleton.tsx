import React from "react";

const WeeklyDataSkeleton = () => {
  return (
    <div className="relative mt-[50px]">
      {/* Header skeleton */}
      <div className="container flex items-center justify-between mb-4">
        <div className="h-6 bg-gray-400 rounded w-32 animate-pulse" />
        <div className="h-5 bg-gray-400 rounded w-20 animate-pulse" />
      </div>

      {/* Movies grid skeleton */}
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="!h-[400px] max-w-[280px] mb-10 rounded-xl"
            >
              <div className="flex flex-col gap-2 relative">
                <div className="w-full h-[400px] bg-gray-400 rounded-xl animate-pulse" />

                {/* Bookmark button skeleton */}
                <div className="absolute top-2 right-2 w-10 h-10 bg-gray-300 rounded-xl animate-pulse" />

                <div className="flex flex-col gap-1">
                  <div className="h-5 bg-gray-400 rounded w-3/4 animate-pulse" />
                  <div className="h-4 bg-gray-400 rounded w-1/2 animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeeklyDataSkeleton;
