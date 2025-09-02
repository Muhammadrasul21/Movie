"use client";
import React from "react";

const DetailSkeleton = () => {
  return (
    <div className="w-full flex justify-center px-4">
      <div className="w-[1360px] h-[700px] p-3 rounded-xl bg-gray-800 mt-2 animate-pulse flex flex-col items-center justify-between pb-[38px]">
        <div className="w-full flex justify-between">
          <div className="w-14 h-14 bg-slate-500 rounded-xl"></div>
          <div className="flex gap-2">
            <div className="w-14 h-14 bg-slate-500 rounded-xl"></div>
            <div className="w-14 h-14 bg-slate-500 rounded-xl"></div>
          </div>
        </div>

        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-64 h-8 bg-slate-500 rounded-md"></div>
          <div className="flex gap-4">
            <div className="w-20 h-4 bg-slate-500 rounded"></div>
            <div className="w-20 h-4 bg-slate-500 rounded"></div>
            <div className="w-20 h-4 bg-slate-500 rounded"></div>
            <div className="w-20 h-4 bg-slate-500 rounded"></div>
          </div>
          <div className="w-[280px] h-12 bg-slate-500 rounded-lg mt-3"></div>
        </div>
      </div>
    </div>
  );
};

export default DetailSkeleton;
