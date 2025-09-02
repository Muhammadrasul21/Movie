"use client";
import React from "react";
import Hero from "./components/Hero";
import { useQuery } from "@tanstack/react-query";
import { getMovies } from "./api/moviesApi";
import WeeklyData from "./components/WeeklyData";
import HeroSkeleton from "./components/skeleton/HeroSkeleton";
import WeeklyDataSkeleton from "./components/skeleton/WeeklyDataSkeleton";

const Page = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", { page: 1 }],
    queryFn: () => getMovies({ page: 1 }),
  });

  if (isLoading) {
    return (
      <div>
        <HeroSkeleton />
        <WeeklyDataSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-500">Error loading movies</div>
      </div>
    );
  }

  return (
    <div>
      <Hero movies={data?.results || []} />
      <WeeklyData movies={data?.results || []} />
    </div>
  );
};

export default Page;
