import React from "react";

const Skeleton = () => {
  return (
    <div className="grid grid-cols-5 gap-2.5 mb-8">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="border border-gray-300 dark:border-gray-800 dark:bg-gray-700 animate-pulse"
        >
          <div className="h-[400px] block bg-gray-400" />
          <div className="p-1.5">
            <div className="h-6 bg-gray-500 rounded w-3/4 mb-2" />
            <div className="h-5 bg-gray-500 rounded w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
