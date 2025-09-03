"use client";

import React from "react";
import Link from "next/link";
import images from "../assets/images.png";
import Skeleton from "./skeleton/skeleton";
import { Movie } from "../types/type";
import BookmarkButton from "./BookmarkButton";
import { getImageUrl } from "../constants";

interface MoviesProps {
  data?: { results: Movie[] };
  isLoading?: boolean;
}

const Movies: React.FC<MoviesProps> = ({ data, isLoading }) => {
  if (isLoading) return <Skeleton />;

  const moviesArray: Movie[] = data?.results || [];

  return (
    <div className="container">
      <p className="mb-4 text-xl font-medium dark:text-primary">Movies</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
        {moviesArray.map((movie) => (
          <div
            key={movie.id}
            className="border relative group overflow-hidden border-gray-300 dark:border-gray-800 dark:bg-gray-700 rounded-lg"
          >
            <Link href={`/pages/movie/${movie.id}`} className="block h-[350px]">
              <img
                className="w-full h-full object-cover"
                src={
                  movie.poster_path
                    ? getImageUrl(movie.poster_path, "w500")
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
