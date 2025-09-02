"use client";

import React from "react";
import Link from "next/link";
import images from "../assets/images.png";
import Skeleton from "./skeleton/skeleton";
import { useQuery } from "@tanstack/react-query";
import { getMovies } from "@/app/api/moviesApi";
import { Movie } from "../types/type";
import BookmarkButton from "./BookmarkButton";

interface MoviesProps {
  data?: { results: Movie[] };  
  isLoading?: boolean;
}

const Movies: React.FC<MoviesProps> = ({ data, isLoading }) => {
  const query = useQuery({
    queryKey: ["movies"],
    queryFn: () => getMovies({ page: 1 }),
    enabled: !data,
  });

  const loading = isLoading ?? query.isLoading;
  const error = query.isError;

  if (loading) return <Skeleton />;
  if (error) return <p className="text-red-500">Error loading movies...</p>;

  const moviesArray: Movie[] = data?.results || query.data?.results || [];

  return (
    <div className="container">
      <p className="mb-4 text-xl font-medium dark:text-primary">Movies</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-8">
        {moviesArray.map((movie) => (
          <div
            key={movie.id}
            className="border relative group overflow-hidden border-gray-300 dark:border-gray-800 dark:bg-gray-700 rounded-lg"
          >
            <Link href={`/movie/${movie.id}`} className="block h-[350px]">
              <img
                className="w-full h-full object-cover"
                src={
                  movie.poster_path
                    ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${movie.poster_path}`
                    : (images as unknown as string)
                }
                alt={movie.title}
              />
            </Link>

            <div className="absolute top-2 right-2 z-10">
              <BookmarkButton movie={movie} />
            </div>

            <div className="p-2">
              <h3
                title={movie.title}
                className="text-lg font-medium line-clamp-1"
              >
                {movie.title}
              </h3>
              <p className="text-yellow-500 font-medium text-sm">
                ⭐ {movie.vote_average.toFixed(1)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
