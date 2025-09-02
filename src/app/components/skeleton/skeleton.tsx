import React from "react";

const Skeleton = () => {
  return (
    <div className="container">
      <div className="h-6 bg-gray-400 rounded w-24 mb-4 animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="border border-gray-300 dark:border-gray-800 dark:bg-gray-700 rounded-lg animate-pulse"
          >
            <div className="h-[350px] block bg-gray-400" />
            <div className="p-2">
              <div className="h-5 bg-gray-500 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-500 rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skeleton;
