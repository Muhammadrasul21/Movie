"use client";

import { useQuery } from "@tanstack/react-query";
import { getSavedMovies } from "@/app/api/savedApi";
import Link from "next/link";
import BookmarkButton from "@/app/components/BookmarkButton";
import { FaRegBookmark } from "react-icons/fa";
import { getImageUrl } from "@/app/constants";

export default function SavedMoviesPage() {
  const {
    data: savedMovies = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["savedMovies"],
    queryFn: getSavedMovies,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <div className="h-12 bg-gray-400 rounded w-64 mx-auto mb-4 animate-pulse" />
            <div className="h-6 bg-gray-400 rounded w-48 mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-lg overflow-hidden shadow-lg"
              >
                <div className="h-80 bg-gray-400 animate-pulse" />
                <div className="p-4">
                  <div className="h-6 bg-gray-400 rounded w-3/4 mb-2 animate-pulse" />
                  <div className="h-4 bg-gray-400 rounded w-1/2 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="h-16 w-16 bg-red-500 rounded-full mx-auto mb-4 animate-pulse" />
          <h2 className="text-2xl font-bold text-white mb-2">
            Error loading saved movies
          </h2>
          <p className="text-gray-400 mb-4">
            Something went wrong while fetching your saved movies.
          </p>
          <Link
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-primary">Saved Movies</h1>
          <p className="text-xl text-gray-400">
            {savedMovies.length} {savedMovies.length === 1 ? "movie" : "movies"}{" "}
            saved
          </p>
        </div>

        {/* Saved Movies Grid */}
        {savedMovies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {savedMovies.map((movie: any) => (
              <div key={movie.id} className="group relative">
                <Link href={`/pages/movie/${movie.id}`}>
                  <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="relative">
                      <img
                        src={getImageUrl(movie.poster_path, 'w500')}
                        alt={movie.title}
                        className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder-poster.jpg";
                        }}
                      />
                      <div
                        className="absolute top-2 right-2 z-10"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <BookmarkButton movie={movie} size="md" />
                      </div>
                      <div className="absolute top-2 left-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded-md text-sm font-semibold">
                        {movie.vote_average?.toFixed(1)}
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors">
                        {movie.title}
                      </h3>

                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span>
                          {movie.release_date
                            ? new Date(movie.release_date).getFullYear()
                            : "N/A"}
                        </span>
                        <span>{movie.vote_count} votes</span>
                      </div>

                      {movie.overview && (
                        <p className="text-gray-300 text-sm mt-2 line-clamp-2">
                          {movie.overview}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="h-16 w-16 bg-gray-400 rounded-full mx-auto mb-4 animate-pulse" />
            <h3 className="text-2xl font-bold text-white mb-2">
              No saved movies yet
            </h3>
            <p className="text-gray-400 mb-6">
              Start saving movies by clicking the bookmark icon on any movie you
              like!
            </p>
            <Link
              href="/"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
            >
              <FaRegBookmark />
              Browse Movies
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
