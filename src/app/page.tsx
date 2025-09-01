"use client";
import React from "react";
import Hero from "./components/Hero";
import { useQuery } from "@tanstack/react-query";
import { getMovies } from "./api/moviesApi";

const Page = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", { page: 10 }],
    queryFn: () => getMovies({ page: 10 }),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
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
    </div>
  );
};

export default Page;
